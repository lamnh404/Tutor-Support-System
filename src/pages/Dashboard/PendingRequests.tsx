import React from 'react'
import { type PendingRequest } from './TutorDashboardData'
import { CheckOutlined, CloseOutlined, MessageOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'

interface PendingRequestsProps {
  requests: PendingRequest[];
  onAccept: (requestId: string) => void;
  onReject: (requestId: string) => void;
  limit?: number;
}

const PendingRequests: React.FC<PendingRequestsProps> = ({ requests, onAccept, onReject, limit = 2 }) => {
  const displayedRequests = requests.slice(0, limit)

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-blue-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
          Yêu cầu đang chờ ({requests.length})
        </h2>
        {requests.length > limit && (
          <a href="#" className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1">
            Xem tất cả <ArrowRightOutlined />
          </a>
        )}
      </div>
      {requests.length === 0 ? (
        <p className="text-gray-500 italic">Không có yêu cầu kết nối nào.</p>
      ) : (
        <ul className="space-y-4">
          {displayedRequests.map((req) => (
            <motion.li
              key={req.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border border-blue-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gradient-to-bl from-blue-200 to-sky-200"
            >
              <div className="flex items-center gap-4 flex-grow min-w-0">
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
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: '#38A169' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onAccept(req.id)}
                  aria-label={`Chấp nhận ${req.studentName}`}
                  className="p-2 px-3 rounded-full bg-green-500 text-white shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1"
                >
                  <CheckOutlined />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1, backgroundColor: '#E53E3E' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onReject(req.id)}
                  aria-label={`Từ chối ${req.studentName}`}
                  className="p-2 px-3 rounded-full bg-red-500 text-white shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1"
                >
                  <CloseOutlined />
                </motion.button>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default PendingRequests