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
      </div>
    </Link>
  )
}

export default CourseCard