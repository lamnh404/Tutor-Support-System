import React, { useContext } from 'react'
import { tabContentVariants } from '~/pages/Course/Config.ts'
import { AnimatePresence, motion } from 'framer-motion'
import { isTutor } from '~/pages/Course/utils.ts'
import { Plus, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import type { Availability } from '~/pages/Course/TypeDefinition'
import { userContext } from '~/context/User/userContext.tsx'

interface AvailabilityCardProps {
  setShowAvailabilityModal: React.Dispatch<React.SetStateAction<boolean>>,
  availability: Availability[],
  setAvailability: React.Dispatch<React.SetStateAction<Availability[]>>
}

const AvailabilityCard: React.FC<AvailabilityCardProps> = ({ setShowAvailabilityModal, availability, setAvailability }) => {
  const { user } = useContext(userContext)
  return (
    <motion.div key="availability" {...tabContentVariants} className="space-y-6">
      <div className="flex justify-between items-center">
        <motion.h2
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
        >
        Lịch trống của tôi
        </motion.h2>
        {isTutor(user) && (
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(249, 115, 22, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAvailabilityModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 via-red-500 to-rose-500 text-white rounded-xl hover:from-orange-600 hover:via-red-600 hover:to-rose-600 flex items-center space-x-2 shadow-lg font-semibold"
          >
            <Plus className="w-5 h-5" />
            <span>Thêm lịch trống</span>
          </motion.button>
        )}
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-orange-50 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-orange-100 to-red-100 border-b-2 border-orange-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-orange-700 uppercase tracking-wider">📅 Thứ</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-orange-700 uppercase tracking-wider">⏰ Thời gian</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-orange-700 uppercase tracking-wider">📍 Hình thức</th>
              {isTutor(user) && (
                <th className="px-6 py-4 text-right text-sm font-bold text-orange-700 uppercase tracking-wider">⚙️ Thao tác</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-orange-50">
            <AnimatePresence>
              {availability.map((avail, index) => (
                <motion.tr
                  key={avail.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ backgroundColor: 'rgba(249, 115, 22, 0.05)' }}
                  className="transition"
                >
                  <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-gray-900">
                    {avail.day}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-700 font-medium">
                    {avail.startTime} - {avail.endTime}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap text-sm">
                    <span className={`px-3 py-1.5 rounded-lg font-bold ${
                      avail.type === 'online' ? 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700' :
                        avail.type === 'in-person' ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700' :
                          'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700'
                    }`}>
                      {avail.type === 'online' ? '💻 Trực tuyến' :
                        avail.type === 'in-person' ? '🏫 Trực tiếp' : '🔄 Cả hai'}
                    </span>
                  </td>
                  {isTutor(user) && (
                    <td className="px-6 py-5 whitespace-nowrap text-right text-sm">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setAvailability(availability.filter(a => a.id !== avail.id))
                          toast.error('Đã xoá lịch trống')
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition border-2 border-red-200"
                        title="Xóa lịch"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>
                    </td>
                  )}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

export default AvailabilityCard