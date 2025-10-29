import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, Edit, Eye, FileText, Plus, Search, Trash2, X } from 'lucide-react'
import { recentUsers } from '~/pages/admin/mockData.ts'
import type { UserDetail } from '~/pages/admin/TypeDefinition.ts'

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null)
  const [showUserModal, setShowUserModal] = useState(false)

  const filteredUsers = recentUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === filterRole
    return matchesSearch && matchesRole
  })

  return (
    <>
      <div className="w-full h-full overflow-auto">
        <div className="max-w-7xl mx-auto p-6">
          <motion.div
            key="users"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Quản lý người dùng
                </h2>
                <p className="text-gray-600 mt-1">Quản lý và theo dõi thông tin người dùng</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-lg font-semibold flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Thêm người dùng</span>
              </motion.button>
            </div>

            {/* Search and Filter Section */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border-2 border-purple-50">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2" />
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
            </div>

            {/* Results Summary */}
            <div className="flex items-center justify-between px-2">
              <p className="text-sm text-gray-600">
                Hiển thị <span className="font-bold text-purple-600">{filteredUsers.length}</span> người dùng
              </p>
            </div>

            {/* Users Table Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-purple-50 overflow-hidden">
              <div className="overflow-x-auto">
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
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((user, index) => (
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
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center space-y-3">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                              <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500 font-medium">Không tìm thấy người dùng</p>
                            <p className="text-sm text-gray-400">Thử tìm kiếm với từ khóa khác</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
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
    </>
  )
}

export default UserManagement