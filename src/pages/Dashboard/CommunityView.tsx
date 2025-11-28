import React, { useEffect } from 'react'
import CourseCard from './CourseCard'
import { getListCommunitiesOfTutorAPI } from '~/apis/communitiesAPI.ts'


export interface TutorCourse {
  id: string;
  name: string;
  studentCount: number;
  isActive?: boolean;
}

const CommunityView: React.FC = () => {

  const [myTaughtCourses, setMyTaughtCourses] = React.useState<TutorCourse[]>([])

  useEffect(() => {
    const fetchCommunities = () => {
      try {
        getListCommunitiesOfTutorAPI().then ((data) => {
          setMyTaughtCourses(data.communities)
        })
      } catch (error) {
        console.error('Error fetching communities:', error)
      }
    }

    fetchCommunities()
  }, [])


  if (myTaughtCourses.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Các khóa học
        </h2>
        <p className="text-gray-500 italic">Bạn hiện không dạy khóa học nào.</p>
      </div>
    )
  }


  const currentCourse = myTaughtCourses.filter((course) => course.isActive)[0]
  const completedCourses = myTaughtCourses.filter((course) => !course.isActive)

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300">

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Hiện tại
        </h2>
        <CourseCard course={currentCourse} />
      </div>

      {completedCourses.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Đã hoàn thành
          </h2>
          <div className="space-y-4">
            {completedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CommunityView