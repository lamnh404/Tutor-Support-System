import React from 'react'
import { type Tutor } from './TutorData'
import { Link } from 'react-router-dom'

interface TutorCardProps {
  tutor: Tutor;
}

const TutorCard: React.FC<TutorCardProps> = ({ tutor }) => {
  const isFull = tutor.maxMentee > 0 ? tutor.currMentee >= tutor.maxMentee : true
  const menteeRatio = tutor.maxMentee > 0 ? tutor.currMentee / tutor.maxMentee : 1

  let menteeColorClass = 'text-green-600'
  if (isFull) {
    menteeColorClass = 'text-red-600'
  } else if (menteeRatio >= 0.6) {
    menteeColorClass = 'text-yellow-600'
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 flex flex-col md:flex-row items-start md:items-stretch gap-6 w-full">
      <div className="flex-shrink-0 flex items-center justify-center md:justify-start w-full md:w-auto">
        <img
          src={tutor.avatarUrl}
          alt={`${tutor.lastName} ${tutor.firstName}`}
          className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-indigo-200 shadow-sm"
        />
      </div>

      <div className="flex-grow flex flex-col md:w-1/2">
        <div className="flex items-center mb-2">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mr-2">
            {tutor.lastName} {tutor.firstName}
          </h2>
        </div>

        <span className="self-start inline-flex items-center px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mb-3">
          {tutor.department}
        </span>

        <div className="flex items-center text-gray-700 text-sm mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253" /></svg>
          <p>{tutor.expertise.join(', ')}</p>
        </div>

        <div className="flex items-center text-gray-700 text-sm mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
          <p className={`font-semibold ${menteeColorClass}`}>
            {tutor.currMentee} / {tutor.maxMentee}
          </p>
        </div>

        <p className="text-gray-600 text-sm mt-2 line-clamp-3">
          {tutor.description}
        </p>
      </div>

      <div className="flex-shrink-0 flex flex-col items-end md:items-start justify-between w-full md:w-48 mt-4 md:mt-0">
        <div className="text-right w-full">
          <div className="flex items-center justify-end md:justify-start gap-2 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-bold text-xl">{tutor.rating_avg.toFixed(1)}</span>
            <span className="text-gray-500 text-sm">({tutor.rating_count} đánh giá)</span>
          </div>
        </div>

        <div className="flex flex-col space-y-3 w-full">
          <button
            className="w-full bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors shadow-md disabled:bg-gray-400"
            disabled={isFull}
          >
            {isFull ? 'Đã đầy' : 'Gửi yêu cầu kết nối'}
          </button>
          <Link to={`/${tutor.id}`}>
            <button className="w-full bg-white text-gray-700 font-semibold py-3 px-4 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors shadow-sm">
            Xem hồ sơ
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TutorCard
