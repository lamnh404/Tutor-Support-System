import React, { useEffect, useState } from 'react'
import StudentProfile from '~/pages/StudentProfile/StudentProfile.tsx'
import TutorProfile from '~/pages/TutorProfile/TutorProfile.tsx'
import { useNavigate, useParams } from 'react-router-dom'
import { userIdentityAPI } from '~/apis/userAPI.ts'
const Profile: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [role, setRole] = useState<string>('STUDENT')
  const [activeProfile, setActiveProfile] = useState('STUDENT')
  useEffect(() => {
    userIdentityAPI(id as string)
      .then(response => response.data)
      .then(data => {
        setRole(data.roles)
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch(_error => {
        navigate('/404')
      })
  }, [id, navigate])
  return (
    <>
      { role === 'STUDENT' && <StudentProfile /> }
      { role === 'TUTOR' && <TutorProfile /> }
      {role === 'BOTH' && (
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

          {/* Hiển thị profile tương ứng */}
          {activeProfile === 'STUDENT' ? <StudentProfile /> : <TutorProfile />}
        </div>
      )}
    </>
  )
}

export default Profile