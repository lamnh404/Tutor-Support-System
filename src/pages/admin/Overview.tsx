import React from 'react'
import {
  Activity, AlertCircle,
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  Calendar, CheckCircle, Clock, FileText,
  type LucideProps,
  Target,
  TrendingUp,
  Users, XCircle
} from 'lucide-react'
import { motion } from 'framer-motion'
import { activityLogs, categoryData, dashboardStats, monthlyData } from '~/pages/admin/mockData.ts'
import {
  Area,
  AreaChart,
  CartesianGrid, Cell,
  Legend,
  Pie,
  PieChart, type PieLabelRenderProps,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import type { ActivityLog } from '~/pages/admin/TypeDefinition.ts'

export const Overview: React.FC = () => {
  const StatCard = ({
    title,
    value,
    change,
    icon: Icon,
    gradient,
    trend
  }: {
    title: string
    value: string | number
    change: string
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
    gradient: string
    trend: 'up' | 'down'
  }) => (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border-2 border-indigo-50 relative overflow-hidden group"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 ${gradient} rounded-full blur-3xl opacity-20 group-hover:scale-150 transition-transform duration-500`} />

      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="text-sm text-gray-600 font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
        </div>
        <motion.div
          whileHover={{ scale: 1.1, rotate: 10 }}
          className={`p-3 ${gradient} rounded-xl shadow-md`}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>
      </div>

      <div className="flex items-center space-x-2">
        {trend === 'up' ? (
          <ArrowUpRight className="w-4 h-4 text-green-500" />
        ) : (
          <ArrowDownRight className="w-4 h-4 text-red-500" />
        )}
        <span className={`text-sm font-semibold ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
        <span className="text-xs text-gray-500">so với tháng trước</span>
      </div>
    </motion.div>
  )

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
      case 'success': return 'from-green-50 to-emerald-50'
      case 'warning': return 'from-yellow-50 to-amber-50'
      case 'error': return 'from-red-50 to-rose-50'
      default: return 'from-blue-50 to-indigo-50'
      }
    }

    return (
      <motion.div
        whileHover={{ x: 5, backgroundColor: 'rgba(99, 102, 241, 0.03)' }}
        className={`p-3 rounded-xl bg-gradient-to-r ${getBgColor()} border border-gray-100 cursor-pointer`}
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
          key="overview"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6"
        >
          {/* Header Section */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
            <p className="text-gray-600">Tổng quan về hệ thống và hoạt động</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Tổng người dùng"
              value={dashboardStats.totalUsers}
              change="+12.5%"
              icon={Users}
              gradient="bg-gradient-to-br from-blue-500 to-cyan-500"
              trend="up"
            />
            <StatCard
              title="Tài liệu"
              value={dashboardStats.totalDocuments}
              change="+8.3%"
              icon={BookOpen}
              gradient="bg-gradient-to-br from-purple-500 to-pink-500"
              trend="up"
            />
            <StatCard
              title="Buổi tư vấn"
              value={dashboardStats.totalSessions}
              change="+15.7%"
              icon={Calendar}
              gradient="bg-gradient-to-br from-green-500 to-emerald-500"
              trend="up"
            />
            <StatCard
              title="Tỷ lệ hoàn thành"
              value={`${dashboardStats.completionRate}%`}
              change="-2.1%"
              icon={Target}
              gradient="bg-gradient-to-br from-orange-500 to-red-500"
              trend="down"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Line Chart */}
            <motion.div
              whileHover={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-lg border-2 border-indigo-50"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                <span>Xu hướng tăng trưởng</span>
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
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
                  <Area type="monotone" dataKey="users" stroke="#6366f1" fillOpacity={1} fill="url(#colorUsers)" name="Người dùng" />
                  <Area type="monotone" dataKey="sessions" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorSessions)" name="Buổi tư vấn" />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Pie Chart */}
            <motion.div
              whileHover={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-lg border-2 border-purple-50"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <FileText className="w-5 h-5 text-purple-600" />
                <span>Phân loại tài liệu</span>
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(props) => {
                      const { name, percent } = props as PieLabelRenderProps
                      return `${name ?? ''}: ${(((percent ?? 0) as number) * 100).toFixed(0)}%`
                    }}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <motion.div
            whileHover={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-lg border-2 border-green-50"
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                <Activity className="w-5 h-5 text-green-600" />
                <span>Hoạt động gần đây</span>
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="text-sm text-indigo-600 font-semibold hover:text-indigo-700"
              >
                Xem tất cả →
              </motion.button>
            </div>
            <div className="space-y-3">
              {activityLogs.slice(0, 5).map(log => (
                <ActivityItem key={log.id} log={log} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}