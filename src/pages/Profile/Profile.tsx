import React, { useEffect, useState } from 'react'
import StudentProfile from '~/pages/StudentProfile/StudentProfile.tsx'
import TutorProfile from '~/pages/TutorProfile/TutorProfile.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import { profileAPI } from '~/apis/profileAPI'
import type { UserInfo, StudentProfileType, TutorProfileType } from '~/pages/Profile/ProfileConfig'


const Profile: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [activeProfile, setActiveProfile] = useState('STUDENT')
  const [isStudent, setIsStudent] = useState(false)
  const [isTutor, setIsTutor] = useState(false)
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [studentProfile, setStudentProfile] = useState<StudentProfileType | null>(null)
  const [tutorProfile, setTutorProfile] = useState<TutorProfileType | null>(null)
  useEffect(() => {
    profileAPI(id as string)
      .then(data => {
        console.log(data)
        if ( 'studentProfile' in data)
          setIsStudent(true)

        if ( 'tutorProfile' in data)
          setIsTutor(true)
        const { studentProfile, tutorProfile, ...userInfo } = data
        setUserInfo(userInfo as UserInfo)
        setStudentProfile(studentProfile as StudentProfileType)
        setTutorProfile(tutorProfile as TutorProfileType)
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch(_error => {
        navigate('/404', { replace: true })
      })
  }, [id, navigate])
  return (
    <>
      { isStudent && <StudentProfile userInfo ={userInfo!} studentInfo = {studentProfile!} /> }

      { isTutor && <TutorProfile userInfo={userInfo!} tutorInfo={tutorProfile!} /> }

      { isStudent && isTutor && (
        <div>
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
            <StudentProfile userInfo ={userInfo!} studentInfo = {studentProfile!} />
            :
            <TutorProfile userInfo={userInfo!} tutorInfo={tutorProfile!} /> }
        </div>
      )}
    </>
  )
}

export default Profile