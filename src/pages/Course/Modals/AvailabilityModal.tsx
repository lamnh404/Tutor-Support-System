import React, { type ChangeEvent } from 'react'
import { modalBackdropVariants, modalPanelVariants } from '~/pages/Course/Config.ts'
import { motion } from 'framer-motion'
import { daysOfWeek, type NewAvailabilityState } from '~/pages/Course/TypeDefinition.ts'

interface AvailabilityProps{
  newAvailability: NewAvailabilityState
  handleNewAvailabilityChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  handleAddAvailability: () => void
  setShowAvailabilityModal: React.Dispatch<React.SetStateAction<boolean>>
}

const AvailabilityModal: React.FC<AvailabilityProps> = ({ newAvailability, handleNewAvailabilityChange, setShowAvailabilityModal, handleAddAvailability }) => {
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
        className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md p-6 border-2 border-orange-100"
      >
        <h3 className="text-xl font-bold mb-5 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          🗓️ Thêm lịch trống
        </h3>
        <div className="space-y-4">
          <select
            name="day"
            value={newAvailability.day}
            onChange={handleNewAvailabilityChange}
            className="w-full border-2 border-orange-100 rounded-xl px-4 py-3 focus:ring-4 focus:ring-orange-200 focus:border-orange-400 bg-white/80 outline-none transition-all"
          >
            {daysOfWeek.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
          <div className="flex space-x-3">
            <input
              type="time"
              name="startTime"
              value={newAvailability.startTime}
              onChange={handleNewAvailabilityChange}
              className="flex-1 border-2 border-orange-100 rounded-xl px-4 py-3 focus:ring-4 focus:ring-orange-200 focus:border-orange-400 bg-white/80 outline-none transition-all"
            />
            <input
              type="time"
              name="endTime"
              value={newAvailability.endTime}
              onChange={handleNewAvailabilityChange}
              className="flex-1 border-2 border-orange-100 rounded-xl px-4 py-3 focus:ring-4 focus:ring-orange-200 focus:border-orange-400 bg-white/80 outline-none transition-all"
            />
          </div>
          <select
            name="type"
            value={newAvailability.type}
            onChange={handleNewAvailabilityChange}
            className="w-full border-2 border-orange-100 rounded-xl px-4 py-3 focus:ring-4 focus:ring-orange-200 focus:border-orange-400 bg-white/80 outline-none transition-all"
          >
            <option value="both">🔄 Cả hai</option>
            <option value="online">💻 Trực tuyến</option>
            <option value="in-person">🏫 Trực tiếp</option>
          </select>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAvailabilityModal(false)}
            className="px-5 py-2 rounded-xl border-2 border-gray-300 hover:bg-gray-50 transition font-medium"
          >
            Hủy
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 8px 15px rgba(239, 68, 68, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddAvailability}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-md font-semibold"
          >
            Thêm
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default AvailabilityModal