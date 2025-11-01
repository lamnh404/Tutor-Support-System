import React from 'react'
import { type TutorCourse } from './CourseInfo'
import { Link } from 'react-router-dom'
import { TeamOutlined, ArrowRightOutlined } from '@ant-design/icons'

interface CourseCardProps {
  course: TutorCourse;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Link
      to={`/course/${course.id}`}
      className="block group"
    >
      <div className={`relative p-5 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-300 bg-gradient-to-bl ${course.gradient}`}>
        {course.hasNotification && (
          <span className="absolute top-4 right-4 z-10 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        )}

        <p className="text-sm font-semibold text-gray-500">{course.code}</p>
        <h3 className="text-lg font-bold text-gray-900 mt-1 mb-3 line-clamp-2" style={{ minHeight: '2rem' }}>
          {course.name}
        </h3>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <TeamOutlined />
            <span>{course.studentCount} học sinh</span>
          </div>
          <ArrowRightOutlined className="text-gray-400 group-hover:text-indigo-600 transition-colors" />
        </div>

        {course.lastActivity && (
          <p className="text-xs text-gray-500 italic mt-3 pt-3 border-t border-gray-300/60">
            Hoạt động cuối: {course.lastActivity}
          </p>
        )}
      </div>
    </Link>
  )
}

export default CourseCard