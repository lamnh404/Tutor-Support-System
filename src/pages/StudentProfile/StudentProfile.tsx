import React, { useEffect, useMemo, useState } from 'react'
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
  RiseOutlined,
  BulbOutlined,
  SafetyCertificateOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { Card, Avatar, Button, Tag, Input, Select, Divider, Upload, message, Tabs } from 'antd'
import type { UploadProps, TabsProps } from 'antd'
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

const StudentProfile: React.FC<StudentProfileProps> = ({ userInfo, studentInfo }) => {
  const [studentData, setStudentData] = useState<StudentProfileData | null>(null)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editedData, setEditedData] = useState<StudentProfileData | null>(null)

  const { achievements } = { ...userInfo, ...studentInfo }
  const [studentAchievements, setStudentAchievements] = useState<Certificate[]>(achievements || [])

  const studentDetails = useMemo(() => {
    const { achievements: _achievements, ...rest } = studentInfo ?? {}
    return { ...userInfo, ...rest }
  }, [userInfo, studentInfo])

  useEffect(() => {
    if (studentDetails) {
      setStudentData(studentDetails)
      setEditedData(studentDetails)
    }
  }, [studentDetails])

  if (!studentData || !editedData) {
    return null
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
      learningGoals: [...editedData.learningGoals, '']
    })
  }

  const handleRemoveGoal = (index: number): void => {
    if (!editedData) return
    const newGoals = editedData.learningGoals.filter((_, i) => i !== index)
    setEditedData({ ...editedData, learningGoals: newGoals })
  }

  const handleGoalChange = (index: number, value: string): void => {
    if (!editedData) return
    const newGoals = [...editedData.learningGoals]
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

  const getGPAColor = (gpa: number): string => {
    if (gpa >= 3.5) return 'from-green-500 to-emerald-600'
    if (gpa >= 3.0) return 'from-blue-500 to-indigo-600'
    if (gpa >= 2.5) return 'from-yellow-500 to-orange-500'
    return 'from-orange-500 to-red-500'
  }

  const tabItems: TabsProps['items'] = [
    {
      key: 'goals',
      label: (
        <span className="flex items-center gap-2 px-2">
          <BulbOutlined />
          <span className="font-semibold">Mục tiêu học tập</span>
        </span>
      ),
      children: (
        <div>
          {isEditing && (
            <div className="mb-4 flex justify-end">
              <Button
                type="dashed"
                icon={<PlusOutlined />}
                onClick={handleAddGoal}
              >
                Thêm mục tiêu
              </Button>
            </div>
          )}
          {isEditing ? (
            <div className="space-y-3">
              {editedData.learningGoals.map((goal, index) => (
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
            </div>
          ) : (
            <div className="space-y-3">
              {studentData.learningGoals.length > 0 ? (
                studentData.learningGoals.map((goal, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-blue-500">
                    <div className="flex items-start gap-3">
                      <CheckCircleFilled className="text-blue-500 text-xl mt-1" />
                      <p className="text-gray-800 font-medium">{goal}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">Học viên chưa thêm mục tiêu học tập nào.</p>
              )}
            </div>
          )}
        </div>
      )
    },
    {
      key: 'achievements',
      label: (
        <span className="flex items-center gap-2 px-2">
          <SafetyCertificateOutlined />
          <span className="font-semibold">Thành tích</span>
        </span>
      ),
      children: (
        <div>
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
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Actions */}
        <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md shadow-sm rounded-2xl px-6 py-4 mb-6 flex justify-between items-center">
          <div>
            <Button
              type="text"
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
              className="bg-gradient-to-r from-purple-600 to-pink-600 border-0 shadow-lg"
            >
              Chỉnh sửa hồ sơ
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button
                icon={<CloseOutlined />}
                onClick={handleCancel}
                size="large"
              >
                Hủy
              </Button>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={handleSave}
                size="large"
                className="bg-gradient-to-r from-green-500 to-emerald-600 border-0 shadow-lg"
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
              <div className="h-24 bg-gradient-to-br from-purple-500 via-pink-600 to-rose-600 relative">
                <div className="absolute inset-0 bg-black/10"></div>
              </div>

              {/* Avatar */}
              <div className="relative -mt-12 mb-3">
                <div className="flex justify-center">
                  <div className="relative group">
                    <Avatar
                      size={100}
                      src={isEditing ? editedData.avatarUrl : studentData.avatarUrl}
                      className="border-4 border-white shadow-2xl ring-2 ring-purple-100"
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
                    <Tag icon={<CheckCircleFilled />} color="purple" className="text-xs">
                      Học viên
                    </Tag>
                  </>
                )}
              </div>

              <Divider className="my-2" />

              {/* Stats Grid */}
              <div className="px-4 pb-3">
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="text-center bg-gradient-to-br from-purple-50 to-pink-100 p-2.5 rounded-xl col-span-2">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <RiseOutlined className={`text-lg bg-gradient-to-r ${getGPAColor(studentData.currentGPA)} bg-clip-text text-transparent`} />
                      {isEditing ? (
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          max="4.0"
                          value={editedData.currentGPA}
                          onChange={(e) => setEditedData({ ...editedData, currentGPA: parseFloat(e.target.value) || 0 })}
                          className="w-20 text-center font-bold"
                        />
                      ) : (
                        <span className={`text-lg font-bold bg-gradient-to-r ${getGPAColor(studentData.currentGPA)} bg-clip-text text-transparent`}>
                          {studentData.currentGPA.toFixed(2)}
                        </span>
                      )}
                      <span className="text-lg font-bold text-gray-400">/4.0</span>
                    </div>
                    <div className="text-xs text-gray-600">GPA hiện tại</div>
                  </div>
                  <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 p-2.5 rounded-xl">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <TrophyOutlined className="text-blue-500 text-lg" />
                      <span className="text-lg font-bold text-blue-600">
                        {studentAchievements.length}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">Chứng chỉ</div>
                  </div>
                  <div className="text-center bg-gradient-to-br from-green-50 to-green-100 p-2.5 rounded-xl">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <BulbOutlined className="text-green-500 text-lg" />
                      <span className="text-lg font-bold text-green-600">
                        {studentData.learningGoals.length}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">Mục tiêu</div>
                  </div>
                </div>

                {/* Info Details */}
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg">
                    <UserOutlined className="text-purple-500" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">MSSV</p>
                      {isEditing ? (
                        <Input
                          value={editedData.studentID}
                          onChange={(e) => setEditedData({ ...editedData, studentID: e.target.value })}
                          size="small"
                        />
                      ) : (
                        <p className="font-semibold text-gray-800 text-sm">{studentData.studentID}</p>
                      )}
                    </div>
                  </div>

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
                    <MailOutlined className="text-green-500" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-semibold text-gray-800 text-sm truncate">{studentData.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg">
                    <PhoneOutlined className="text-orange-500" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Điện thoại</p>
                      {isEditing ? (
                        <Input
                          value={editedData.phoneNumber}
                          onChange={(e) => setEditedData({ ...editedData, phoneNumber: e.target.value })}
                          size="small"
                        />
                      ) : (
                        <p className="font-semibold text-gray-800 text-sm">{studentData.phoneNumber}</p>
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
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <UserOutlined className="text-purple-600 text-xl" />
                  </div>
                  <span className="text-lg font-bold">Giới thiệu</span>
                </div>
              }
              className="shadow-xl rounded-3xl border-0"
            >
              {isEditing ? (
                <TextArea
                  rows={6}
                  placeholder="Viết giới thiệu về bản thân..."
                  value={editedData.studentDescription}
                  onChange={(e) => setEditedData({ ...editedData, studentDescription: e.target.value })}
                  className="text-base"
                />
              ) : (
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-l-4 border-purple-500">
                  <p className="text-gray-700 leading-relaxed text-base">
                    {studentData.studentDescription}
                  </p>
                </div>
              )}
            </Card>

            {/* Goals and Achievements Tabs */}
            <Card className="shadow-xl rounded-3xl border-0">
              <Tabs
                defaultActiveKey="goals"
                size="large"
                items={tabItems}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentProfile
