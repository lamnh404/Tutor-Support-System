import React from 'react'
import { motion } from 'framer-motion'
import { Award, BarChart3, Calendar, Clock, Download, Target, UserCheck } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { monthlyData, sessionTypeData } from '~/pages/admin/mockData.ts'

const Analytics: React.FC = () => {
  return (
    <div className="w-full h-full overflow-auto">
      <div className="max-w-7xl mx-auto p-6">
        <motion.div
          key="analytics"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6"
        >
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Phân tích & Báo cáo
              </h2>
              <p className="text-gray-600 mt-1">Theo dõi và phân tích hiệu suất hệ thống</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl shadow-lg font-semibold flex items-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Xuất báo cáo</span>
            </motion.button>
          </div>

          {/* Performance Metrics Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Tỷ lệ tham gia</h3>
                <UserCheck className="w-8 h-8 opacity-80" />
              </div>
              <p className="text-4xl font-bold mb-2">79.2%</p>
              <p className="text-sm opacity-90">+5.3% so với tháng trước</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Đánh giá trung bình</h3>
                <Award className="w-8 h-8 opacity-80" />
              </div>
              <p className="text-4xl font-bold mb-2">4.7/5</p>
              <p className="text-sm opacity-90">+0.2 điểm so với tháng trước</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Thời gian trung bình</h3>
                <Clock className="w-8 h-8 opacity-80" />
              </div>
              <p className="text-4xl font-bold mb-2">45 phút</p>
              <p className="text-sm opacity-90">Mỗi buổi tư vấn</p>
            </motion.div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Bar Chart - Monthly Growth */}
            <motion.div
              whileHover={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-lg border-2 border-green-50"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-green-600" />
                <span>Tăng trưởng theo tháng</span>
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '12px',
                      border: '2px solid #e5e7eb'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="users" fill="#6366f1" name="Người dùng" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="documents" fill="#8b5cf6" name="Tài liệu" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Session Types */}
            <motion.div
              whileHover={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-lg border-2 border-emerald-50"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                <span>Loại buổi tư vấn</span>
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sessionTypeData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis type="number" stroke="#6b7280" />
                  <YAxis dataKey="type" type="category" stroke="#6b7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '12px',
                      border: '2px solid #e5e7eb'
                    }}
                  />
                  <Bar dataKey="count" fill="#10b981" name="Số lượng" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Detailed Statistics Section */}
          <motion.div
            whileHover={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-green-50"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                <Target className="w-5 h-5 text-green-600" />
                <span>Thống kê chi tiết</span>
              </h3>
              <p className="text-sm text-gray-500">Cập nhật hàng ngày</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Giảng viên hoạt động', value: '78/89', percentage: '87.6%', color: 'from-blue-500 to-cyan-500' },
                { label: 'Sinh viên hoạt động', value: '987/1158', percentage: '85.2%', color: 'from-purple-500 to-pink-500' },
                { label: 'Tài liệu mới (tháng)', value: '145', percentage: '+12.3%', color: 'from-green-500 to-emerald-500' },
                { label: 'Bài tập hoàn thành', value: '756/892', percentage: '84.8%', color: 'from-orange-500 to-red-500' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border-2 border-gray-100"
                >
                  <p className="text-xs text-gray-600 font-semibold mb-2 uppercase">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
                  <div className="flex items-center space-x-2">
                    <div className="h-1.5 flex-1 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: stat.percentage }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className={`h-full bg-gradient-to-r ${stat.color}`}
                      />
                    </div>
                    <span className="text-xs font-bold text-gray-700">{stat.percentage}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Summary Footer */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Báo cáo tự động</h4>
                <p className="text-sm text-gray-600">Nhận báo cáo chi tiết qua email hàng tuần</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold text-sm shadow-md"
              >
                Đăng ký nhận báo cáo
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Analytics