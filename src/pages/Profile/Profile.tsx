import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// import { userProfileAPI } from '~/apis/userAPI'
import { initialProfile } from '~/pages/Profile/ProfileData.tsx'
import { type Tutor } from '~/pages/TutorSearch/TutorData.tsx'
import { mockReviews } from '~/components/Review/mockReviews.tsx'
import {
  StarFilled,
  CheckCircleFilled,
  BookOutlined,
  TeamOutlined,
  TrophyOutlined,
  MessageOutlined,
  CalendarOutlined,
  GlobalOutlined
} from '@ant-design/icons'
import { Card, Avatar, Button, Tag, Progress, Tabs, Rate, Divider } from 'antd'


const { TabPane } = Tabs
const Profile : React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const userProfile: Tutor | undefined = initialProfile.find(profile => profile.id === id)
  if (!userProfile) {
    navigate('/404')
  }

  const availabilityPercentage = ((userProfile!.maxMentee - userProfile!.currMentee) / userProfile!.maxMentee) * 100

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Card */}
        <Card className="mb-6 shadow-lg rounded-xl overflow-hidden border-0">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar Section */}
            <div className="flex flex-col items-center md:items-start">
              <Avatar
                size={160}
                src={userProfile!.avatarUrl}
                className="border-4 border-blue-100"
              />
              <div className="mt-4 flex gap-2">
                <Button type="primary" size="large" icon={<MessageOutlined />}>
                  Message
                </Button>
                <Button size="large" icon={<CalendarOutlined />}>
                  Book Lesson
                </Button>
              </div>
            </div>

            {/* Info Section */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-1">
                    {userProfile!.firstName} {userProfile!.lastName}
                  </h1>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircleFilled className="text-blue-500" />
                    <span className="text-gray-600">Certified OET trainer / PLAB2 and ESL tutor</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <GlobalOutlined />
                    <span>English • Tagalog • Spanish</span>
                  </div>
                </div>
              </div>

              {/* Rating and Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <StarFilled className="text-yellow-500 text-xl" />
                    <span className="text-2xl font-bold text-gray-800">{userProfile!.rating_avg.toFixed(1)}</span>
                  </div>
                  <p className="text-xs text-gray-600">{userProfile!.rating_count} reviews</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <TeamOutlined className="text-blue-500 text-xl" />
                    <span className="text-2xl font-bold text-gray-800">{userProfile!.currMentee}</span>
                  </div>
                  <p className="text-xs text-gray-600">Active students</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <BookOutlined className="text-green-500 text-xl" />
                    <span className="text-2xl font-bold text-gray-800">500+</span>
                  </div>
                  <p className="text-xs text-gray-600">Lessons taught</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <TrophyOutlined className="text-purple-500 text-xl" />
                    <span className="text-2xl font-bold text-gray-800">7 yrs</span>
                  </div>
                  <p className="text-xs text-gray-600">Experience</p>
                </div>
              </div>

              {/* Expertise Tags */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Specializations:</h3>
                <div className="flex flex-wrap gap-2">
                  {userProfile!.expertise.map((skill, index) => (
                    <Tag key={index} color="blue" className="px-3 py-1 text-sm">
                      {skill}
                    </Tag>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700">Availability</span>
                  <span className="text-sm text-gray-600">
                    {userProfile!.maxMentee - userProfile!.currMentee} / {userProfile!.maxMentee} slots open
                  </span>
                </div>
                <Progress
                  percent={availabilityPercentage}
                  strokeColor={availabilityPercentage > 50 ? '#52c41a' : availabilityPercentage > 20 ? '#faad14' : '#f5222d'}
                  showInfo={false}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs Section */}
        <Card className="shadow-lg rounded-xl border-0">
          <Tabs activeKey={activeTab} onChange={setActiveTab} size="large">
            <TabPane tab="About" key="about">
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">About Me</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {userProfile!.description}
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Welcome to my OET preparation and ESL classes! 👋 With almost 7 years of experience helping
                  medical professionals like doctors, ophthalmologists, nurses, physiotherapists, and dentists ace the
                  OET, I'm confident I can help you too! 🎓
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  My approach is fun, engaging, and tailored to each student's unique needs. 🎯 I love teaching kids
                  and adults alike, creating an environment where learning feels natural and enjoyable.
                </p>

                <Divider />

                <h3 className="text-xl font-semibold text-gray-800 mb-4">Teaching Philosophy</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>✓ Personalized lesson plans based on individual goals and learning styles</li>
                  <li>✓ Interactive and engaging teaching methods that keep students motivated</li>
                  <li>✓ Focus on practical application and real-world scenarios</li>
                  <li>✓ Continuous feedback and progress tracking</li>
                  <li>✓ Supportive environment that encourages questions and growth</li>
                </ul>
              </div>
            </TabPane>

            <TabPane tab={`Reviews (${mockReviews.length})`} key="reviews">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">What My Students Say</h3>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-5xl font-bold text-gray-800">{userProfile!.rating_avg.toFixed(1)}</div>
                  <div>
                    <Rate disabled defaultValue={userProfile!.rating_avg} allowHalf className="text-2xl" />
                    <p className="text-gray-600 mt-1">Based on {userProfile!.rating_count} student reviews</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {mockReviews.map((review : ) => (
                  <Card key={review.id} className="hover:shadow-md transition-shadow">
                    <div className="flex gap-4">
                      <Avatar size={48} className="bg-blue-500 flex-shrink-0">
                        {review.studentName.charAt(0).toUpperCase()}
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-800">{review.studentName}</h4>
                            <p className="text-sm text-gray-500">{review.date}</p>
                          </div>
                          <Rate disabled defaultValue={review.rating} className="text-sm" />
                        </div>
                        <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabPane>

            <TabPane tab="Schedule" key="schedule">
              <div className="text-center py-12">
                <CalendarOutlined className="text-6xl text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Schedule a Lesson</h3>
                <p className="text-gray-600 mb-6">
                  View available time slots and book your lesson with {userProfile!.firstName}
                </p>
                <Button type="primary" size="large" icon={<CalendarOutlined />}>
                  View Calendar
                </Button>
              </div>
            </TabPane>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}

export default Profile