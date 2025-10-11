import React, { useState } from 'react'
import { useParams, Navigate, useNavigate} from 'react-router-dom'
import { initialProfile } from '~/pages/Profile/ProfileData.tsx'
import { type Tutor } from '~/pages/TutorSearch/TutorData.tsx'
import { mockReviews, type Review } from '~/components/Review/mockReviews.tsx'
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
  FireOutlined,
  SafetyCertificateOutlined,
  HeartOutlined,
  HeartFilled,
  ShareAltOutlined,
  MoreOutlined
} from '@ant-design/icons'
import { Card, Avatar, Button, Tag, Progress, Tabs, Rate, Divider, Tooltip, Badge, message, type TabsProps } from 'antd'

const Profile: React.FC = () => {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('about')
  const [isFavorite, setIsFavorite] = useState(false)
  const navigate = useNavigate()

  const userProfile: Tutor | undefined = initialProfile.find(profile => profile.id === id)

  if (!userProfile) {
    return <Navigate to='/404' replace/>
  }

  const availabilityPercentage = ((userProfile.maxMentee - userProfile.currMentee) / userProfile.maxMentee) * 100
  const isHighDemand = userProfile.currMentee / userProfile.maxMentee > 0.7
  const ratingDistribution = {
    5: 85,
    4: 10,
    3: 3,
    2: 1,
    1: 1
  }

  const tabItems: TabsProps['items'] = [
    {
      key: 'about',
      label: <span className="flex items-center gap-2"><BookOutlined /> About</span>,
      children: (
        <div className="prose max-w-none">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              👋 About Me
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4 text-base">
              {userProfile?.description}
            </p>
            <p className="text-gray-700 leading-relaxed mb-4 text-base">
              Welcome to my OET preparation and ESL classes! 🎓 With almost 7 years of experience helping
              medical professionals like doctors, ophthalmologists, nurses, physiotherapists, and dentists ace the
              OET, I'm confident I can help you too!
            </p>
            <p className="text-gray-700 leading-relaxed text-base">
              My approach is fun, engaging, and tailored to each student's unique needs. 🎯 I love teaching kids
              and adults alike, creating an environment where learning feels natural and enjoyable.
            </p>
          </div>

          <Divider />

          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            💡 Teaching Philosophy
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: '🎯', text: 'Personalized lesson plans based on individual goals and learning styles' },
              { icon: '🚀', text: 'Interactive and engaging teaching methods that keep students motivated' },
              { icon: '💼', text: 'Focus on practical application and real-world scenarios' },
              { icon: '📊', text: 'Continuous feedback and progress tracking' },
              { icon: '🤝', text: 'Supportive environment that encourages questions and growth' },
              { icon: '⭐', text: 'Proven track record of student success and satisfaction' }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg border-2 border-gray-100 hover:border-blue-200 hover:shadow-md transition-all">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-gray-700 flex-1">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      key: 'reviews',
      label: <span className="flex items-center gap-2"><StarFilled /> Reviews ({mockReviews.length})</span>,
      children: (
        <>
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">What My Students Say</h3>

            {/* Enhanced Rating Overview */}
            <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 p-6 rounded-xl mb-6">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="text-center">
                  <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">
                    {userProfile?.rating_avg.toFixed(1)}
                  </div>
                  <Rate disabled defaultValue={userProfile?.rating_avg} allowHalf className="text-3xl my-2" />
                  <p className="text-gray-600 font-medium">Based on {userProfile?.rating_count} reviews</p>
                </div>

                <div className="flex-1 w-full">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-medium text-gray-700 w-16">{star} stars</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-500"
                          style={{ width: `${ratingDistribution[star as keyof typeof ratingDistribution]}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-12 text-right">
                        {ratingDistribution[star as keyof typeof ratingDistribution]}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Review Cards */}
          <div className="space-y-4">
            {mockReviews.map((review: Review) => (
              <Card
                key={review.id}
                className="hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200"
              >
                <div className="flex gap-4">
                  <Avatar
                    size={56}
                    className="bg-gradient-to-br from-blue-500 to-purple-500 flex-shrink-0 text-white font-bold"
                  >
                    {review.studentName.charAt(0).toUpperCase()}
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">{review.studentName}</h4>
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                          <ClockCircleOutlined />
                          {review.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <Rate disabled defaultValue={review.rating} className="text-base" />
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border-l-4 border-blue-400">
                      "{review.comment}"
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )
    },
    {
      key: 'schedule',
      label: <span className="flex items-center gap-2"><CalendarOutlined /> Schedule</span>,
      children: (
        <div className="text-center py-16">
          <div className="inline-block p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full mb-6">
            <CalendarOutlined className="text-7xl text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Schedule Your First Lesson</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            View {userProfile?.firstName}'s available time slots and book a lesson that fits your schedule perfectly
          </p>
          <Button
            type="primary"
            size="large"
            icon={<CalendarOutlined />}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 px-8 h-12 text-base font-medium"
          >
            View Available Times
          </Button>
        </div>
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
            ← Quay lại tìm gia sư
          </Button>
          <div className="flex gap-2">
            <Tooltip title={isFavorite ? 'Loại bỏ khỏi mục yêu thích' : 'Thêm vào mục yêu thích'}>
              <Button
                shape="circle"
                icon={isFavorite ? <HeartFilled className="text-red-500" /> : <HeartOutlined />}
                onClick={() => setIsFavorite(!isFavorite)}
              />
            </Tooltip>
            <Tooltip title="Share profile">
              <Button
                shape="circle"
                icon={<ShareAltOutlined />}
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(window.location.href)
                    message.success('Copied link to clipboard!')
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  } catch (error) {
                    message.error('Failed to copy link.')
                  }
                }}
              />
            </Tooltip>
            <Button shape="circle" icon={<MoreOutlined />} />
          </div>
        </div>

        {/* Header Card with Enhanced Design */}
        <Card className="mb-6 shadow-2xl rounded-2xl overflow-hidden border-0 bg-white/80 backdrop-blur-sm">
          {/* Banner Background */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-10"></div>

          <div className="relative flex flex-col md:flex-row gap-6 pt-4">
            <div className="flex flex-col items-center md:items-start z-10">
              <Badge.Ribbon text="Top Rated" color="gold">
                <Avatar
                  size={180}
                  src={userProfile.avatarUrl}
                  className="border-4 border-white shadow-xl"
                />
              </Badge.Ribbon>

              {/* Quick Stats Under Avatar */}
              <div className="mt-4 bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl w-full">
                <div className="text-center mb-3">
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    {userProfile.rating_avg.toFixed(1)}
                  </div>
                  <Rate disabled defaultValue={userProfile.rating_avg} allowHalf className="text-sm" />
                  <div className="text-xs text-gray-600 mt-1">{userProfile.rating_count} reviews</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Response time:</span>
                    <span className="font-semibold text-green-600">~1 hour</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Success rate:</span>
                    <span className="font-semibold text-blue-600">98%</span>
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
                  Send Message
                </Button>
                <Button
                  size="large"
                  icon={<CalendarOutlined />}
                  className="w-full border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
                >
                  Book Lesson
                </Button>
              </div>
            </div>

            {/* Info Section */}
            <div className="flex-1 z-10">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl font-bold text-gray-900">
                      {userProfile.lastName} {userProfile.firstName}
                    </h1>
                    {isHighDemand && (
                      <Tooltip title="High demand tutor">
                        <Badge count={<FireOutlined className="text-orange-500" />} />
                      </Tooltip>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <Tag icon={<CheckCircleFilled />} color="blue" className="px-3 py-1">
                      Verified Professional
                    </Tag>
                    <Tag icon={<SafetyCertificateOutlined />} color="green" className="px-3 py-1">
                      Background Checked
                    </Tag>
                  </div>

                  <div className="flex items-center gap-2 mb-2 text-gray-700">
                    <BookOutlined />
                    <span className="font-medium">Certified OET trainer / PLAB2 and ESL tutor for all ages</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <GlobalOutlined />
                    <span>Speaks: English (Native) • Tagalog (Native) • Spanish (Beginner)</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                <div className="bg-gradient-to-br from-yellow-50 to-orange-100 p-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center gap-2 mb-1">
                    <StarFilled className="text-yellow-500 text-xl" />
                    <span className="text-2xl font-bold text-gray-800">{userProfile.rating_avg.toFixed(1)}</span>
                  </div>
                  <p className="text-xs text-gray-600">{userProfile.rating_count} reviews</p>
                  <div className="mt-2 h-1 bg-yellow-200 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center gap-2 mb-1">
                    <TeamOutlined className="text-blue-500 text-xl" />
                    <span className="text-2xl font-bold text-gray-800">{userProfile.currMentee}</span>
                  </div>
                  <p className="text-xs text-gray-600">Active students</p>
                  <div className="mt-2 h-1 bg-blue-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center gap-2 mb-1">
                    <BookOutlined className="text-green-500 text-xl" />
                    <span className="text-2xl font-bold text-gray-800">500+</span>
                  </div>
                  <p className="text-xs text-gray-600">Lessons completed</p>
                  <div className="mt-2 h-1 bg-green-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center gap-2 mb-1">
                    <TrophyOutlined className="text-purple-500 text-xl" />
                    <span className="text-2xl font-bold text-gray-800">7 yrs</span>
                  </div>
                  <p className="text-xs text-gray-600">Teaching experience</p>
                  <div className="mt-2 h-1 bg-purple-200 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>

              {/* Expertise Tags with Enhanced Design */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <span>🎯</span> Specializations
                </h3>
                <div className="flex flex-wrap gap-2">
                  {userProfile.expertise.map((skill, index) => (
                    <Tag
                      key={index}
                      className="px-4 py-2 text-sm border-2 border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:border-blue-300 transition-all cursor-pointer"
                    >
                      {skill}
                    </Tag>
                  ))}
                </div>
              </div>

              {/* Enhanced Availability Section */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-5 rounded-xl border-2 border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <ClockCircleOutlined className="text-lg text-blue-600" />
                    <span className="text-sm font-semibold text-gray-700">Current Availability</span>
                  </div>
                  <span className="text-sm font-bold text-gray-800">
                    {userProfile.maxMentee - userProfile.currMentee} / {userProfile.maxMentee} spots open
                  </span>
                </div>
                <Progress
                  percent={availabilityPercentage}
                  strokeColor={{
                    '0%': availabilityPercentage > 50 ? '#52c41a' : availabilityPercentage > 20 ? '#faad14' : '#f5222d',
                    '100%': availabilityPercentage > 50 ? '#95de64' : availabilityPercentage > 20 ? '#ffc53d' : '#ff7875'
                  }}
                  showInfo={false}
                  className="mb-2"
                />
                {isHighDemand && (
                  <div className="flex items-center gap-2 text-xs text-orange-600 font-medium mt-2">
                    <FireOutlined />
                    <span>High demand! Book soon to secure your spot</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs Section with Enhanced Design */}
        <Card className="shadow-2xl rounded-2xl border-0 bg-white/80 backdrop-blur-sm">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            size="large"
            items={tabItems}
            className="profile-tabs"
          />
        </Card>
      </div>
    </div>
  )
}

export default Profile