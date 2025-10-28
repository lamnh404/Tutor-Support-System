// src/pages/TutorDashboard/UpcomingAppointments.tsx
import React from 'react'
import { type UpcomingAppointment } from './TutorDashboardData'
import { CalendarOutlined, EnvironmentOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion' // Import motion

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
    // Apply similar container styling
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-green-100">
      <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
        Lịch hẹn sắp tới
      </h2>
      {limitedAppointments.length > 0 ? (
        <ul className="space-y-4">
          {limitedAppointments.map((app) => (
            // Add hover effect to list item
            <motion.li
              key={app.id}
              className="border border-green-100 rounded-xl p-4 flex items-start gap-4 bg-gradient-to-bl from-green-200 to-green-300 cursor-pointer"
              whileHover={{ scale: 1.02, boxShadow: '0 5px 10px rgba(16, 185, 129, 0.1)' }} // Subtle hover effect
              // onClick={() => handleAppointmentClick(app)} // Optional click handler
            >
              <img src={app.studentAvatar} alt={app.studentName} className="w-12 h-12 rounded-full object-cover border-2 border-white shadow flex-shrink-0"/>
              <div className="flex-grow min-w-0">
                <p className="font-medium text-black text-xl truncate">{app.studentName}</p>
                <p className="text-md text-green-800 font-semibold">{app.subject}</p>
                <p className="text-sm text-black mt-1 flex items-center gap-1.5"><CalendarOutlined /> {formatDateTime(app.dateTime)}</p>
                <p className="text-sm text-black flex items-center gap-1.5"><EnvironmentOutlined /> {app.location}</p>
                {app.description && (
                  <p className="text-md text-black mt-1 flex items-start gap-1.5 pt-1 border-t border-green-100">
                    <InfoCircleOutlined className="mt-0.5 flex-shrink-0"/>
                    <span className="italic">{app.description}</span>
                  </p>
                )}
              </div>
            </motion.li>
          ))}
          {appointments.length > limit && (
            <li className="text-center text-sm text-gray-500 pt-2">
              <a href="/calendar" className="hover:underline text-indigo-600 font-medium">Xem tất cả lịch hẹn...</a>
            </li>
          )}
        </ul>
      ) : (
        <p className="text-gray-500 italic">Không có lịch hẹn nào sắp tới.</p>
      )}
    </div>
  )
}

export default UpcomingAppointments