import React from 'react'
import { type MyTutor } from './MyTutorData'
import { Link } from 'react-router-dom'
import { ArrowRightOutlined } from '@ant-design/icons'

interface TutorListCardProps {
  tutor: MyTutor;
}

const TutorListCard: React.FC<TutorListCardProps> = ({ tutor }) => {
  const gradients = [
    'from-pink-300 via-purple-300 to-indigo-400',
    'from-green-300 via-blue-400 to-purple-500',
    'from-yellow-300 via-red-400 to-pink-500',
    'from-teal-300 via-cyan-400 to-blue-500',
    'from-green-200 via-lime-300 to-yellow-400',
    'from-purple-200 via-pink-300 to-red-400',
    'from-gray-300 via-gray-400 to-gray-500',
    'from-indigo-300 via-purple-400 to-pink-500'
  ]
  const gradientClass = gradients[parseInt(tutor.id, 10) % gradients.length] || gradients[0]

  return (
    <Link
      to={`/course/${tutor.id}`}
      className="block group rounded-lg overflow-hidden shadow-md border border-gray-200 bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-400"
    >
      <div className={`h-24 bg-gradient-to-bl ${gradientClass}`}>
      </div>

      <div className="p-6 pt-2 -mt-10 relative">
        <div className="flex items-end mb-3">
          <img
            src={tutor.avatarUrl}
            alt={`${tutor.lastName} ${tutor.firstName}`}
            className="w-16 h-16 rounded-full object-cover border-3 border-blue-300 shadow-md mr-3"
          />
          <p className="text-xl font-bold text-gray-700 line-clamp-1">
            {tutor.lastName} {tutor.firstName}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <h3 className="text-md font-semibold text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition-colors" style={{ minHeight: '2.5rem' }}>
            {tutor.subject}
          </h3>
        </div>
        <div className="mt-3 flex justify-end">
          <ArrowRightOutlined className="text-gray-400 group-hover:text-indigo-500 transition-colors" />
        </div>
      </div>
    </Link>
  )
}

export default TutorListCard