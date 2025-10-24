import React, { useContext } from 'react'
import { gridContainerVariants, gridItemVariants, tabContentVariants } from '~/pages/Course/Config.ts'
import { motion } from 'framer-motion'
import { isTutor } from '~/pages/Course/utils.ts'
import { Calendar, Edit, FileText, Plus, Star, Trash2 } from 'lucide-react'
import { type Assignment } from '~/pages/Course/TypeDefinition'
import { userContext } from '~/context/User/userContext.tsx'
interface AssignmentCardProps{
  setShowAssignmentModal: React.Dispatch<React.SetStateAction<boolean>>,
  assignments: Assignment[]
}

const AssignmentCard : React.FC<AssignmentCardProps> = ({ setShowAssignmentModal, assignments }) => {
  const { user } = useContext(userContext)
  return (
    <motion.div key="assignments" {...tabContentVariants} className="space-y-6">
      <div className="flex justify-between items-center">
        <motion.h2
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
        >
          Quản lý Bài tập
        </motion.h2>
        {isTutor(user) && (
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(147, 51, 234, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAssignmentModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white rounded-xl hover:from-purple-600 hover:via-pink-600 hover:to-rose-600 flex items-center space-x-2 shadow-lg font-semibold"
          >
            <Plus className="w-5 h-5" />
            <span>Tạo bài tập mới</span>
          </motion.button>
        )}
      </div>

      <motion.div
        className="grid gap-5"
        variants={gridContainerVariants}
        initial="hidden"
        animate="show"
      >
        {assignments.map(assignment => (
          <motion.div
            key={assignment.id}
            variants={gridItemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-purple-50 p-6 hover:shadow-xl transition-all relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-purple-100/50 to-pink-100/50 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-500" />

            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{assignment.title}</h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{assignment.description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-2 rounded-lg"
                  >
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">Hạn: {assignment.dueDate}</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-2 bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-2 rounded-lg"
                  >
                    <FileText className="w-4 h-4 text-green-500" />
                    <span className="font-medium">{assignment.submissions}/{assignment.totalStudents} bài nộp</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-2 bg-gradient-to-r from-yellow-50 to-amber-50 px-3 py-2 rounded-lg"
                  >
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium">{assignment.points} điểm</span>
                  </motion.div>
                </div>
              </div>
              <motion.span
                whileHover={{ scale: 1.1 }}
                className={`px-4 py-2 rounded-xl text-xs font-bold shadow-md ${
                  assignment.status === 'active' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' :
                    assignment.status === 'upcoming' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' :
                      'bg-gradient-to-r from-gray-400 to-slate-400 text-white'
                }`}
              >
                {assignment.status === 'active' ? '✓ Đang mở' :
                  assignment.status === 'upcoming' ? '⏰ Sắp mở' : '🔒 Đã đóng'}
              </motion.span>
            </div>

            <div className="flex items-center space-x-3 pt-4 border-t-2 border-purple-50">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 px-5 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition text-sm font-bold shadow-md"
              >
                Xem bài nộp
              </motion.button>
              {isTutor(user) && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-3 border-2 border-indigo-200 text-indigo-600 rounded-xl hover:bg-indigo-50 transition text-sm font-medium"
                  >
                    <Edit className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-3 border-2 border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition text-sm font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default AssignmentCard