import React from 'react'
import { type UpcomingAppointment } from './TutorDashboardData'
import { CalendarOutlined, EnvironmentOutlined, InfoCircleOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'

interface UpcomingAppointmentsProps {
  appointments: UpcomingAppointment[];
  limit?: number;
}

const formatDateTime = (date: Date): string => {
  return date.toLocaleString('vi-VN', {
    weekday: 'short', month: 'numeric', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

const UpcomingAppointments: React.FC<UpcomingAppointmentsProps> = ({ appointments, limit = 3 }) => {
  const limitedAppointments = appointments.slice(0, limit)

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-green-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Lịch hẹn sắp tới
        </h2>
        {appointments.length > limit && (
          <a href="/my-connections" className="text-sm font-medium text-green-600 hover:underline flex items-center gap-1">
            Xem toàn bộ lịch <ArrowRightOutlined />
          </a>
        )}
      </div>
      {limitedAppointments.length > 0 ? (
        <ul className="space-y-4">
          {limitedAppointments.map((app) => (
            <motion.li
              key={app.id}
              className="border border-green-100 rounded-xl p-4 flex items-start gap-4 bg-gradient-to-r from-green-50/50 to-emerald-50/50"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img src={app.studentAvatar} alt={app.studentName} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow flex-shrink-0"/>
              <div className="flex-grow min-w-0">
                <p className="font-medium text-gray-800 truncate">{app.studentName}</p>
                <p className="text-xs text-green-800 font-semibold">{app.subject}</p>
                <p className="text-sm text-gray-600 mt-1 flex items-center gap-1.5"><CalendarOutlined /> {formatDateTime(app.dateTime)}</p>
                <p className="text-sm text-gray-600 flex items-center gap-1.5"><EnvironmentOutlined /> {app.location}</p>
                {app.description && (
                  <p className="text-xs text-gray-500 mt-1 flex items-start gap-1.5 pt-1 border-t border-green-100">
                    <InfoCircleOutlined className="mt-0.5 flex-shrink-0"/>
                    <span className="italic">{app.description}</span>
                  </p>
                )}
              </div>
            </motion.li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic">Không có lịch hẹn nào sắp tới.</p>
      )}
    </div>
  )
}

export default UpcomingAppointments