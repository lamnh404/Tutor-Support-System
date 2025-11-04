import React, { useEffect, useState } from 'react'
import { certificates } from './ProfileData'
import { basicTutorInfoAPI } from '~/apis/profileAPI.tsx'
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
  StarFilled,
  TeamOutlined,
  SafetyCertificateOutlined,
  UserAddOutlined,
  HistoryOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { Card, Avatar, Button, Tag, Input, Select, Divider, Upload, Modal, message, Tabs, Spin } from 'antd'
import { mockTutorData, distribution } from './ProfileData'
import { type TutorProfileData } from './TutorProfileConfig'
import { type DepartmentCode, DEPARTMENTS, type ExpertiseCode, EXPERTISES } from '~/utils/definitions.tsx'
import Achievement from '~/pages/TutorProfile/Achievement.tsx'
import RatingDistribution from '~/pages/TutorProfile/RatingDistribution.tsx'
import ReviewCard from '~/components/Review/Review'
import { mockReviews } from '~/components/Review/mockReviews'

const { TextArea } = Input
const { Option } = Select


const TutorProfile: React.FC<{id:string}> = ({ id }) => {
  const [tutorData, setTutorData] = useState<TutorProfileData | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState(mockTutorData)
  const [isEnrollModalVisible, setIsEnrollModalVisible] = useState(false)
  const [enrollMessage, setEnrollMessage] = useState('')

  useEffect(() => {
    basicTutorInfoAPI(id).then((data) => {
      setTutorData(data)
      setEditedData(data)
    }).catch(() => {
      message.error('Không thể tải thông tin giảng viên.')
    })

  }, [id])

  if (!tutorData) {
    return (
      <Spin
        size="large"
        tip="Đang tải thông tin giảng viên..."
        fullscreen
      />
    )}

  const isAcceptingStudents = tutorData.currMenteeCount < tutorData.maximumCapacity


  const getDepartmentName = (code: DepartmentCode) => {
    const dept = DEPARTMENTS.find(d => d.code === code)
    return dept?.name || code
  }

  const getExpertiseName = (code: ExpertiseCode) => {
    const exp = EXPERTISES.find(e => e.code === code)
    return exp?.name || code
  }

  const handleSave = () => {
    setTutorData(editedData)
    setIsEditing(false)
    message.success('Cập nhật thông tin thành công!')
  }

  const handleCancel = () => {
    setEditedData(tutorData)
    setIsEditing(false)
  }

  const uploadProps = {
    name: 'avatar',
    showUploadList: false,
    beforeUpload: (file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setEditedData({ ...editedData, avatarUrl: e.target?.result })
      }
      reader.readAsDataURL(file)
      return false
    }
  }

  const handleEnrollRequest = () => {
    if (!isAcceptingStudents) {
      message.warning('Giảng viên hiện đã đủ số lượng học viên')
      return
    }
    setIsEnrollModalVisible(true)
  }

  const handleEnrollSubmit = () => {
    message.success('Yêu cầu nhập học đã được gửi thành công!')
    setIsEnrollModalVisible(false)
    setEnrollMessage('')
  }

  const handleAddCertificate = () => {
    const newCert = {
      id: `cert${editedData.certificates.length + 1}`,
      name: '',
      issuer: '',
      year: new Date().getFullYear().toString(),
      icon: '🎓'
    }
    setEditedData({
      ...editedData,
      certificates: [...editedData.certificates, newCert]
    })
  }

  const handleRemoveCertificate = (certId) => {
    setEditedData({
      ...editedData,
      certificates: editedData.certificates.filter(cert => cert.id !== certId)
    })
  }

  const handleCertificateChange = (certId, field, value) => {
    setEditedData({
      ...editedData,
      certificates: editedData.certificates.map(cert =>
        cert.id === certId ? { ...cert, [field]: value } : cert
      )
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
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
              className="bg-gradient-to-r from-blue-600 to-indigo-600 border-0 shadow-lg"
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
              <div className="h-24 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 relative">
                <div className="absolute inset-0 bg-black/10"></div>
              </div>

              {/* Avatar */}
              <div className="relative -mt-12 mb-3">
                <div className="flex justify-center">
                  <div className="relative group">
                    <Avatar
                      size={100}
                      src={isEditing ? editedData.avatarUrl : tutorData.avatarUrl}
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
                      {tutorData.lastName} {tutorData.firstName}
                    </h1>
                    <Tag icon={<CheckCircleFilled />} color="blue" className="text-xs">
                      Giảng viên
                    </Tag>
                  </>
                )}
              </div>

              <Divider className="my-2" />

              {/* Stats Grid - Now 2x2 */}
              <div className="px-4 pb-3">
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="text-center bg-gradient-to-br from-yellow-50 to-yellow-100 p-2.5 rounded-xl">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <StarFilled className="text-yellow-500 text-lg" />
                      <span className="text-lg font-bold text-yellow-600">
                        {tutorData.ratingAvg.toFixed(1)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">{tutorData.ratingCount} đánh giá</div>
                  </div>
                  <div className="text-center bg-gradient-to-br from-purple-50 to-purple-100 p-2.5 rounded-xl">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <TeamOutlined className="text-purple-500 text-lg" />
                      <span className="text-lg font-bold text-purple-600">
                        {tutorData.currMenteeCount}/{tutorData.maximumCapacity}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">Học viên</div>
                  </div>
                  <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 p-2.5 rounded-xl">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <HistoryOutlined className="text-blue-500 text-lg" />
                      <span className="text-lg font-bold text-blue-600">
                        {tutorData.totalStudentTaught}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">Đã dạy</div>
                  </div>
                  <div className="text-center bg-gradient-to-br from-green-50 to-green-100 p-2.5 rounded-xl">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <TrophyOutlined className="text-green-500 text-lg" />
                      <span className="text-lg font-bold text-green-600">
                        {tutorData.yearsOfExperience}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">Năm KN</div>
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
                          onChange={(value) => setEditedData({ ...editedData, department: value })}
                          className="w-full"
                          size="small"
                        >
                          {DEPARTMENTS.map(dept => (
                            <Option key={dept.code} value={dept.code}>{dept.name}</Option>
                          ))}
                        </Select>
                      ) : (
                        <p className="font-semibold text-gray-800 text-sm truncate">
                          {getDepartmentName(tutorData.department)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg">
                    <MailOutlined className="text-green-500" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-semibold text-gray-800 text-sm truncate">{tutorData.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-lg">
                    <PhoneOutlined className="text-orange-500" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Điện thoại</p>
                      {isEditing ? (
                        <Input
                          value={editedData.phone}
                          onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                          size="small"
                        />
                      ) : (
                        <p className="font-semibold text-gray-800 text-sm">{tutorData.phoneNumber}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Content Cards */}
          <div className="lg:col-span-8 space-y-6">
            {/* Enroll Button - Only show if not editing */}
            {!isEditing && (
              <Card className="shadow-xl rounded-3xl border-0 overflow-hidden">
                <div className={`p-6 ${isAcceptingStudents ? 'bg-gradient-to-r from-green-50 to-emerald-50' : 'bg-gradient-to-r from-gray-50 to-gray-100'}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {isAcceptingStudents ? '📚 Còn chỗ trống!' : '🔒 Đã đủ học viên'}
                      </h3>
                      <p className="text-gray-600">
                        {isAcceptingStudents
                          ? `Giảng viên đang nhận thêm ${tutorData.maximumCapacity - tutorData.currMenteeCount} học viên`
                          : 'Giảng viên hiện đã đủ số lượng học viên'}
                      </p>
                    </div>
                    <Button
                      type="primary"
                      size="large"
                      icon={<UserAddOutlined />}
                      onClick={handleEnrollRequest}
                      disabled={!isAcceptingStudents}
                      className={isAcceptingStudents
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 border-0 shadow-lg h-12 px-8 text-lg font-bold'
                        : 'h-12 px-8'}
                    >
                      Gửi yêu cầu nhập học
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* About */}
            <Card
              title={
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <UserOutlined className="text-indigo-600 text-xl" />
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
                  value={editedData.description}
                  onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
                  className="text-base"
                />
              ) : (
                <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border-l-4 border-indigo-500">
                  <p className="text-gray-700 leading-relaxed text-base">
                    {tutorData.description}
                  </p>
                </div>
              )}
            </Card>

            {/* Expertise */}
            <Card
              title={
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <TrophyOutlined className="text-blue-600 text-xl" />
                  </div>
                  <span className="text-lg font-bold">Chuyên môn</span>
                </div>
              }
              className="shadow-xl rounded-3xl border-0"
            >
              {isEditing ? (
                <Select
                  mode="multiple"
                  placeholder="Chọn chuyên môn"
                  value={editedData.expertise}
                  onChange={(value) => setEditedData({ ...editedData, expertise: value })}
                  className="w-full"
                  size="large"
                >
                  {EXPERTISES.map(exp => (
                    <Option key={exp.code} value={exp.code}>{exp.name}</Option>
                  ))}
                </Select>
              ) : (
                <div className="flex flex-wrap gap-4">
                  {tutorData.expertise.map((exp, idx) => (
                    <Tag
                      key={idx}
                      color="blue"
                      className="px-8 py-4 text-xl font-bold rounded-2xl border-0 shadow-lg hover:shadow-2xl transition-all hover:scale-110 cursor-default transform"
                    >
                      🎯 {getExpertiseName(exp)}
                    </Tag>
                  ))}
                </div>
              )}
            </Card>

            {/* Certificates and Reviews Tabs */}
            <Card className="shadow-xl rounded-3xl border-0">
              <Tabs
                defaultActiveKey="achievements"
                size="large"
                items={[
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
                            {editedData.certificates.map((cert) => (
                              <div key={cert.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                <div className="grid grid-cols-12 gap-3 items-center">
                                  <div className="col-span-11 space-y-2">
                                    <Input
                                      placeholder="Tên chứng chỉ"
                                      value={cert.name}
                                      onChange={(e) => handleCertificateChange(cert.id, 'name', e.target.value)}
                                      size="large"
                                    />
                                    <div className="grid grid-cols-2 gap-2">
                                      <Input
                                        placeholder="Tổ chức cấp"
                                        value={cert.issuer}
                                        onChange={(e) => handleCertificateChange(cert.id, 'issuer', e.target.value)}
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
                            {certificates.map((cert) => (
                              <Achievement key={cert.id} cert={cert} />
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  },
                  {
                    key: 'reviews',
                    label: (
                      <span className="flex items-center gap-2 px-2">
                        <StarFilled />
                        <span className="font-semibold">Đánh giá</span>
                      </span>
                    ),
                    children: (
                      <div className="space-y-6">
                        {/* Rating Distribution */}
                        <RatingDistribution tutorData={tutorData} distribution={distribution} />

                        {/* Reviews List */}
                        <ReviewCard reviews={mockReviews} />
                      </div>
                    )
                  }
                ]}
              />
            </Card>
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
                Bạn đang gửi yêu cầu nhập học với <span className="font-bold text-blue-600">{tutorData.lastName} {tutorData.firstName}</span>
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
                  <span className="font-semibold">💡 Lưu ý:</span> Giảng viên sẽ xem xét yêu cầu của bạn và phản hồi trong vòng 24-48 giờ.
                </p>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default TutorProfile