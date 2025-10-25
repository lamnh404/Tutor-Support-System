import React, { type ChangeEvent } from 'react'
import { modalBackdropVariants, modalPanelVariants } from '~/pages/Course/Config.ts'
import { motion } from 'framer-motion'
import type { Session, SessionStatus } from '~/pages/Course/TypeDefinition'

interface SessionModalProps {
  selectedSession: Session | null
  setSelectedSession: React.Dispatch<React.SetStateAction<Session| null>>
  setShowSessionModal: React.Dispatch<React.SetStateAction<boolean>>
  handleSessionAction: (sessionId: number, action: SessionStatus) => void
}

const SessionModal:React.FC<SessionModalProps>= ({ selectedSession, setSelectedSession, setShowSessionModal, handleSessionAction }) => {
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
        className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-lg p-6 border-2 border-green-100"
      >
        <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
    Quản lý buổi tư vấn
        </h3>
        <p className="text-sm text-gray-600 mb-4 font-medium">
          {selectedSession?.studentName} – {selectedSession?.topic}
        </p>
        <textarea
          placeholder="Nhập ghi chú sau buổi tư vấn..."
          value={selectedSession?.notes || ''}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            if (selectedSession !== null) {
              setSelectedSession({ ...selectedSession, notes: e.target.value })
            }
          }
          }
          rows={4}
          className="w-full border-2 border-green-100 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200 focus:border-green-400 bg-white/80 outline-none transition-all"
        />
        <div className="flex justify-end space-x-3 mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSessionModal(false)}
            className="px-5 py-2 rounded-xl border-2 border-gray-300 hover:bg-gray-50 transition font-medium"
          >
    Đóng
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 8px 15px rgba(16, 185, 129, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (selectedSession?.id !== undefined) {
                handleSessionAction(selectedSession.id, 'completed')
              }
            }}

            className="px-5 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-md font-semibold"
          >
    Đánh dấu hoàn thành
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default SessionModal