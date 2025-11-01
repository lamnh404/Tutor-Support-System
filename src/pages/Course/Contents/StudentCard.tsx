import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { Award, BookOpen, Calendar, Filter, Mail, Phone, Search, User } from 'lucide-react'
import { mockStudents } from '~/pages/Course/mockData.ts'
import { gridContainerVariants, gridItemVariants, tabContentVariants } from '~/pages/Course/Config.ts'


const StudentCard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || student.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <motion.div
      key="students"
      {...tabContentVariants}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <motion.h2
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
        >
          Danh sách Học sinh
        </motion.h2>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-sm text-gray-600 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-purple-100"
        >
          Tổng số: <span className="font-bold text-purple-600">{filteredStudents.length}</span> học sinh
        </motion.div>
      </div>

      {/* Search and Filter */}
      <motion.div
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />

          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/90 backdrop-blur-sm border-2 border-purple-100 rounded-xl focus:border-purple-300 focus:outline-none transition shadow-sm"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="pl-12 pr-8 py-3 bg-white/90 backdrop-blur-sm border-2 border-purple-100 rounded-xl focus:border-purple-300 focus:outline-none transition shadow-sm appearance-none cursor-pointer"
          >
            <option value="all">📋 Tất cả trạng thái</option>
            <option value="active">📘 Đang học</option>
            <option value="inactive">⏸️ Tạm nghỉ</option>
          </select>
        </div>
      </motion.div>

      {/* Students Grid */}
      <motion.div
        className="grid gap-5 md:grid-cols-2 lg:grid-cols-2"
        variants={gridContainerVariants}
        initial="hidden"
        animate="show"
      >
        {filteredStudents.map(student => (
          <motion.div
            key={student.id}
            variants={gridItemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-purple-50 p-6 hover:shadow-xl transition-all relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-purple-100/50 to-pink-100/50 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-500" />

            {/* Header with Avatar and Status */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="text-5xl"
                >
                  {student.avatar}
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{student.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                    <Mail className="w-4 h-4" />
                    <span>{student.email}</span>
                  </div>
                </div>
              </div>
              <motion.span
                whileHover={{ scale: 1.1 }}
                className={`px-4 py-2 rounded-xl text-xs font-bold shadow-md ${
                  student.status === 'active'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                    : 'bg-gradient-to-r from-gray-400 to-slate-400 text-white'
                }`}
              >
                {student.status === 'active' ? '✓ Đang học' : '⏸ Tạm nghỉ'}
              </motion.span>
            </div>

            {/* Contact Info */}
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
              <Phone className="w-4 h-4 text-purple-500" />
              <span className="font-medium">{student.phone}</span>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 rounded-lg"
              >
                <div className="flex items-center space-x-2 text-blue-600 mb-1">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-xs font-medium">Khóa học</span>
                </div>
                <p className="text-xl font-bold text-gray-900">{student.coursesEnrolled}</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-3 rounded-lg"
              >
                <div className="flex items-center space-x-2 text-green-600 mb-1">
                  <Award className="w-4 h-4" />
                  <span className="text-xs font-medium">Điểm TB</span>
                </div>
                <p className="text-xl font-bold text-gray-900">{student.averageScore}</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-3 rounded-lg"
              >
                <div className="flex items-center space-x-2 text-purple-600 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-medium">Ngày vào</span>
                </div>
                <p className="text-sm font-bold text-gray-900">{student.enrollDate}</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-yellow-50 to-amber-50 px-4 py-3 rounded-lg"
              >
                <div className="flex items-center space-x-2 text-yellow-600 mb-1">
                  <User className="w-4 h-4" />
                  <span className="text-xs font-medium">Bài nộp</span>
                </div>
                <p className="text-xl font-bold text-gray-900">{student.completedAssignments}</p>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3 pt-4 border-t-2 border-purple-50">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 px-5 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition text-sm font-bold shadow-md"
              >
                Xem chi tiết
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-3 border-2 border-indigo-200 text-indigo-600 rounded-xl hover:bg-indigo-50 transition text-sm font-medium"
              >
                Nhắn tin
              </motion.button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredStudents.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">Không tìm thấy học sinh</h3>
          <p className="text-gray-500">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default StudentCard