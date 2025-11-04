import React from 'react'
import { type UpcomingAppointment } from './TutorDashboardData'
import { CalendarOutlined, EnvironmentOutlined, InfoCircleOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'

const DISPLAY_LIMIT = 5

const formatDateTime = (date: Date): string => {
  return date.toLocaleString('vi-VN', {
    weekday: 'short', month: 'numeric', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

interface UpcomingAppointmentsProps {
  appointments: UpcomingAppointment[];
}

const UpcomingAppointments: React.FC<UpcomingAppointmentsProps> = ({ appointments }) => {

  const limitedAppointments = appointments.slice(0, DISPLAY_LIMIT)
  const hasMore = appointments.length > DISPLAY_LIMIT

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-green-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Lịch hẹn sắp tới
        </h2>
        {hasMore && (
          <a href="/my-connections?view=calendar" className="text-sm font-medium text-green-600 hover:underline flex items-center gap-1">
            Xem toàn bộ lịch <ArrowRightOutlined />
          </a>
        )}
      </div>

      {appointments.length === 0 ? (
        <p className="text-gray-500 italic">Không có lịch hẹn nào sắp tới.</p>
      ) : (
        <ul className="space-y-4">
          {limitedAppointments.map((app) => (
            <motion.li
              key={app.id}
              className="border border-green-200 rounded-xl p-4 flex flex-col sm:flex-row items-start gap-4 bg-gradient-to-bl from-green-200 to-emerald-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img src={app.studentAvatar} alt={app.studentName} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow flex-shrink-0"/>

              <div className="flex-grow min-w-0">
                <p className="font-semibold text-lg text-gray-800 truncate">{app.studentName}</p>
                <p className="text-sm font-medium text-green-700">{app.subject}</p>
                {app.description && (
                  <p className="text-sm text-gray-600 mt-1 flex items-start gap-1.5 pt-1 border-t border-green-300/50">
                    <InfoCircleOutlined className="mt-1 flex-shrink-0"/>
                    <span className="italic">{app.description}</span>
                  </p>
                )}
              </div>

              <div className="flex-shrink-0 sm:text-right sm:w-40 sm:ml-4 pt-2 sm:pt-0 space-y-1">
                <p className="text-sm font-semibold text-gray-700 flex items-start sm:justify-end gap-1.5">
                  <CalendarOutlined className="mt-1 flex-shrink-0" />
                  <span className="flex-1">{formatDateTime(app.dateTime)}</span>
                </p>
                <p className="text-sm text-gray-600 flex items-start sm:justify-end gap-1.5">
                  <EnvironmentOutlined className="mt-1 flex-shrink-0" />
                  <span className="flex-1">{app.location}</span>
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default UpcomingAppointments