import React from 'react'
import { type MyTutor } from './MyTutorData'
import { Link } from 'react-router-dom'
import { CalendarOutlined } from '@ant-design/icons'

const formatDateTime = (date: Date): string => {
  return date.toLocaleString('vi-VN', {
    weekday: 'short',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

interface TutorListCardProps {
  tutor: MyTutor;
}

const TutorListCard: React.FC<TutorListCardProps> = ({ tutor }) => {
  const gradientClass = 'bg-gradient-to-br from-blue-50 to-blue-100' // Apply the requested gradient

  return (
    <Link
      // to={`/tutor/${tutor.id}`}
      to="/tutor1"
      className="block group rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <div className={`relative ${gradientClass} p-6 flex flex-col sm:flex-row items-center gap-6 min-h-[180px]`}>
        <div className="flex-shrink-0">
          <img
            src={tutor.avatarUrl}
            alt={`${tutor.lastName} ${tutor.firstName}`}
            className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-md ring-1 ring-black/10"
          />
        </div>

        <div className="flex-grow text-center sm:text-left">
          <h3 className="text-2xl font-bold text-gray-900 truncate group-hover:text-indigo-700 transition-colors">
            {tutor.lastName} {tutor.firstName}
          </h3>
          <p className="text-xl font-medium text-gray-700 mt-1">
            {tutor.subject}
          </p>

          <div className="mt-3 text-sm">
            {tutor.nextSession ? (
              <div className="flex items-center justify-center sm:justify-start gap-2 bg-green-100 text-green-900 rounded-full px-5 py-3 w-fit border border-green-200 shadow-sm">
                <CalendarOutlined className="text-base text-green-700" />
                <span className="font-semibold">{formatDateTime(tutor.nextSession.dateTime)}</span>
                <span className="hidden sm:inline">- {tutor.nextSession.location}</span>
              </div>
            ) : (
              <div className="flex items-center justify-center sm:justify-start gap-2 px-5 py-3 text-gray-500">
                <CalendarOutlined className="text-base" />
                <span>Chưa có lịch hẹn</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default TutorListCard