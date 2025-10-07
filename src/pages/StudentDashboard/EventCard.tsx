import React from 'react'
import { type Event } from './EventData'

// Helper function to map faculty to a Tailwind color class
const getFacultyColor = (faculty: Event['faculty']): string => {
  switch (faculty) {
  case 'Khoa Học Và Kĩ Thuật Máy Tính': return 'bg-blue-500'
  case 'Kỹ Thuật Xây Dựng': return 'bg-green-500'
  case 'Điện - Điện Tử': return 'bg-red-500'
  case 'Kỹ Thuật Hóa Học': return 'bg-yellow-500'
  case 'Cơ Khí': return 'bg-purple-500'
  default: return 'bg-gray-500'
  }
}

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const { left, total } = event.slots
  const isFull = left === 0
  const availabilityColor = isFull ? 'text-red-600' : 'text-green-600'
  const availabilityText = isFull ? 'Đã đầy' : `Còn ${left}/${total} chỗ`
  const facultyColor = getFacultyColor(event.faculty)

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 p-5 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-5">

      {/* Image/Icon Section */}
      <div className="flex-shrink-0 w-full md:w-32 flex justify-center items-center">
        <img
          src={event.image}
          alt={event.name}
          className="w-24 h-24 object-cover rounded-lg"
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src='https://placehold.co/100x100/cccccc/000000?text=Event' }}
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800 truncate">{event.name}</h3>
          <span className={`px-3 py-1 text-xs font-semibold rounded-full text-white ml-4 ${facultyColor}`}>
            {event.faculty}
          </span>
        </div>

        <p className="text-sm text-gray-500 mb-2">
          <span className="font-semibold text-gray-700">Giảng viên:</span> {event.tutor}
        </p>

        <p className="text-sm text-gray-500 mb-3">
          <span className="font-semibold text-gray-700">Thời gian:</span> {new Date(event.time).toLocaleString( 'vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          })}
        </p>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

        {/* Footer/Action */}
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <p className={`text-sm font-bold ${availabilityColor}`}>
            {availabilityText}
          </p>
          <button
            disabled={isFull}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
              isFull
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isFull ? 'Đã đóng' : 'Đăng ký'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventCard