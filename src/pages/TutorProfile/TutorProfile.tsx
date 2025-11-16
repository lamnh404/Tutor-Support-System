import React, { useContext, useEffect, useMemo, useState } from 'react'
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
import type { UploadProps, TabsProps } from 'antd'
import { type Certificate, type TutorProfileData } from './TutorProfileConfig'
import { type DepartmentCode, DEPARTMENTS, type ExpertiseCode, EXPERTISES } from '~/utils/definitions.tsx'
import Achievement from '~/pages/TutorProfile/Achievement.tsx'
import RatingDistribution from '~/pages/TutorProfile/RatingDistribution.tsx'
import ReviewCard from '~/components/Review/Review'
import type { TutorProfileType, UserInfo } from '~/pages/Profile/ProfileConfig.ts'
import { iDContext } from '~/context/IdContext/idContext.tsx'
import { updateTutorProfileAPI } from '~/apis/updateProfileAPI.tsx'
import { toast } from 'react-toastify'
import axios from 'axios'
import { connectionAPI } from '~/apis/connectionAPI'
import { userContext } from '~/context/User/userContext.tsx'


const { TextArea } = Input
const { Option } = Select

interface TutorProfileProps {
  id: string
  userInfo: UserInfo
  tutorInfo: TutorProfileType
}

interface EditData {
  avatar: File | null
  phoneNumber: string
  description: string
  expertise: ExpertiseCode[]
  achievements: Certificate[],
  avatarUrl?: string
}

const TutorProfile: React.FC<TutorProfileProps> = ({ id, userInfo, tutorInfo }) => {
  const [tutorData, setTutorData] = useState<TutorProfileData | null>(null)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [editedData, setEditedData] = useState<EditData | null>(null)
  const [isEnrollModalVisible, setIsEnrollModalVisible] = useState<boolean>(false)
  const [enrollMessage, setEnrollMessage] = useState<string>('')
  const [sort, setSort] = useState<string>('latest')
  const { ownId } = useContext(iDContext)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const statusConnection = tutorInfo?.statusConnection || ''
  const [isRequested, setIsRequested] = useState(statusConnection === 'PENDING' || statusConnection === 'ACCEPTED')
  const { user } = useContext(userContext)
  let isAllowSendRequest = true
  if (user && (!user.roles.includes('STUDENT'))) {
    isAllowSendRequest = false
  }

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const allowEditing = ownId === id
  const allowSendRequest = ownId !== id

  const { achievements } = { ...userInfo, ...tutorInfo }
  const [prevAchievements, setPrevAchievements] = useState<Certificate[]>(achievements || [])

  const [tutorAchievements, setTutorAchievements] = useState<Certificate[]>(achievements || [])

  const tutorDetails = useMemo(() => {
    const { achievements: _achievements, ...rest } = tutorInfo ?? {}
    return { ...userInfo, ...rest }
  }, [userInfo, tutorInfo])

  useEffect(() => {
    if (tutorDetails) {
      setTutorData(tutorDetails)
      setEditedData({
        avatar: null,
        phoneNumber: tutorDetails.phoneNumber || '',
        description: tutorDetails.tutorDescription || '',
        expertise: tutorDetails.expertise || [],
        achievements: achievements || [],
        avatarUrl: tutorDetails.avatarUrl || ''
      })
    }
  }, [tutorDetails, achievements])


  if ( !tutorData || !editedData ) {
    return (
      <Spin
        size="large"
        tip="Đang tải thông tin giảng viên..."
        fullscreen
      />
    )
  }
  if ( isLoading ) {
    return (
      <Spin
        size="large"
        tip="Đang cập nhật thông tin giảng viên..."
        fullscreen
      />
    )
  }

  const isAcceptingStudents: boolean = tutorData.currMenteeCount < tutorData.maximumCapacity

  const getDepartmentName = (code: DepartmentCode): string => {
    const dept = DEPARTMENTS.find(d => d.code === code)
    return dept?.name || code
  }

  const getExpertiseName = (code: ExpertiseCode): string => {
    const exp = EXPERTISES.find(e => e.code === code)
    return exp?.name || code
  }

  const handleSave = async () => {
    if (!editedData) return

    setTutorData({
      ...tutorData,
      phoneNumber: editedData.phoneNumber,
      tutorDescription: editedData.description,
      expertise: editedData.expertise,
      avatarUrl: editedData.avatarUrl
    })
    setEditedData({
      ...editedData,
      achievements: tutorAchievements
    }
    )
    setPrevAchievements(tutorAchievements)


    const formData = new FormData()
    if (editedData.avatar) {
      formData.append('avatar', editedData.avatar)
    }
    formData.append('phoneNumber', editedData.phoneNumber)
    formData.append('description', editedData.description)
    formData.append('expertise', JSON.stringify(editedData.expertise))
    formData.append('achievements', JSON.stringify(editedData.achievements))

    try {
      setIsLoading(true)
      const data = await updateTutorProfileAPI(formData)
      setIsLoading(false)
      const userStr = localStorage.getItem('user')
      if (userStr) {
        const user = JSON.parse(userStr)
        user.avatarUrl = editedData.avatarUrl || tutorDetails.avatarUrl || ''
        localStorage.setItem('user', JSON.stringify(user))
      }

      toast.success(data.message)

    } catch (error) {
      setIsLoading(false)
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || 'Cập nhật hồ sơ thất bại. Vui lòng thử lại.')
      } else {
        toast.error('Cập nhật hồ sơ thất bại. Vui lòng thử lại.')
      }
    }

    setIsEditing(false)
  }


  const handleCancel = (): void => {
    setEditedData({
      avatar: null,
      phoneNumber: tutorData.phoneNumber || '',
      description: tutorData.tutorDescription || '',
      expertise: tutorData.expertise || [],
      achievements: achievements || [],
      avatarUrl: tutorData.avatarUrl || ''
    })
    setTutorAchievements(prevAchievements)
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
          setEditedData({ ...editedData, avatarUrl: result, avatar: file })
        }
      }
      reader.readAsDataURL(file)
      return false
    }
  }

  const handleEnrollRequest = (): void => {
    if (!isAcceptingStudents) {
      message.warning('Giảng viên hiện đã đủ số lượng học viên')
      return
    }
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

  const handleAddCertificate = (): void => {
    if (!editedData) return

    const newCert: Certificate = {
      id: `cert${tutorAchievements.length + 1}`,
      title: '',
      description: '',
      year: new Date().getFullYear().toString(),
      type: 'CERTIFICATION'
    }
    setTutorAchievements([...tutorAchievements, newCert])
  }

  const handleRemoveCertificate = (certId: string): void => {
    setTutorAchievements(tutorAchievements.filter(cert => cert.id !== certId))
  }

  const handleCertificateChange = (certId: string, field: keyof Certificate, value: string): void => {
    setTutorAchievements(tutorAchievements.map(cert =>
      cert.id === certId ? { ...cert, [field]: value } : cert
    ))
    setEditedData({
      ...editedData!,
      achievements: tutorAchievements.map(cert =>
        cert.id === certId ? { ...cert, [field]: value } : cert
      )
    })
  }
  const handleChangeSort = (value: string): void => {
    setSort(value)
  }

  const tabItems: TabsProps['items'] = [
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
              {tutorAchievements.map((cert: Certificate) => (
                <div key={cert.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="grid grid-cols-12 gap-3 items-center">
                    <div className="col-span-11 space-y-2 ">
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Tên chứng chỉ"
                          required
                          value={cert.title}
                          onChange={(e) => handleCertificateChange(cert.id, 'title', e.target.value)}
                          size="large"
                        />
                        <Select
                          value={cert.type}
                          onChange={(value) => handleCertificateChange(cert.id, 'type', value)}
                        >
                          <Select.Option value="AWARD">Giải thưởng</Select.Option>
                          <Select.Option value="CERTIFICATION">Chứng Chỉ</Select.Option>
                        </Select>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Tổ chức cấp"
                          required
                          value={cert.description}
                          onChange={(e) => handleCertificateChange(cert.id, 'description', e.target.value)}
                        />
                        <Input
                          placeholder="Năm"
                          required
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
              {tutorAchievements.length > 0 ?
                tutorAchievements.map((cert: Certificate) => (
                  <Achievement key={cert.id} cert={cert} />
                ))
                :
                <p className="text-gray-600">Giảng viên chưa thêm chứng chỉ nào.</p>
              }
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
          <RatingDistribution id = {id} ratingAvg={tutorData.ratingAvg} ratingCount={tutorData.ratingCount} />

          <div className="flex justify-end">
            <Select
              defaultValue= {sort}
              style={{
                width: 180,
                backgroundColor: '#ece7e7ff',
                color: '#1f79ceff',
                borderColor: '#1890ff'
              }}
              onChange={handleChangeSort}
              options={[
                { value: 'rating-descending', label: 'Đánh giá (Cao - Thấp)' },
                { value: 'rating-ascending', label: 'Đánh giá (Thấp - Cao)' },
                { value: 'latest', label: 'Mới nhất' }
              ]}
            />
          </div>


          {/* Reviews List */}
          <ReviewCard id={id} sort={sort} />
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Actions */}
        <div className="sticky top-20 z-10 bg-white/80 backdrop-blur-md shadow-sm rounded-2xl px-6 py-4 mb-6 flex justify-between items-center">
          <div>
            <Button
              type="text"
              className="text-gray-600 hover:text-gray-900 font-medium"
              size="large"
            >
              ← Quay lại
            </Button>
          </div>
          {allowEditing &&
          (!isEditing ? (
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
          ))}
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
                <div className="flex flex-col items-center">
                  <Avatar
                    size={100}
                    src={isEditing ? editedData.avatarUrl : tutorData.avatarUrl}
                    className="border-4 border-white shadow-2xl ring-2 ring-blue-100"
                  >
                    {
                      <span className="text-4xl">
                        {tutorData.firstName.charAt(0).toUpperCase()}
                      </span>
                    }
                  </Avatar>
                  {isEditing && (
                    <Upload {...uploadProps} showUploadList={false}>
                      <div className="mt-2 flex items-center gap-2 text-blue-600 cursor-pointer hover:underline select-none">
                        <CameraOutlined className="text-lg" />
                        <span>Đổi avatar</span>
                      </div>
                    </Upload>
                  )}
                </div>
              </div>


              {/* Name */}
              <div className="text-center px-4 mb-3">
                <>
                  <h1 className="text-xl font-bold text-gray-900 mb-2">
                    {tutorData.lastName} {tutorData.firstName}
                  </h1>
                  <Tag icon={<CheckCircleFilled />} color="blue" className="text-xs">
                      Giảng viên
                  </Tag>
                </>
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
                      <p className="font-semibold text-gray-800 text-sm truncate">
                        {getDepartmentName(tutorData.department)}
                      </p>

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
                          value={editedData.phoneNumber}
                          onChange={(e) => setEditedData({ ...editedData, phoneNumber: e.target.value })}
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
            {allowSendRequest && (
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
                    { isAllowSendRequest &&
                    <Button
                      type="primary"
                      size="large"
                      icon={<UserAddOutlined />}
                      onClick={handleEnrollRequest}
                      disabled={!isAcceptingStudents || isRequested}
                      className={isAcceptingStudents
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 border-0 shadow-lg h-12 px-8 text-lg font-bold'
                        : 'h-12 px-8'}
                    >
                      {isRequested ? 'Yêu cầu đã gửi'
                        : isAcceptingStudents ? 'Gửi yêu cầu nhập học'
                          : 'Đã đủ học viên'
                      }
                    </Button>
                    }
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
                    {tutorData.tutorDescription}
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
                  onChange={(value: ExpertiseCode[]) => setEditedData({ ...editedData, expertise: value })}
                  className="w-full"
                  size="large"
                >
                  {EXPERTISES.map(exp => (
                    <Option key={exp.code} value={exp.code}>{exp.name}</Option>
                  ))}
                </Select>
              ) : (
                <div className="flex flex-wrap gap-4">
                  {tutorData.expertise.map((exp: ExpertiseCode, idx: number) => (
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
                items={tabItems}
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
                  <span className="font-semibold">💡 Lưu ý: Giảng viên sẽ xem xét yêu cầu của bạn và phản hồi trong vòng 24-48 giờ.</span>
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