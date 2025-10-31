// src/pages/TutorDashboard/PendingRequests.tsx
import React from 'react'
import { type PendingRequest } from './TutorDashboardData'
import { CheckOutlined, CloseOutlined, MessageOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion' // Import motion

interface PendingRequestsProps {
  requests: PendingRequest[];
  onAccept: (requestId: string) => void;
  onReject: (requestId: string) => void;
}

const PendingRequests: React.FC<PendingRequestsProps> = ({ requests, onAccept, onReject }) => {
  return (
    // Apply similar container styling
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-blue-100">
      <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
        Yêu cầu đang chờ ({requests.length})
      </h2>
      {requests.length === 0 ? (
        <p className="text-gray-500 italic">Không có yêu cầu kết nối nào.</p>
      ) : (
        <ul className="space-y-4 max-h-60 overflow-y-auto pr-2 -mr-2">
          {requests.map((req) => (
            <li key={req.id} className="border border-blue-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gradient-to-bl from-sky-200 to-sky-300">
              <div className="flex items-center gap-4 flex-grow">
                <img src={req.studentAvatar} alt={req.studentName} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"/>
                <div className="min-w-0">
                  <p className="font-medium text-gray-800 truncate">{req.studentName}</p>
                  {req.message && (
                    <p className="text-xs text-gray-600 italic flex items-center gap-1 mt-0.5 truncate"><MessageOutlined /> "{req.message}"</p>
                  )}
                  <p className="text-xs text-gray-400 mt-0.5">{req.requestDate.toLocaleDateString('vi-VN')}</p>
                </div>
              </div>
              <div className="flex gap-2 self-end sm:self-center flex-shrink-0">
                {/* Add motion to buttons */}
                <motion.button
                  whileHover={{ scale: 1.1 }} // Example green color
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onAccept(req.id)}
                  aria-label={`Chấp nhận ${req.studentName}`}
                  className="p-2 px-3 rounded-full cursor-pointer bg-green-500 text-white shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1"
                >
                  <CheckOutlined />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }} // Example red color
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onReject(req.id)}
                  aria-label={`Từ chối ${req.studentName}`}
                  className="p-2 px-3 rounded-full cursor-pointer bg-red-500 text-white shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1"
                >
                  <CloseOutlined />
                </motion.button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default PendingRequests