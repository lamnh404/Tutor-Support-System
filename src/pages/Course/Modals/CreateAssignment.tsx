import React, { type ChangeEvent } from 'react'
import { modalBackdropVariants, modalPanelVariants } from '~/pages/Course/Config.ts'
import { motion } from 'framer-motion'
import type { NewAssignmentState } from '~/pages/Course/TypeDefinition.ts'

interface CreateAssginmentProps {
  newAssignment: NewAssignmentState
  handleNewAssignmentChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleCreateAssignment: () => void
  setShowAssignmentModal: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateAssignment: React.FC<CreateAssginmentProps>= ({ newAssignment, handleNewAssignmentChange, setShowAssignmentModal, handleCreateAssignment }) => {
  return (
    <motion.div
      variants={modalBackdropVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        variants={modalPanelVariants}
        className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md p-6 border-2 border-purple-100"
      >
        <h3 className="text-xl font-bold mb-5 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          ✨ Tạo bài tập mới
        </h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Tiêu đề bài tập"
            name="title"
            value={newAssignment.title}
            onChange={handleNewAssignmentChange}
            className="w-full border-2 border-purple-100 rounded-xl px-4 py-3 focus:ring-4 focus:ring-purple-200 focus:border-purple-400 bg-white/80 outline-none transition-all"
          />
          <textarea
            placeholder="Mô tả chi tiết"
            name="description"
            value={newAssignment.description}
            onChange={handleNewAssignmentChange}
            rows={3}
            className="w-full border-2 border-purple-100 rounded-xl px-4 py-3 focus:ring-4 focus:ring-purple-200 focus:border-purple-400 bg-white/80 outline-none transition-all"
          />
          <input
            type="date"
            name="dueDate"
            value={newAssignment.dueDate}
            onChange={handleNewAssignmentChange}
            className="w-full border-2 border-purple-100 rounded-xl px-4 py-3 focus:ring-4 focus:ring-purple-200 focus:border-purple-400 bg-white/80 outline-none transition-all"
          />
          <input
            type="number"
            placeholder="Điểm tối đa"
            name="points"
            value={newAssignment.points}
            onChange={handleNewAssignmentChange}
            className="w-full border-2 border-purple-100 rounded-xl px-4 py-3 focus:ring-4 focus:ring-purple-200 focus:border-purple-400 bg-white/80 outline-none transition-all"
          />
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAssignmentModal(false)}
            className="px-5 py-2 rounded-xl border-2 border-gray-300 hover:bg-gray-50 transition font-medium"
          >
            Hủy
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 8px 15px rgba(192, 38, 211, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCreateAssignment}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-md font-semibold"
          >
            Tạo
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default CreateAssignment