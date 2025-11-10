import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  SafetyCertificateOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { Card, Avatar, Button, Tag, Input, Select, Divider, Upload, message, Spin } from 'antd'
import type { UploadProps } from 'antd'
import { type Certificate, type StudentProfileData } from './StudentProfileConfig'
import { type DepartmentCode, DEPARTMENTS } from '~/utils/definitions.tsx'
import Achievement from '~/pages/TutorProfile/Achievement.tsx'
import type { StudentProfileType, UserInfo } from '~/pages/Profile/ProfileConfig.ts'

const { TextArea } = Input
const { Option } = Select

interface StudentProfileProps {
  userInfo: UserInfo
  studentInfo: StudentProfileType
}

// Mock data for current courses
const mockCurrentCourses = [
  'Mạch điện tử',
  'Xử lý tín hiệu số', 
  'Vi xử lý',
  'Toán cao cấp 3',
  'Vật lý đại cương'
]

// Mock data for subjects that need help
const mockNeedHelpWith = [
  'Signal Processing',
  'Embedded Systems',
  'Circuit Analysis',
  'Mathematics'
]

// Mock avatar URL - replace with actual avatar if available
const mockAvatarUrl = 'https://api.dicebear.com/7.x/avataaars/svg?seed=sasuke'

const StudentProfile: React.FC<StudentProfileProps> = ({ userInfo, studentInfo }) => {
  const navigate = useNavigate()
  const [studentData, setStudentData] = useState<StudentProfileData | null>(null)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editedData, setEditedData] = useState<StudentProfileData | null>(null)

  const { achievements } = { ...userInfo, ...studentInfo }
  const [studentAchievements, setStudentAchievements] = useState<Certificate[]>(achievements || [])

  const studentDetails = useMemo(() => {
    const { achievements: _achievements, ...rest } = studentInfo ?? {}
    const merged = { 
      ...userInfo, 
      ...rest,
      // Ensure learningGoals is always an array
      learningGoals: rest.learningGoals || [],
      studentDescription: rest.studentDescription || ''
    }
    return merged
  }, [userInfo, studentInfo])

  useEffect(() => {
    if (studentDetails) {
      setStudentData(studentDetails)
      setEditedData(studentDetails)
    }
  }, [studentDetails])

  if (!studentData || !editedData) {
    return (
      <Spin
        size="large"
        tip="Đang tải thông tin học viên..."
        fullscreen
      />
    )
  }

  const getDepartmentName = (code: DepartmentCode): string => {
    const dept = DEPARTMENTS.find(d => d.code === code)
    return dept?.name || code
  }

  const handleSave = (): void => {
    if (editedData) {
      setStudentData(editedData)
      setIsEditing(false)
      message.success('Cập nhật thông tin thành công!')
    }
  }

  const handleCancel = (): void => {
    setEditedData(studentData)
    setIsEditing(false)
  }

  const uploadProps: UploadProps = {
    name: 'avatar',
    showUploadList: false,
    beforeUpload: (file: File): boolean => {
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>): void => {
        const result = e.target?.result
        if (typeof result === 'string' && editedData) {
          setEditedData({ ...editedData, avatarUrl: result })
        }
      }
      reader.readAsDataURL(file)
      return false
    }
  }

  const handleAddGoal = (): void => {
    if (!editedData) return
    setEditedData({
      ...editedData,
      learningGoals: [...(editedData.learningGoals || []), '']
    })
  }

  const handleRemoveGoal = (index: number): void => {
    if (!editedData) return
    const newGoals = (editedData.learningGoals || []).filter((_, i) => i !== index)
    setEditedData({ ...editedData, learningGoals: newGoals })
  }

  const handleGoalChange = (index: number, value: string): void => {
    if (!editedData) return
    const newGoals = [...(editedData.learningGoals || [])]
    newGoals[index] = value
    setEditedData({ ...editedData, learningGoals: newGoals })
  }

  const handleAddCertificate = (): void => {
    const newCert: Certificate = {
      id: `cert${studentAchievements.length + 1}`,
      title: '',
      description: '',
      year: new Date().getFullYear().toString(),
      type: 'certificate'
    }
    setStudentAchievements([...studentAchievements, newCert])
  }

  const handleRemoveCertificate = (certId: string): void => {
    setStudentAchievements(studentAchievements.filter(cert => cert.id !== certId))
  }

  const handleCertificateChange = (certId: string, field: keyof Certificate, value: string): void => {
    setStudentAchievements(studentAchievements.map(cert =>
      cert.id === certId ? { ...cert, [field]: value } : cert
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Actions */}
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
                      src={isEditing ? (editedData.avatarUrl || mockAvatarUrl) : (studentData.avatarUrl || mockAvatarUrl)}
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
                      value={editedData.lastName}
                      onChange={(e) => setEditedData({ ...editedData, lastName: e.target.value })}
                    />
                    <Input
                      prefix={<UserOutlined />}
                      placeholder="Tên"
                      value={editedData.firstName}
                      onChange={(e) => setEditedData({ ...editedData, firstName: e.target.value })}
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-xl font-bold text-gray-900 mb-2">
                      {studentData.lastName} {studentData.firstName}
                    </h1>
                    <Tag icon={<CheckCircleFilled />} color="blue" className="text-xs">
                      Học viên
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
                      {mockCurrentCourses.length}
                    </div>
                    <div className="text-xs text-gray-600">Môn học</div>
                  </div>
                  <div className="text-center bg-gradient-to-br from-purple-50 to-purple-100 p-2.5 rounded-xl">
                    <div className="text-lg font-bold text-purple-600">
                      180h
                    </div>
                    <div className="text-xs text-gray-600">Giờ học</div>
                  </div>
                  <div className={`text-center p-2.5 rounded-xl ${studentData.currentGPA >= 3.6 ? 'bg-gradient-to-br from-yellow-50 to-yellow-100' : studentData.currentGPA >= 3.2 ? 'bg-gradient-to-br from-green-50 to-green-100' : studentData.currentGPA >= 2.5 ? 'bg-gradient-to-br from-blue-50 to-blue-100' : 'bg-gradient-to-br from-orange-50 to-orange-100'}`}>
                    {isEditing ? (
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        max="4.0"
                        value={editedData.currentGPA}
                        onChange={(e) => setEditedData({ ...editedData, currentGPA: parseFloat(e.target.value) || 0 })}
                        className="w-16 text-center font-bold text-sm"
                      />
                    ) : (
                      <div className={`text-lg font-bold ${studentData.currentGPA >= 3.6 ? 'text-yellow-600' : studentData.currentGPA >= 3.2 ? 'text-green-600' : studentData.currentGPA >= 2.5 ? 'text-blue-600' : 'text-orange-600'}`}>
                        {studentData.currentGPA.toFixed(2)}
                      </div>
                    )}
                    <div className={`text-xs font-semibold ${studentData.currentGPA >= 3.6 ? 'text-yellow-600' : studentData.currentGPA >= 3.2 ? 'text-green-600' : studentData.currentGPA >= 2.5 ? 'text-blue-600' : 'text-orange-600'}`}>
                      {studentData.currentGPA >= 3.6 ? 'Xuất sắc' : studentData.currentGPA >= 3.2 ? 'Giỏi' : studentData.currentGPA >= 2.5 ? 'Khá' : 'Trung bình'}
                    </div>
                  </div>
                </div>

                {/* Info Details */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg">
                    <BookOutlined className="text-blue-500" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500">Khoa</p>
                      {isEditing ? (
                        <Select
                          value={editedData.department}
                          onChange={(value: DepartmentCode) => setEditedData({ ...editedData, department: value })}
                          className="w-full"
                          size="small"
                        >
                          {DEPARTMENTS.map(dept => (
                            <Option key={dept.code} value={dept.code}>{dept.name}</Option>
                          ))}
                        </Select>
                      ) : (
                        <p className="font-semibold text-gray-800 text-sm truncate">
                          {getDepartmentName(studentData.department)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg">
                    <TrophyOutlined className="text-purple-500" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Năm học</p>
                      <p className="font-semibold text-gray-800 text-sm">Năm 2</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg">
                    <UserOutlined className="text-green-500" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">MSSV</p>
                      {isEditing ? (
                        <Input
                          value={editedData.studentID}
                          onChange={(e) => setEditedData({ ...editedData, studentID: e.target.value })}
                          size="small"
                        />
                      ) : (
                        <p className="font-mono font-semibold text-gray-800 text-sm">{studentData.studentID}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Content Cards */}
          <div className="lg:col-span-8 space-y-6">
            {/* About */}
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
                  value={editedData.studentDescription}
                  onChange={(e) => setEditedData({ ...editedData, studentDescription: e.target.value })}
                  className="text-base"
                />
              ) : (
                <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border-l-4 border-indigo-500">
                  <p className="text-gray-700 leading-relaxed text-base">
                    {studentData.studentDescription}
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
              <div className="flex flex-wrap gap-4">
                {mockCurrentCourses.map((course: string, idx: number) => (
                  <Tag
                    key={idx}
                    color="blue"
                    className="px-8 py-4 text-xl font-bold rounded-2xl border-0 shadow-lg hover:shadow-2xl transition-all hover:scale-110 cursor-default transform"
                  >
                    📚 {course}
                  </Tag>
                ))}
              </div>
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
              <div className="flex flex-wrap gap-4">
                {mockNeedHelpWith.map((subject: string, idx: number) => (
                  <Tag
                    key={idx}
                    color="orange"
                    className="px-8 py-4 text-xl font-bold rounded-2xl border-0 shadow-lg hover:shadow-2xl transition-all hover:scale-110 cursor-default transform"
                  >
                    ⚠️ {subject}
                  </Tag>
                ))}
              </div>
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
                <div className="space-y-3">
                  {(editedData.learningGoals || []).map((goal, index) => (
                    <div key={index} className="flex gap-3 items-center">
                      <Input
                        placeholder="Nhập mục tiêu học tập"
                        value={goal}
                        onChange={(e) => handleGoalChange(index, e.target.value)}
                        size="large"
                        className="flex-1"
                      />
                      <Button
                        type="text"
                        danger
                        icon={<CloseOutlined />}
                        onClick={() => handleRemoveGoal(index)}
                      />
                    </div>
                  ))}
                  <Button
                    type="dashed"
                    icon={<PlusOutlined />}
                    onClick={handleAddGoal}
                    className="w-full"
                  >
                    Thêm mục tiêu
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {(studentData.learningGoals || []).length > 0 ? (
                    (studentData.learningGoals || []).map((goal, idx: number) => (
                      <div key={idx} className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-blue-500">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                          {idx + 1}
                        </div>
                        <p className="text-gray-700 leading-relaxed flex-1">{goal}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">Học viên chưa thêm mục tiêu học tập nào.</p>
                  )}
                </div>
              )}
            </Card>

            {/* Goals and Achievements Tabs */}
            <Card
              title={
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <SafetyCertificateOutlined className="text-indigo-600 text-xl" />
                  </div>
                  <span className="text-lg font-bold">Thành tích</span>
                </div>
              }
              className="shadow-xl rounded-3xl border-0"
            >
              {isEditing && (
                <div className="mb-4 flex justify-end">
                  <Button
                    type="dashed"
                    icon={<PlusOutlined />}
                    onClick={handleAddCertificate}
                  >
                    Thêm chứng chỉ
                  </Button>
                </div>
              )}
              {isEditing ? (
                <div className="space-y-3">
                  {studentAchievements.map((cert: Certificate) => (
                    <div key={cert.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="grid grid-cols-12 gap-3 items-center">
                        <div className="col-span-11 space-y-2">
                          <Input
                            placeholder="Tên chứng chỉ"
                            value={cert.title}
                            onChange={(e) => handleCertificateChange(cert.id, 'title', e.target.value)}
                            size="large"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              placeholder="Tổ chức cấp"
                              value={cert.description}
                              onChange={(e) => handleCertificateChange(cert.id, 'description', e.target.value)}
                            />
                            <Input
                              placeholder="Năm"
                              value={cert.year}
                              onChange={(e) => handleCertificateChange(cert.id, 'year', e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-span-1 flex justify-end">
                          <Button
                            type="text"
                            danger
                            icon={<CloseOutlined />}
                            onClick={() => handleRemoveCertificate(cert.id)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {studentAchievements.length > 0 ? (
                    studentAchievements.map((cert: Certificate) => (
                      <Achievement key={cert.id} cert={cert} />
                    ))
                  ) : (
                    <p className="text-gray-600">Học viên chưa thêm chứng chỉ nào.</p>
                  )}
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
                    <p className="font-semibold text-gray-800 truncate">{studentData.email}</p>
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
                        value={editedData.phoneNumber}
                        onChange={(e) => setEditedData({ ...editedData, phoneNumber: e.target.value })}
                      />
                    ) : (
                      <p className="font-semibold text-gray-800">{studentData.phoneNumber || 'Chưa cập nhật'}</p>
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
