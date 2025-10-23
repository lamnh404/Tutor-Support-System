import React, { useState } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { initialStudents, type Student } from '~/pages/StudentProfile/StudentData'
import {
  StarFilled,
  CheckCircleFilled,
  BookOutlined,
  TeamOutlined,
  TrophyOutlined,
  MessageOutlined,
  CalendarOutlined,
  GlobalOutlined,
  ClockCircleOutlined,
  FireTwoTone,
  HeartOutlined,
  HeartFilled,
  ShareAltOutlined,
  MoreOutlined
} from '@ant-design/icons'
import { Card, Avatar, Button, Tag, Progress, Tabs, Rate, Divider, Tooltip, Badge, message, type TabsProps } from 'antd'
import { DEPARTMENTS } from '~/pages/TutorSearch/TutorDefinitions'

const StudentProfile: React.FC = () => {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('about')
  const [isFavorite, setIsFavorite] = useState(false)
  const navigate = useNavigate()

  const studentProfile: Student | undefined = initialStudents.find(student => student.id === id)

  if (!studentProfile) {
    return <Navigate to='/404' replace/>
  }

  const progressPercentage = Math.min((studentProfile.completedCourses / 50) * 100, 100)
  const isNearGraduation = studentProfile.year >= 4
  const averageRating = studentProfile.tutorHistory.length > 0 
    ? studentProfile.tutorHistory.reduce((sum, history) => sum + history.rating, 0) / studentProfile.tutorHistory.length 
    : 0

  const getDepartmentName = (code: string) => {
    const dept = DEPARTMENTS.find(d => d.code === code)
    return dept?.name || code
  }

  const getYearText = (year: number) => {
    switch(year) {
      case 1: return 'Năm thứ nhất'
      case 2: return 'Năm thứ hai' 
      case 3: return 'Năm thứ ba'
      case 4: return 'Năm thứ tư'
      default: return `Năm thứ ${year}`
    }
  }

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.6) return { text: 'Xuất sắc', color: 'gold' }
    if (gpa >= 3.2) return { text: 'Giỏi', color: 'green' }
    if (gpa >= 2.5) return { text: 'Khá', color: 'blue' }
    return { text: 'Trung bình', color: 'orange' }
  }

  const { text: gpaText, color: gpaColor } = getGPAColor(studentProfile.gpa)

  const ratingDistribution = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0
  }
  
  studentProfile.tutorHistory.forEach(history => {
    const rating = Math.floor(history.rating)
    if (rating >= 1 && rating <= 5) {
      ratingDistribution[rating as keyof typeof ratingDistribution]++
    }
  })

  const totalReviews = studentProfile.tutorHistory.length
  const ratingPercentages = {
    5: totalReviews > 0 ? (ratingDistribution[5] / totalReviews) * 100 : 0,
    4: totalReviews > 0 ? (ratingDistribution[4] / totalReviews) * 100 : 0,
    3: totalReviews > 0 ? (ratingDistribution[3] / totalReviews) * 100 : 0,
    2: totalReviews > 0 ? (ratingDistribution[2] / totalReviews) * 100 : 0,
    1: totalReviews > 0 ? (ratingDistribution[1] / totalReviews) * 100 : 0
  }

  const tabItems: TabsProps['items'] = [
    {
      key: 'about',
      label: <span className="flex items-center gap-2"><BookOutlined /> About</span>,
      children: (
        <div className="prose max-w-none">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              👋 Giới thiệu
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4 text-base">
              Xin chào! Mình là {studentProfile.firstName}, hiện đang là sinh viên năm {studentProfile.year} 
              ngành {getDepartmentName(studentProfile.department)} tại trường Đại học Bách Khoa TP.HCM. 
              Mình đang tìm kiếm gia sư để nâng cao kiến thức và kỹ năng trong lĩnh vực học tập.
            </p>
            <p className="text-gray-700 leading-relaxed text-base">
              Với GPA hiện tại là {studentProfile.gpa}/4.0, mình mong muốn học hỏi thêm để đạt được 
              các mục tiêu học tập và phát triển bản thân tốt hơn. Mình học tập nghiêm túc và luôn 
              sẵn sàng đón nhận những thử thách mới.
            </p>
          </div>

          <Divider />

          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            💡 Mục tiêu học tập
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {studentProfile.learningGoals.map((goal, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg border-2 border-gray-100 hover:border-blue-200 hover:shadow-md transition-all">
                <span className="text-2xl">🎯</span>
                <span className="text-gray-700 flex-1">{goal}</span>
              </div>
            ))}
          </div>

          <Divider />

          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            🏆 Thành tích
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {studentProfile.achievements.map((achievement, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg border-2 border-gray-100 hover:border-blue-200 hover:shadow-md transition-all">
                <span className="text-2xl">⭐</span>
                <span className="text-gray-700 flex-1">{achievement}</span>
              </div>
            ))}
          </div>

          <Divider />

          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            📚 Môn học cần hỗ trợ
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {studentProfile.needHelpWith.map((subject, index) => (
              <div 
                key={index} 
                className="relative p-6 bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 rounded-xl border-2 border-red-200 hover:border-red-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                    📖
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-bold text-lg leading-tight">{subject}</p>
                    <p className="text-xs text-red-600 mt-1 font-semibold">Cần tìm gia sư</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-red-400/10 to-pink-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>

          <Divider />

          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            📖 Các môn học hiện tại
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {studentProfile.currentCourses.map((course, index) => (
              <div 
                key={index} 
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-100 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <BookOutlined className="text-blue-500 text-xl flex-shrink-0" />
                <span className="font-medium text-gray-800">{course}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      key: 'reviews',
      label: <span className="flex items-center gap-2"><StarFilled />Đánh giá ({studentProfile.tutorHistory.length})</span>,
      children: (
        <>
          <div className="mb-6">
            {studentProfile.tutorHistory.length > 0 && (
              <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 p-6 rounded-xl mb-6">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">
                      {averageRating.toFixed(1)}
                    </div>
                    <Rate disabled defaultValue={averageRating} allowHalf className="text-3xl my-2" />
                    <p className="text-gray-600 font-medium">Dựa trên {studentProfile.tutorHistory.length} đánh giá</p>
                  </div>

                  <div className="flex-1 w-full">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-medium text-gray-700 w-16">{star} sao</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-500"
                            style={{ width: `${ratingPercentages[star as keyof typeof ratingPercentages]}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-12 text-right">
                          {ratingPercentages[star as keyof typeof ratingPercentages].toFixed(0)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {studentProfile.tutorHistory.length > 0 ? (
              studentProfile.tutorHistory.map((history, index) => (
                <Card
                  key={index}
                  className="hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200"
                >
                  <div className="flex gap-4">
                    <Avatar
                      size={56}
                      className="bg-gradient-to-br from-blue-500 to-purple-500 flex-shrink-0 text-white font-bold"
                    >
                      {history.tutorName.charAt(0).toUpperCase()}
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">{history.tutorName}</h4>
                          <p className="text-sm text-gray-500 flex items-center gap-2">
                            <BookOutlined />
                            Môn học: {history.subject}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center gap-2">
                            <ClockCircleOutlined />
                            {history.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <Rate disabled defaultValue={history.rating} className="text-base" />
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border-l-4 border-blue-400">
                        "{history.comment}"
                      </p>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-center py-16">
                <BookOutlined className="text-6xl text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-500 mb-2">Chưa có đánh giá</h3>
                <p className="text-gray-400">Hãy bắt đầu tìm gia sư để học tập nhé!</p>
              </div>
            )}
          </div>
        </>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Top Action Bar */}
        <div className="flex justify-between items-center mb-4">
          <Button
            type="primary"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
              navigate('/dashboard')
            }}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Quay lại
          </Button>
          <div className="flex gap-2">
            <Tooltip title={isFavorite ? 'Loại bỏ khỏi mục yêu thích' : 'Thêm vào mục yêu thích'}>
              <Button
                shape="circle"
                icon={isFavorite ? <HeartFilled className="text-red-500" /> : <HeartOutlined />}
                onClick={() => setIsFavorite(!isFavorite)}
              />
            </Tooltip>
            <Tooltip title="Chia sẻ profile">
              <Button
                shape="circle"
                icon={<ShareAltOutlined />}
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(window.location.href)
                    message.success('Đã sao chép link!')
                  } catch (error) {
                    message.error('Không thể sao chép link.')
                  }
                }}
              />
            </Tooltip>
            <Button shape="circle" icon={<MoreOutlined />} />
          </div>
        </div>

        {/* Header Card */}
        <Card className="mb-6 shadow-2xl rounded-2xl overflow-hidden border-0 bg-white/80 backdrop-blur-sm">
          {/* Banner Background */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-10"></div>

          <div className="relative flex flex-col md:flex-row gap-6 pt-4">
            <div className="flex flex-col items-center md:items-start z-10">
              <Badge.Ribbon text={gpaText} color={gpaColor}>
                <Avatar
                  size={180}
                  src={studentProfile.avatarUrl}
                  className="border-4 border-white shadow-xl"
                />
              </Badge.Ribbon>

              {/* Quick Stats Under Avatar */}
              <div className="mt-4 bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl w-full">
                <div className="text-center">
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    {averageRating > 0 ? averageRating.toFixed(1) : 'N/A'}
                  </div>
                  {averageRating > 0 && <Rate disabled defaultValue={averageRating} allowHalf className="text-sm" />}
                  <div className="text-xs text-gray-600 mt-1">
                    {studentProfile.tutorHistory.length} đánh giá từ gia sư
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2 w-full">
                <Button
                  type="primary"
                  size="large"
                  icon={<MessageOutlined />}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-0"
                >
                  Gửi tin nhắn
                </Button>
                <Button
                  size="large"
                  icon={<CalendarOutlined />}
                  className="w-full border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
                >
                  Đặt lịch dạy
                </Button>
              </div>
            </div>

            {/* Info Section */}
            <div className="flex-1 z-10">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl font-bold text-gray-900">
                      {studentProfile.lastName} {studentProfile.firstName}
                    </h1>
                    {isNearGraduation && (
                      <Tooltip title="Sắp tốt nghiệp!">
                        <Badge count={<FireTwoTone twoToneColor="#52c41a" />} />
                      </Tooltip>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <Tag icon={<CheckCircleFilled />} color="blue" className="px-3 py-1">
                      Sinh viên đã xác minh
                    </Tag>
                    {studentProfile.isActive && (
                      <Tag color="green" className="px-3 py-1">
                        Đang hoạt động
                      </Tag>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-2 text-gray-700">
                    <BookOutlined />
                    <span className="font-medium">{getDepartmentName(studentProfile.department)} - {getYearText(studentProfile.year)}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <GlobalOutlined />
                    <span>MSSV: {studentProfile.studentId}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center gap-2 mb-1">
                    <TrophyOutlined className="text-blue-500 text-xl" />
                    <span className="text-2xl font-bold text-gray-800">{studentProfile.gpa}</span>
                  </div>
                  <p className="text-xs text-gray-600">GPA hiện tại</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center gap-2 mb-1">
                    <BookOutlined className="text-green-500 text-xl" />
                    <span className="text-2xl font-bold text-gray-800">{studentProfile.completedCourses}</span>
                  </div>
                  <p className="text-xs text-gray-600">Khóa học hoàn thành</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center gap-2 mb-1">
                    <TeamOutlined className="text-purple-500 text-xl" />
                    <span className="text-2xl font-bold text-gray-800">{studentProfile.currentCourses.length}</span>
                  </div>
                  <p className="text-xs text-gray-600">Môn đang học</p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-yellow-100 p-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center gap-2 mb-1">
                    <ClockCircleOutlined className="text-orange-500 text-xl" />
                    <span className="text-2xl font-bold text-gray-800">{studentProfile.totalHoursLearned}</span>
                  </div>
                  <p className="text-xs text-gray-600">Giờ học</p>
                </div>
              </div>

              {/* Study Progress (like Availability in TutorProfile) */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-5 rounded-xl border-2 border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <ClockCircleOutlined className="text-lg text-blue-600" />
                    <span className="text-sm font-semibold text-gray-700">Tiến độ học tập</span>
                  </div>
                  <span className="text-sm font-bold text-gray-800">
                    {studentProfile.completedCourses} khóa học
                  </span>
                </div>
                <Progress
                  percent={progressPercentage}
                  strokeColor={{
                    '0%': progressPercentage > 80 ? '#52c41a' : progressPercentage > 60 ? '#1890ff' : progressPercentage > 40 ? '#faad14' : '#f5222d',
                    '100%': progressPercentage > 80 ? '#95de64' : progressPercentage > 60 ? '#40a9ff' : progressPercentage > 40 ? '#ffc53d' : '#ff7875'
                  }}
                  showInfo={false}
                  className="mb-2"
                />
                {isNearGraduation && (
                  <div className="flex items-center gap-2 text-xs text-green-600 font-medium mt-2">
                    <TrophyOutlined />
                    <span>Sắp tốt nghiệp</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs Section */}
        <Card className="shadow-2xl rounded-2xl border-0 bg-white/80 backdrop-blur-sm">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            size="large"
            items={tabItems}
            className="student-profile-tabs"
          />
        </Card>
      </div>
    </div>
  )
}

export default StudentProfile
