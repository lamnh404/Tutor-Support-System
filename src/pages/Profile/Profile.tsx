import React, { useEffect, useState } from 'react'
import StudentProfile from '~/pages/StudentProfile/StudentProfile.tsx'
import TutorProfile from '~/pages/TutorProfile/TutorProfile.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import { profileAPI } from '~/apis/profileAPI'
import type { UserInfo, StudentProfileType, TutorProfileType } from '~/pages/Profile/ProfileConfig'
import { Spin } from 'antd'


const Profile: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [activeProfile, setActiveProfile] = useState('STUDENT')
  const [isStudent, setIsStudent] = useState(false)
  const [isTutor, setIsTutor] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [studentProfile, setStudentProfile] = useState<StudentProfileType | null>(null)
  const [tutorProfile, setTutorProfile] = useState<TutorProfileType | null>(null)

  useEffect(() => {

    // Reset state
    setIsStudent(false)
    setIsTutor(false)
    setStudentProfile(null)
    setTutorProfile(null)
    setUserInfo(null)
    setActiveProfile('STUDENT')
    setIsLoading(true)

    profileAPI(id as string)
      .then(data => {

        if ('studentProfile' in data && data.studentProfile) {
          setIsStudent(true)
          setStudentProfile(data.studentProfile as StudentProfileType)
        }

        if ('tutorProfile' in data && data.tutorProfile) {
          setIsTutor(true)
          setTutorProfile(data.tutorProfile as TutorProfileType)
        }

        const { studentProfile, tutorProfile, ...userInfo } = data
        setUserInfo(userInfo as UserInfo)
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch(_error => {
        navigate('/404', { replace: true })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id, navigate])

  if (isLoading) {
    return (
      <Spin
        size="large"
        tip="Đang tải thông tin..."
        fullscreen
      />
    )
  }

  if (!userInfo) {
    return null
  }


  return (
    <>
      { isStudent && isTutor && (
        <div key={id}>
          {/* Nút chuyển đổi */}
          <div className="flex gap-2 pb-4 pt-4 mx-auto items-center justify-center">
            <button
              onClick={() => setActiveProfile('STUDENT')}
              className={`px-4 py-2 rounded cursor-pointer ${
                activeProfile === 'STUDENT'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
                Hồ sơ Học viên
            </button>
            <button
              onClick={() => setActiveProfile('TUTOR')}
              className={`px-4 py-2 rounded cursor-pointer ${
                activeProfile === 'TUTOR'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
                Hồ sơ Gia sư
            </button>
          </div>
          {/* Display corresponding profile */}
          {activeProfile === 'STUDENT' ?
            <StudentProfile key={`student-${id}`} userInfo={userInfo} studentInfo={studentProfile!} />
            :
            <TutorProfile key={`tutor-${id}`} id = { id as string } userInfo={userInfo!} tutorInfo={tutorProfile!} /> }
        </div>
      )}

      {/* Nếu user CHỈ là Student */}
      { isStudent && !isTutor && studentProfile && <StudentProfile key={`student-${id}`} userInfo={userInfo} studentInfo={studentProfile} /> }

      {/* Nếu user CHỈ là Tutor */}
      { !isStudent && isTutor && tutorProfile && <TutorProfile key={`tutor-${id}`} id = {id as string } userInfo={userInfo} tutorInfo={tutorProfile} /> }
    </>
  )
}

export default Profile