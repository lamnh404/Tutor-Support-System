import React from 'react'
import { motion } from 'framer-motion'
import { Activity, AlertCircle, CheckCircle, Clock, Filter, XCircle, Zap } from 'lucide-react'
import { activityLogs } from '~/pages/admin/mockData.ts'
import type { ActivityLog } from '~/pages/admin/TypeDefinition.ts'

const Logs: React.FC = () => {
  const ActivityItem = ({ log }: { log: ActivityLog }) => {
    const getIcon = () => {
      switch (log.type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case 'error': return <XCircle className="w-5 h-5 text-red-500" />
      default: return <Activity className="w-5 h-5 text-blue-500" />
      }
    }

    const getBgColor = () => {
      switch (log.type) {
      case 'success': return 'from-green-50 to-emerald-50 border-green-100'
      case 'warning': return 'from-yellow-50 to-amber-50 border-yellow-100'
      case 'error': return 'from-red-50 to-rose-50 border-red-100'
      default: return 'from-blue-50 to-indigo-50 border-blue-100'
      }
    }

    return (
      <motion.div
        whileHover={{ x: 5, backgroundColor: 'rgba(251, 146, 60, 0.03)' }}
        className={`p-4 rounded-xl bg-gradient-to-r ${getBgColor()} border-2 cursor-pointer`}
      >
        <div className="flex items-start space-x-3">
          <div className="mt-0.5">{getIcon()}</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900">{log.user}</p>
            <p className="text-sm text-gray-600 mt-0.5">{log.action}</p>
            <p className="text-xs text-gray-400 mt-1 flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{log.timestamp}</span>
            </p>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="w-full h-full overflow-auto">
      <div className="max-w-7xl mx-auto p-6">
        <motion.div
          key="logs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6"
        >
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Nhật ký hoạt động
              </h2>
              <p className="text-gray-600 mt-1">Theo dõi tất cả hoạt động trong hệ thống</p>
            </div>
            <div className="flex items-center space-x-3">
              <select className="px-4 py-2 border-2 border-orange-100 rounded-xl text-sm focus:ring-4 focus:ring-orange-200 bg-white/80 backdrop-blur-sm font-medium">
                <option>Tất cả loại</option>
                <option>Thành công</option>
                <option>Cảnh báo</option>
                <option>Lỗi</option>
              </select>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl shadow-lg"
              >
                <Filter className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* System Status Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-lg border-2 border-green-50"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900">Server Status</h3>
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-green-600 mb-1">Hoạt động tốt</p>
              <p className="text-sm text-gray-600">Uptime: 99.98%</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-lg border-2 border-blue-50"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900">Database</h3>
                <Activity className="w-6 h-6 text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-blue-600 mb-1">Ổn định</p>
              <p className="text-sm text-gray-600">Response: 45ms</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-lg border-2 border-purple-50"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900">API Calls</h3>
                <Zap className="w-6 h-6 text-purple-500" />
              </div>
              <p className="text-2xl font-bold text-purple-600 mb-1">45.2K</p>
              <p className="text-sm text-gray-600">Hôm nay</p>
            </motion.div>
          </div>

          {/* Activity Timeline Section */}
          <motion.div
            whileHover={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-orange-50"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                <Activity className="w-5 h-5 text-orange-600" />
                <span>Timeline hoạt động</span>
              </h3>
              <p className="text-sm text-gray-500">{activityLogs.length} hoạt động gần đây</p>
            </div>

            <div className="space-y-3">
              {activityLogs.map((log, index) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ActivityItem log={log} />
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-6 py-3 border-2 border-dashed border-orange-200 rounded-xl text-orange-600 font-semibold hover:bg-orange-50 transition"
            >
              Xem thêm hoạt động →
            </motion.button>
          </motion.div>

          {/* Statistics Summary */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border-2 border-orange-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-1">Tổng hoạt động</p>
                <p className="text-2xl font-bold text-gray-900">{activityLogs.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-1">Thành công</p>
                <p className="text-2xl font-bold text-green-600">
                  {activityLogs.filter(log => log.type === 'success').length}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-1">Cảnh báo</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {activityLogs.filter(log => log.type === 'warning').length}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-1">Lỗi</p>
                <p className="text-2xl font-bold text-red-600">
                  {activityLogs.filter(log => log.type === 'error').length}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Logs