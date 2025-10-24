import React, { type Dispatch, type SetStateAction } from 'react'
import { gridContainerVariants, gridItemVariants, tabContentVariants } from '~/pages/Course/Config.ts'
import { motion } from 'framer-motion'
import { Calendar, Check, Clock, Mail, MapPin, Video, X } from 'lucide-react'
import { getStatusColor, isTutor } from '~/pages/Course/utils.ts'
import { mockUserData } from '~/pages/Course/mockData.ts'
import { type Session, type SessionStatus } from '~/pages/Course/TypeDefinition'


interface AssignmentCardProps {
  sessions: Session[],
  setShowSessionModal: Dispatch<SetStateAction<boolean>>,
  selectedSession: Session | null,
  setSelectedSession: Dispatch<SetStateAction<Session | null>>,
  setSessions: Dispatch<SetStateAction<Session[]>>,
  handleSessionAction: (sessionId: number, action: SessionStatus) => void

}
const SessionCard: React.FC<AssignmentCardProps> =({ sessions, setSelectedSession, setShowSessionModal, handleSessionAction }) => {
  return (
    <motion.div key="sessions" {...tabContentVariants} className="space-y-6">
      <div className="flex justify-between items-center">
        <motion.h2
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
        >
          Buổi tư vấn
        </motion.h2>
        <select className="px-5 py-3 border-2 border-green-100 rounded-xl text-sm focus:ring-4 focus:ring-green-200 focus:border-green-400 bg-white/80 backdrop-blur-sm font-medium">
          <option>🔍 Tất cả trạng thái</option>
          <option>⏳ Chờ xác nhận</option>
          <option>✅ Đã xác nhận</option>
          <option>✓ Hoàn thành</option>
        </select>
      </div>

      <motion.div
        className="grid gap-5"
        variants={gridContainerVariants}
        initial="hidden"
        animate="show"
      >
        {sessions.map(session => (
          <motion.div
            key={session.id}
            variants={gridItemVariants}
            whileHover={{ scale: 1.01 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-green-50 p-6 hover:shadow-xl transition-all relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-100/50 to-emerald-100/50 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-500" />

            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-14 h-14 bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg"
                  >
                    {session.studentName.charAt(0)}
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{session.studentName}</h3>
                    <p className="text-sm text-gray-500 flex items-center space-x-1">
                      <Mail className="w-3 h-3" />
                      <span>{session.studentEmail}</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-3 ml-18">
                  <p className="text-gray-800 font-semibold text-lg">📝 {session.topic}</p>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-2 rounded-lg"
                    >
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span className="font-medium text-gray-700">{session.date}</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center space-x-2 bg-gradient-to-r from-purple-50 to-pink-50 px-3 py-2 rounded-lg"
                    >
                      <Clock className="w-4 h-4 text-purple-500" />
                      <span className="font-medium text-gray-700">{session.time} ({session.duration}p)</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center space-x-2 bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-2 rounded-lg"
                    >
                      {session.type === 'online' ? (
                        <>
                          <Video className="w-4 h-4 text-green-500" />
                          <span className="font-medium text-gray-700">Trực tuyến</span>
                        </>
                      ) : (
                        <>
                          <MapPin className="w-4 h-4 text-green-500" />
                          <span className="font-medium text-gray-700">{session.location}</span>
                        </>
                      )}
                    </motion.div>
                  </div>
                  {session.type === 'online' && session.meetingLink && session.status === 'confirmed' && (
                    <motion.a
                      href={session.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, x: 5 }}
                      className="text-indigo-600 hover:text-indigo-700 text-sm font-bold underline inline-flex items-center space-x-1 mt-2"
                    >
                      <Video className="w-4 h-4" />
                      <span>Tham gia cuộc họp →</span>
                    </motion.a>
                  )}
                  {session.notes && session.status === 'completed' && (
                    <div className="mt-3 p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border-2 border-gray-100">
                      <p className="text-sm text-gray-700"><strong className="text-indigo-600">📌 Ghi chú:</strong> {session.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end space-y-3">
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold shadow-md ${getStatusColor(session.status)}`}
                >
                  {session.status === 'confirmed' ? '✅ Đã xác nhận' :
                    session.status === 'pending' ? '⏳ Chờ xác nhận' :
                      session.status === 'completed' ? '✓ Hoàn thành' : '❌ Đã hủy'}
                </motion.span>
                {isTutor(mockUserData) && session.status === 'pending' && (
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleSessionAction(session.id, 'confirmed')}
                      className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 shadow-md"
                      title="Xác nhận"
                    >
                      <Check className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleSessionAction(session.id, 'cancelled')}
                      className="p-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl hover:from-red-600 hover:to-rose-600 shadow-md"
                      title="Từ chối"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>
                )}
                {isTutor(mockUserData) && session.status === 'confirmed' && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedSession(session)
                      setShowSessionModal(true)
                    }}
                    className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 text-sm font-bold shadow-md"
                  >
                    Quản lý
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default SessionCard