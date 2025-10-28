import React, { useState } from 'react'
import {
  BarChart3, Users, BookOpen, FileText, TrendingUp, TrendingDown,
  Calendar, Clock, Award, AlertCircle, CheckCircle, XCircle,
  Download, Filter, Search, MoreVertical, Eye, Edit, Trash2,
  Plus, Bell, Settings, LogOut, Home, Activity, UserCheck,
  Target, Zap, ArrowUpRight, ArrowDownRight, DollarSign
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts'
import toast, { Toaster } from 'react-hot-toast'

// --- Type Definitions ---

export interface User {
  email: string
  firstName: string
  lastName: string
  roles: string[]
  avatarUrl?: string
}

interface DashboardStats {
  totalUsers: number
  totalTutors: number
  totalStudents: number
  totalDocuments: number
  totalAssignments: number
  totalSessions: number
  activeUsers: number
  completionRate: number
}

interface ActivityLog {
  id: number
  user: string
  action: string
  timestamp: string
  type: 'success' | 'warning' | 'error' | 'info'
}

interface UserDetail {
  id: number
  name: string
  email: string
  role: string
  department: string
  joinDate: string
  status: 'active' | 'inactive' | 'suspended'
  sessionsCount: number
  documentsUploaded: number
}

// --- Mock Data ---

const mockAdminData: User = {
  email: 'admin@hcmut.edu.vn',
  firstName: 'Admin',
  lastName: 'System',
  roles: ['admin'],
  avatarUrl: undefined
}

const dashboardStats: DashboardStats = {
  totalUsers: 1247,
  totalTutors: 89,
  totalStudents: 1158,
  totalDocuments: 3456,
  totalAssignments: 892,
  totalSessions: 2341,
  activeUsers: 987,
  completionRate: 87.5
}

const monthlyData = [
  { month: 'T1', users: 800, sessions: 1200, documents: 450 },
  { month: 'T2', users: 850, sessions: 1400, documents: 520 },
  { month: 'T3', users: 920, sessions: 1650, documents: 580 },
  { month: 'T4', users: 1050, sessions: 1900, documents: 650 },
  { month: 'T5', users: 1150, sessions: 2100, documents: 720 },
  { month: 'T6', users: 1247, sessions: 2341, documents: 890 }
]

const categoryData = [
  { name: 'Bài giảng', value: 45, color: '#6366f1' },
  { name: 'Tài liệu', value: 35, color: '#8b5cf6' },
  { name: 'Thông báo', value: 15, color: '#ec4899' },
  { name: 'Khác', value: 5, color: '#f59e0b' }
]

const sessionTypeData = [
  { type: 'Trực tuyến', count: 1450 },
  { type: 'Trực tiếp', count: 891 }
]

const activityLogs: ActivityLog[] = [
  { id: 1, user: 'Nguyễn Văn A', action: 'Đăng tài liệu mới: "Công nghệ phần mềm - Chương 5"', timestamp: '5 phút trước', type: 'success' },
  { id: 2, user: 'Trần Thị B', action: 'Tạo bài tập mới: "Thiết kế hệ thống"', timestamp: '12 phút trước', type: 'info' },
  { id: 3, user: 'Lê Văn C', action: 'Xác nhận buổi tư vấn với sinh viên', timestamp: '25 phút trước', type: 'success' },
  { id: 4, user: 'Phạm Thị D', action: 'Cảnh báo: Đăng nhập thất bại nhiều lần', timestamp: '1 giờ trước', type: 'warning' },
  { id: 5, user: 'Hoàng Văn E', action: 'Xóa tài liệu: "File cũ"', timestamp: '2 giờ trước', type: 'error' }
]

const recentUsers: UserDetail[] = [
  { id: 1, name: 'Nguyễn Văn A', email: 'a.nguyen@hcmut.edu.vn', role: 'Tutor', department: 'KHMT', joinDate: '2025-01-15', status: 'active', sessionsCount: 45, documentsUploaded: 23 },
  { id: 2, name: 'Trần Thị B', email: 'b.tran@hcmut.edu.vn', role: 'Student', department: 'KHMT', joinDate: '2025-02-20', status: 'active', sessionsCount: 12, documentsUploaded: 0 },
  { id: 3, name: 'Lê Văn C', email: 'c.le@hcmut.edu.vn', role: 'Tutor', department: 'ĐTVT', joinDate: '2024-09-10', status: 'active', sessionsCount: 67, documentsUploaded: 45 },
  { id: 4, name: 'Phạm Thị D', email: 'd.pham@hcmut.edu.vn', role: 'Student', department: 'CK', joinDate: '2025-03-05', status: 'inactive', sessionsCount: 8, documentsUploaded: 0 },
  { id: 5, name: 'Hoàng Văn E', email: 'e.hoang@hcmut.edu.vn', role: 'Tutor', department: 'XD', joinDate: '2024-11-22', status: 'active', sessionsCount: 34, documentsUploaded: 19 }
]

// --- Utility Functions ---

const getInitials = (user: User): string => {
  return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
}

const getFullName = (user: User): string => {
  return `${user.lastName} ${user.firstName}`
}

// --- Component ---

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'analytics' | 'logs'>('overview')
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')

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
    icon: any
    gradient: string
    trend: 'up' | 'down'
  }) => (
    <motion.div
      whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-indigo-50 relative overflow-hidden group"
    >
      <div className={`absolute top-0 right-0 w-32 h-32 ${gradient} rounded-full blur-3xl opacity-20 group-hover:scale-150 transition-transform duration-500`} />

      <div className="flex items-start justify-between mb-4">
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
        className={`p-4 rounded-xl bg-gradient-to-r ${getBgColor()} border border-gray-100 cursor-pointer`}
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

  const filteredUsers = recentUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === filterRole
    return matchesSearch && matchesRole
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      <Toaster position="top-right" />

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-blue-300/40 to-purple-300/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute top-1/3 -right-24 w-96 h-96 bg-gradient-to-br from-pink-300/40 to-indigo-300/40 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <div className="relative bg-white/80 backdrop-blur-md border-b-2 border-indigo-100 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl ring-4 ring-indigo-100"
              >
                <Settings className="w-8 h-8" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
    Admin Dashboard
                </h1>
                <p className="text-sm text-gray-600 flex items-center space-x-2 mt-1">
                  <span>{getFullName(mockAdminData)}</span>
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className="px-3 py-1 bg-gradient-to-r from-red-100 to-rose-100 text-red-700 rounded-full text-xs font-bold"
                  >
                    🛡️ Administrator
                  </motion.span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl hover:from-indigo-100 hover:to-purple-100 transition"
              >
                <Bell className="w-6 h-6 text-indigo-600" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-gradient-to-br from-red-50 to-rose-50 rounded-xl hover:from-red-100 hover:to-rose-100 transition"
              >
                <LogOut className="w-6 h-6 text-red-600" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="relative bg-white/70 backdrop-blur-md border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-2">
            {[
              { id: 'overview', label: 'Tổng quan', icon: Home, gradient: 'from-blue-500 to-cyan-500' },
              { id: 'users', label: 'Người dùng', icon: Users, gradient: 'from-purple-500 to-pink-500' },
              { id: 'analytics', label: 'Phân tích', icon: BarChart3, gradient: 'from-green-500 to-emerald-500' },
              { id: 'logs', label: 'Hoạt động', icon: Activity, gradient: 'from-orange-500 to-red-500' }
            ].map(tab => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                whileHover={{ y: -2 }}
                className={`relative py-4 px-6 font-medium text-sm flex items-center space-x-2 transition ${
                  activeTab === tab.id ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${tab.gradient} rounded-t-full`}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Line Chart */}
                <motion.div
                  whileHover={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-indigo-50"
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
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-purple-50"
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
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
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
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-green-50"
              >
                <div className="flex items-center justify-between mb-6">
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
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
      Quản lý người dùng
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-lg font-semibold flex items-center space-x-2"
                >
                  <Plus className="w-5 h-5" />
                  <span>Thêm người dùng</span>
                </motion.button>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm người dùng..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-purple-100 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 bg-white/80 backdrop-blur-sm"
                  />
                </div>
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="px-5 py-3 border-2 border-purple-100 rounded-xl focus:ring-4 focus:ring-purple-200 bg-white/80 backdrop-blur-sm font-medium"
                >
                  <option value="all">Tất cả vai trò</option>
                  <option value="Tutor">Giảng viên</option>
                  <option value="Student">Sinh viên</option>
                </select>
              </div>

              {/* Users Table */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-purple-50 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-purple-100 to-pink-100 border-b-2 border-purple-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-purple-700 uppercase">Người dùng</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-purple-700 uppercase">Vai trò</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-purple-700 uppercase">Khoa</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-purple-700 uppercase">Trạng thái</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-purple-700 uppercase">Hoạt động</th>
                      <th className="px-6 py-4 text-right text-sm font-bold text-purple-700 uppercase">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-purple-50">
                    {filteredUsers.map((user, index) => (
                      <motion.tr
                        key={user.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ backgroundColor: 'rgba(147, 51, 234, 0.03)' }}
                        className="cursor-pointer"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center text-white font-bold">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{user.name}</p>
                              <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                            user.role === 'Tutor'
                              ? 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700'
                              : 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700'
                          }`}>
                            {user.role === 'Tutor' ? '👨‍🏫 Giảng viên' : '👨‍🎓 Sinh viên'}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-700">{user.department}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                            user.status === 'active' ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700' :
                              user.status === 'inactive' ? 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700' :
                                'bg-gradient-to-r from-red-100 to-rose-100 text-red-700'
                          }`}>
                            {user.status === 'active' ? '✓ Hoạt động' :
                              user.status === 'inactive' ? '○ Không hoạt động' : '✕ Đình chỉ'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3 text-sm text-gray-600">
                            <span className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4 text-purple-500" />
                              <span className="font-medium">{user.sessionsCount}</span>
                            </span>
                            {user.role === 'Tutor' && (
                              <span className="flex items-center space-x-1">
                                <FileText className="w-4 h-4 text-indigo-500" />
                                <span className="font-medium">{user.documentsUploaded}</span>
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => {
                                setSelectedUser(user)
                                setShowUserModal(true)
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                              title="Xem chi tiết"
                            >
                              <Eye className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg"
                              title="Chỉnh sửa"
                            >
                              <Edit className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                              title="Xóa"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
      Phân tích & Báo cáo
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl shadow-lg font-semibold flex items-center space-x-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Xuất báo cáo</span>
                </motion.button>
              </div>

              {/* Analytics Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart - Monthly Growth */}
                <motion.div
                  whileHover={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-green-50"
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
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-emerald-50"
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

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

              {/* Detailed Statistics */}
              <motion.div
                whileHover={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-green-50"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center space-x-2">
                  <Target className="w-5 h-5 text-green-600" />
                  <span>Thống kê chi tiết</span>
                </h3>
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
                      <p className="text-xs text-gray-600 font-semibold mb-2">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                      <div className="flex items-center space-x-2">
                        <div className={'h-1.5 flex-1 bg-gray-200 rounded-full overflow-hidden'}>
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
            </motion.div>
          )}

          {/* Logs Tab */}
          {activeTab === 'logs' && (
            <motion.div
              key="logs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
      Nhật ký hoạt động
                </h2>
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
                    className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl shadow-lg font-semibold"
                  >
                    <Filter className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Activity Timeline */}
              <motion.div
                whileHover={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-orange-50"
              >
                <div className="space-y-4">
                  {activityLogs.map((log, index) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
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
      Xem thêm hoạt động
                </motion.button>
              </motion.div>

              {/* System Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-green-50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900">Server Status</h3>
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <p className="text-2xl font-bold text-green-600 mb-2">Hoạt động tốt</p>
                  <p className="text-sm text-gray-600">Uptime: 99.98%</p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-blue-50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900">Database</h3>
                    <Activity className="w-6 h-6 text-blue-500" />
                  </div>
                  <p className="text-2xl font-bold text-blue-600 mb-2">Ổn định</p>
                  <p className="text-sm text-gray-600">Response: 45ms</p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-purple-50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900">API Calls</h3>
                    <Zap className="w-6 h-6 text-purple-500" />
                  </div>
                  <p className="text-2xl font-bold text-purple-600 mb-2">45.2K</p>
                  <p className="text-sm text-gray-600">Hôm nay</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* User Detail Modal */}
      <AnimatePresence>
        {showUserModal && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowUserModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                    {selectedUser.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedUser.name}</h3>
                    <p className="text-sm text-gray-500">{selectedUser.email}</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowUserModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </motion.button>
              </div>

              {/* User Details */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                    <p className="text-sm text-gray-600 font-semibold mb-1">Vai trò</p>
                    <p className="text-lg font-bold text-gray-900">{selectedUser.role}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                    <p className="text-sm text-gray-600 font-semibold mb-1">Khoa</p>
                    <p className="text-lg font-bold text-gray-900">{selectedUser.department}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                    <p className="text-sm text-gray-600 font-semibold mb-1">Ngày tham gia</p>
                    <p className="text-lg font-bold text-gray-900">{selectedUser.joinDate}</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl">
                    <p className="text-sm text-gray-600 font-semibold mb-1">Trạng thái</p>
                    <p className="text-lg font-bold text-gray-900 capitalize">{selectedUser.status}</p>
                  </div>
                </div>

                {/* Activity Stats */}
                <div className="p-6 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border-2 border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-4">Thống kê hoạt động</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{selectedUser.sessionsCount}</p>
                        <p className="text-sm text-gray-600">Buổi tư vấn</p>
                      </div>
                    </div>
                    {selectedUser.role === 'Tutor' && (
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{selectedUser.documentsUploaded}</p>
                          <p className="text-sm text-gray-600">Tài liệu</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4 border-t-2 border-gray-100">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-bold shadow-md"
                  >
    Gửi tin nhắn
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold shadow-md"
                  >
    Chỉnh sửa
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminDashboard