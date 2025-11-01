import React from 'react'
import { myTaughtCourses } from './CourseInfo'
import CourseCard from './CourseCard'

const CommunityView: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Các khóa học đang dạy
      </h2>
      <div className="space-y-4">
        {myTaughtCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}

export default CommunityView