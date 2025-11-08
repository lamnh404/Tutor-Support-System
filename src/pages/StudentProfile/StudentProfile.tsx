import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from '~/context/User/userContext'
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  BookOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  CameraOutlined,
  TrophyOutlined,
  CheckCircleFilled,
  GlobalOutlined
} from '@ant-design/icons'
import { Card, Avatar, Button, Tag, Input, Select, message, Divider, Upload, type UploadProps } from 'antd'
import { DEPARTMENTS } from '~/pages/TutorSearch/TutorDefinitions'
import type { DepartmentCode } from '~/pages/TutorSearch/TutorDefinitions'

const { TextArea } = Input
const { Option } = Select

export interface UserInfo {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  department: DepartmentCode
  avatarUrl?: string
}

export interface StudentProfileType {
  studentID: string
  currentGPA: number
  learningGoals: string[]
  studentDescription: string
  achievements: Certificate[]
  // Additional fields from old structure
  year?: number
  completedCourses?: number
  totalHoursLearned?: number
  currentCourses?: string[]
  needHelpWith?: string[]
}

interface Certificate {
  id: string
  name: string
  issuer: string
  date: string
}

interface StudentProfileProps {
  userInfo: UserInfo
  studentInfo: StudentProfileType
}

const StudentProfile: React.FC<StudentProfileProps> = ({ userInfo, studentInfo }) => {
  const { user } = useContext(userContext)
  const navigate = useNavigate()

  const [isEditing, setIsEditing] = useState(false)
  const [editedUserInfo, setEditedUserInfo] = useState<UserInfo>(userInfo)
  const [editedStudentInfo, setEditedStudentInfo] = useState<StudentProfileType>(studentInfo)

  if (!user) {
    navigate('/login')
    return null
  }

  const getDepartmentName = (code: string) => {
    const dept = DEPARTMENTS.find(d => d.code === code)
    return dept?.name || code
  }

  const getYearText = (year: number) => {
    switch (year) {
    case 1: return 'Năm 1'
    case 2: return 'Năm 2'
    case 3: return 'Năm 3'
    case 4: return 'Năm 4'
    default: return `Năm ${year}`
    }
  }

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.6) return { text: 'Xuất sắc', color: '#fadb14', bg: 'bg-yellow-50' }
    if (gpa >= 3.2) return { text: 'Giỏi', color: '#52c41a', bg: 'bg-green-50' }
    if (gpa >= 2.5) return { text: 'Khá', color: '#1890ff', bg: 'bg-blue-50' }
    return { text: 'Trung bình', color: '#fa8c16', bg: 'bg-orange-50' }
  }

  const { text: gpaText, color: gpaColor, bg: gpaBg } = getGPAColor(studentInfo.currentGPA)

  const handleSave = () => {
    // In real app, call API to save
    // Update would happen here with editedUserInfo and editedStudentInfo
    setIsEditing(false)
    message.success('Cập nhật thông tin thành công!')
  }

  const handleCancel = () => {
    setEditedUserInfo(userInfo)
    setEditedStudentInfo(studentInfo)
    setIsEditing(false)
  }

  const uploadProps: UploadProps = {
    name: 'avatar',
    showUploadList: false,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/')
      if (!isImage) {
        message.error('Bạn chỉ có thể tải lên file ảnh!')
        return false
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        message.error('Ảnh phải nhỏ hơn 2MB!')
        return false
      }

      // In real app, upload to server
      const reader = new FileReader()
      reader.onload = (e) => {
        setEditedUserInfo({ ...editedUserInfo, avatarUrl: e.target?.result as string })
      }
      reader.readAsDataURL(file)
      return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Actions - Sticky */}
        <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md shadow-sm rounded-2xl px-6 py-4 mb-6 flex justify-between items-center">
          <div>
            <Button
              type="text"
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-gray-900 font-medium"
              size="large"
            >
              ← Quay lại
            </Button>
          </div>
          {!isEditing ? (
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => setIsEditing(true)}
              size="large"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0 shadow-lg"
            >
              Chỉnh sửa hồ sơ
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button
                icon={<CloseOutlined />}
                onClick={handleCancel}
                size="large"
                className="hover:bg-gray-100"
              >
                Hủy
              </Button>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={handleSave}
                size="large"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 border-0 shadow-lg"
              >
                Lưu thay đổi
              </Button>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-4">
            <Card className="shadow-2xl rounded-3xl overflow-hidden border-0">
              {/* Gradient Banner */}
              <div className="h-24 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 relative">
                <div className="absolute inset-0 bg-black/10"></div>
              </div>

              {/* Avatar */}
              <div className="relative -mt-12 mb-3">
                <div className="flex justify-center">
                  <div className="relative group">
                    <Avatar
                      size={100}
                      src={isEditing ? editedUserInfo.avatarUrl : userInfo.avatarUrl}
                      className="border-4 border-white shadow-2xl ring-2 ring-blue-100"
                    />
                    {isEditing && (
                      <Upload {...uploadProps}>
                        <div className="absolute inset-0 bg-black bg-opacity-60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                          <CameraOutlined className="text-white text-2xl" />
                        </div>
                      </Upload>
                    )}
                  </div>
                </div>
              </div>

              {/* Name */}
              <div className="text-center px-4 mb-3">
                {isEditing ? (
                  <div className="space-y-2">
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Họ"
                      value={editedUserInfo.lastName}
                      onChange={(e) => setEditedUserInfo({ ...editedUserInfo, lastName: e.target.value })}
                    />
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Tên"
                      value={editedUserInfo.firstName}
                      onChange={(e) => setEditedUserInfo({ ...editedUserInfo, firstName: e.target.value })}
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-xl font-bold text-gray-900 mb-2">
                      {userInfo.lastName} {userInfo.firstName}
                    </h1>
                    <Tag icon={<CheckCircleFilled />} color="blue" className="text-xs">
                      Đã xác thực
                    </Tag>
                  </>
                )}
              </div>

              <Divider className="my-2" />

              {/* Stats Grid */}
              <div className="px-4 pb-3">
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 p-2.5 rounded-xl">
                    <div className="text-lg font-bold text-blue-600">
                      {studentInfo.completedCourses || 0}
                    </div>
                    <div className="text-xs text-gray-600">Môn học</div>
                  </div>
                  <div className="text-center bg-gradient-to-br from-purple-50 to-purple-100 p-2.5 rounded-xl">
                    <div className="text-lg font-bold text-purple-600">
                      {studentInfo.totalHoursLearned || 0}h
                    </div>
                    <div className="text-xs text-gray-600">Giờ học</div>
                  </div>
                  <div className={`text-center p-2.5 rounded-xl ${gpaBg}`}>
                    <div className="text-lg font-bold" style={{ color: gpaColor }}>
                      {studentInfo.currentGPA.toFixed(2)}
                    </div>
                    <div className="text-xs font-semibold" style={{ color: gpaColor }}>
                      {gpaText}
                    </div>
                  </div>
                </div>

                {/* Info Details - Compact */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg">
                    <BookOutlined className="text-blue-500" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500">Khoa</p>
                      {isEditing ? (
                        <Select
                          value={editedUserInfo.department}
                          onChange={(value) => setEditedUserInfo({ ...editedUserInfo, department: value })}
                          className="w-full"
                          size="small"
                        >
                          {DEPARTMENTS.map(dept => (
                            <Option key={dept.code} value={dept.code}>{dept.name}</Option>
                          ))}
                        </Select>
                      ) : (
                        <p className="font-semibold text-gray-800 text-sm truncate">{getDepartmentName(userInfo.department)}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg">
                    <TrophyOutlined className="text-purple-500" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Năm học</p>
                      {isEditing ? (
                        <Select
                          value={editedStudentInfo.year}
                          onChange={(value) => setEditedStudentInfo({ ...editedStudentInfo, year: value })}
                          className="w-full"
                          size="small"
                        >
                          {[1, 2, 3, 4].map(year => (
                            <Option key={year} value={year}>{getYearText(year)}</Option>
                          ))}
                        </Select>
                      ) : (
                        <p className="font-semibold text-gray-800 text-sm">{getYearText(studentInfo.year || 1)}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg">
                    <GlobalOutlined className="text-green-500" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">MSSV</p>
                      <p className="font-mono font-semibold text-gray-800 text-sm">{studentInfo.studentID}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Content Cards */}
          <div className="lg:col-span-8 space-y-6">
            {/* About Me / Introduction */}
            <Card
              title={
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <UserOutlined className="text-indigo-600 text-xl" />
                  </div>
                  <span className="text-lg font-bold">Giới thiệu bản thân</span>
                </div>
              }
              className="shadow-xl rounded-3xl border-0"
            >
              {isEditing ? (
                <TextArea
                  rows={6}
                  placeholder="Viết vài dòng giới thiệu về bản thân bạn..."
                  className="text-base"
                  value={editedStudentInfo.studentDescription}
                  onChange={(e) => setEditedStudentInfo({ ...editedStudentInfo, studentDescription: e.target.value })}
                />
              ) : (
                <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border-l-4 border-indigo-500">
                  <p className="text-gray-700 leading-relaxed text-base">
                    {studentInfo.studentDescription || `Xin chào! Mình là ${userInfo.firstName}, sinh viên năm ${studentInfo.year || 1} khoa ${getDepartmentName(userInfo.department)}. 
                    Với GPA ${studentInfo.currentGPA.toFixed(2)}, mình đã hoàn thành ${studentInfo.completedCourses || 0} môn học và tích lũy được ${studentInfo.totalHoursLearned || 0} giờ học.`}
                  </p>
                </div>
              )}
            </Card>

            {/* Current Courses */}
            <Card
              title={
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <BookOutlined className="text-blue-600 text-xl" />
                  </div>
                  <span className="text-lg font-bold">Các môn đang học</span>
                </div>
              }
              className="shadow-xl rounded-3xl border-0"
            >
              {isEditing ? (
                <Select
                  mode="multiple"
                  placeholder="Chọn các môn đang học"
                  value={editedStudentInfo.currentCourses}
                  onChange={(value) => setEditedStudentInfo({ ...editedStudentInfo, currentCourses: value })}
                  className="w-full"
                  size="large"
                >
                  {(studentInfo.currentCourses || []).map((course: string) => (
                    <Option key={course} value={course}>{course}</Option>
                  ))}
                </Select>
              ) : (
                <div className="flex flex-wrap gap-4">
                  {(studentInfo.currentCourses || []).map((course: string, idx: number) => (
                    <Tag
                      key={idx}
                      color="blue"
                      className="px-8 py-4 text-xl font-bold rounded-2xl border-0 shadow-lg hover:shadow-2xl transition-all hover:scale-110 cursor-default transform"
                    >
                      📚 {course}
                    </Tag>
                  ))}
                </div>
              )}
            </Card>

            {/* Need Help With */}
            <Card
              title={
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <BookOutlined className="text-orange-600 text-xl" />
                  </div>
                  <span className="text-lg font-bold">Cần hỗ trợ</span>
                </div>
              }
              className="shadow-xl rounded-3xl border-0"
            >
              {isEditing ? (
                <Select
                  mode="multiple"
                  placeholder="Chọn các môn cần hỗ trợ"
                  value={editedStudentInfo.needHelpWith}
                  onChange={(value) => setEditedStudentInfo({ ...editedStudentInfo, needHelpWith: value })}
                  className="w-full"
                  size="large"
                >
                  {(studentInfo.needHelpWith || []).map((subject: string) => (
                    <Option key={subject} value={subject}>{subject}</Option>
                  ))}
                </Select>
              ) : (
                <div className="flex flex-wrap gap-4">
                  {(studentInfo.needHelpWith || []).map((subject: string, idx: number) => (
                    <Tag
                      key={idx}
                      color="orange"
                      className="px-8 py-4 text-xl font-bold rounded-2xl border-0 shadow-lg hover:shadow-2xl transition-all hover:scale-110 cursor-default transform"
                    >
                      ⚠️ {subject}
                    </Tag>
                  ))}
                </div>
              )}
            </Card>

            {/* Learning Goals */}
            <Card
              title={
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <TrophyOutlined className="text-purple-600 text-xl" />
                  </div>
                  <span className="text-lg font-bold">Mục tiêu học tập</span>
                </div>
              }
              className="shadow-xl rounded-3xl border-0"
            >
              {isEditing ? (
                <TextArea
                  rows={5}
                  value={editedStudentInfo.learningGoals[0] || ''}
                  onChange={(e) => setEditedStudentInfo({
                    ...editedStudentInfo,
                    learningGoals: [e.target.value, ...(editedStudentInfo.learningGoals?.slice(1) || [])]
                  })}
                  placeholder="Nhập mục tiêu học tập của bạn..."
                  className="text-base"
                />
              ) : (
                <div className="space-y-4">
                  {studentInfo.learningGoals.map((goal: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-blue-500">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                        {idx + 1}
                      </div>
                      <p className="text-gray-700 leading-relaxed flex-1">{goal}</p>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Contact Info */}
            <Card
              title={
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <MailOutlined className="text-green-600 text-xl" />
                  </div>
                  <span className="text-lg font-bold">Thông tin liên hệ</span>
                </div>
              }
              className="shadow-xl rounded-3xl border-0"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-5 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MailOutlined className="text-white text-xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 mb-1">Email</p>
                    <p className="font-semibold text-gray-800 truncate">{userInfo.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-5 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <PhoneOutlined className="text-white text-xl" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-1">Điện thoại</p>
                    {isEditing ? (
                      <Input
                        placeholder="Số điện thoại"
                        size="large"
                        value={editedUserInfo.phoneNumber}
                        onChange={(e) => setEditedUserInfo({ ...editedUserInfo, phoneNumber: e.target.value })}
                      />
                    ) : (
                      <p className="font-semibold text-gray-800">{userInfo.phoneNumber || 'Chưa cập nhật'}</p>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentProfile
