import React, { useContext, useState } from 'react'
import { type Tutor } from './TutorData'
import { Link } from 'react-router-dom'
import {
  type DepartmentCode,
  DEPARTMENTS, // Import the array of department objects
  EXPERTISES // Import the array of expertise objects
} from '../../utils/definitions.tsx'
import { connectionAPI } from '~/apis/connectionAPI.ts'
import { toast } from 'react-toastify'
import { Modal } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { iDContext } from '~/context/IdContext/idContext.tsx'
import TextArea from 'antd/es/input/TextArea'

interface TutorCardProps {
  tutor: Tutor;
  isAllowedToRequest?: boolean;
}

const getDepartmentColors = (departmentCode: DepartmentCode) => {
  switch (departmentCode) {
  case 'CS':
    return { tagBg: 'bg-blue-100', tagText: 'text-blue-800' }
  case 'CE':
    return { tagBg: 'bg-cyan-100', tagText: 'text-cyan-800' }
  case 'EE':
    return { tagBg: 'bg-amber-100', tagText: 'text-amber-800' }
  case 'ME':
    return { tagBg: 'bg-slate-100', tagText: 'text-slate-800' }
  case 'CH':
    return { tagBg: 'bg-teal-100', tagText: 'text-teal-800' }
  default:
    return { tagBg: 'bg-gray-100', tagText: 'text-gray-800' }
  }
}

const TutorCard: React.FC<TutorCardProps> = ({ tutor, isAllowedToRequest }) => {
  const isFull = tutor.maxMentee > 0 ? tutor.currMentee >= tutor.maxMentee : true
  const menteeRatio = tutor.maxMentee > 0 ? tutor.currMentee / tutor.maxMentee : 1
  const id = tutor.id
  const { ownId } = useContext(iDContext)
  const [isEnrollModalVisible, setIsEnrollModalVisible] = React.useState(false)
  const [enrollMessage, setEnrollMessage] = React.useState('')
  const status = tutor.statusConnection || ''
  const [IsRequested, setIsRequested] = useState(status === 'PENDING' || status === 'ACCEPTED')

  let menteeColorClass = 'text-green-600'
  if (isFull) {
    menteeColorClass = 'text-red-600'
  } else if (menteeRatio >= 0.6) {
    menteeColorClass = 'text-yellow-600'
  }

  const colors = getDepartmentColors(tutor.department)

  // Find the Vietnamese name for the department
  const departmentName = DEPARTMENTS.find(d => d.code === tutor.department)?.name || tutor.department

  // Find the Vietnamese names for the expertise list
  const expertiseNames = tutor.expertise.map(code => {
    return EXPERTISES.find(e => e.code === code)?.name || code
  }).join(', ')
  const handleSendRequest = async () => {
    if (isFull) return
    setIsEnrollModalVisible(true)
  }
  const handleEnrollSubmit = async () => {
    const data = await connectionAPI(id, ownId, enrollMessage)

    if ( process.env.NODE_ENV === 'development') {
      toast.success( data.message )
    }
    setIsEnrollModalVisible(false)
    setEnrollMessage('')
    setIsRequested(true)
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 flex flex-col md:flex-row items-start gap-6 w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-200/50">
      <div className="flex-shrink-0 flex items-center justify-center w-full md:w-auto">
        <img
          src={tutor.avatarUrl}
          alt={`${tutor.lastName} ${tutor.firstName}`}
          className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-gray-100 shadow-sm"
        />
      </div>

      <div className="flex-grow flex flex-col">
        <div className="flex items-center mb-2">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mr-2">
            {tutor.lastName} {tutor.firstName}
          </h2>
        </div>

        <span className={`self-start inline-flex items-center px-3 py-1 text-xs font-semibold ${colors.tagBg} ${colors.tagText} rounded-full mb-4`}>
          {departmentName}
        </span>

        <div className="space-y-3 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253" /></svg>
            <p className="font-medium">{expertiseNames}</p>
          </div>

          <div className="flex items-center text-gray-600 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <p className={`font-bold ${menteeColorClass}`}>
              {tutor.currMentee} / {tutor.maxMentee}
            </p>
            <span className="ml-1 font-medium">mentees</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mt-auto line-clamp-3">
          {tutor.description}
        </p>
      </div>

      <div className="flex-shrink-0 flex flex-col justify-between w-full md:w-48 mt-4 md:mt-0">
        <div className="flex items-center justify-end md:justify-start gap-2 mb-4 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="font-bold text-lg text-gray-800">{tutor.rating_avg.toFixed(1)}</span>
          <span className="text-gray-500 text-sm">({tutor.rating_count} đánh giá)</span>
        </div>

        <div className="flex flex-col space-y-3 w-full">
          {isAllowedToRequest &&
          <button
            className="w-full bg-blue-500 cursor-pointer text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={isFull || IsRequested }
            onClick={handleSendRequest}
          >
            {
              isFull
                ? 'Đã đầy'
                : tutor.statusConnection=== 'ACCEPTED'
                  ? 'Đã kết nối'
                  : tutor.statusConnection === 'PENDING'
                    ? 'Đã gửi yêu cầu'
                    : 'Gửi yêu cầu kết nối'
            }

          </button>
          }
          <Link
            to={`/${tutor.id}`}
            className="w-full text-center bg-white cursor-pointer text-gray-700 font-semibold py-3 px-4 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors shadow-sm"
          >
            Xem hồ sơ
          </Link>
        </div>
      </div>
      {/* Enroll Request Modal */}
      <Modal
        title={
          <div className="flex items-center gap-3">
            <UserAddOutlined className="text-blue-500 text-2xl" />
            <span className="text-xl font-bold">Gửi yêu cầu nhập học</span>
          </div>
        }
        open={isEnrollModalVisible}
        onOk={handleEnrollSubmit}
        onCancel={() => setIsEnrollModalVisible(false)}
        okText="Gửi yêu cầu"
        cancelText="Hủy"
        okButtonProps={{
          className: 'bg-blue-500 hover:bg-blue-600',
          size: 'large'
        }}
        cancelButtonProps={{
          size: 'large'
        }}
        width={600}
      >
        <div className="py-4">
          <div className="mb-4 p-4 bg-blue-50 rounded-xl border-l-4 border-blue-500">
            <p className="text-gray-700">
              Bạn đang gửi yêu cầu nhập học với <span className="font-bold text-blue-600">{tutor.lastName} {tutor.firstName}</span>
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Lời nhắn đến giảng viên
              </label>
              <TextArea
                rows={6}
                placeholder="Giới thiệu bản thân, mục tiêu học tập và lý do muốn học với giảng viên này..."
                value={enrollMessage}
                onChange={(e) => setEnrollMessage(e.target.value)}
                className="text-base"
              />
            </div>

            <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">💡 Lưu ý: Giảng viên sẽ xem xét yêu cầu của bạn và phản hồi trong vòng 24-48 giờ.</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default TutorCard