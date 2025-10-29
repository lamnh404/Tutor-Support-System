import React, { useState, useMemo, useContext } from 'react'
import { myCurrentTutors } from './MyTutorData'
import TutorListCard from './TutorListCard'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import MyCalendar from './MyCalendar'
import { myCalendarEvents } from './MyCalendarData'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { userContext } from '~/context/User/userContext'
import TutorDashboard from '~/pages/TutorDashboard/TutorDashboard'

type ViewMode = 'myTutors' | 'myMentees' | 'calendar';

const Dashboard: React.FC = () => {
  const { user } = useContext(userContext)
  const userRoles = user?.roles || []

  const canSeeMyTutors = userRoles.includes('STUDENT')
  const canSeeMyMentees = userRoles.includes('TUTOR')
  const canSeeCalendar = userRoles.includes('TUTOR') || userRoles.includes('STUDENT')

  const getInitialView = (): ViewMode => {
    if (canSeeMyTutors) return 'myTutors'
    if (canSeeMyMentees) return 'myMentees'
    if (canSeeCalendar) return 'calendar'
    return 'myTutors'
  }

  const [viewMode, setViewMode] = useState<ViewMode>(getInitialView())
  const [currentPage, setCurrentPage] = useState(1)
  const [currentDate, setCurrentDate] = useState(new Date())

  const ITEMS_PER_PAGE = 12

  const totalTutorPages = Math.ceil(myCurrentTutors.length / ITEMS_PER_PAGE)
  const paginatedTutors = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return myCurrentTutors.slice(startIndex, endIndex)
  }, [currentPage])

  const handlePrevTutorPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1))
  }
  const handleNextTutorPage = () => {
    setCurrentPage(prev => Math.min(totalTutorPages, prev + 1))
  }

  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }
  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }

  const monthYearDisplay = currentDate.toLocaleString('vi-VN', { month: 'long', year: 'numeric' })

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8 flex border-b border-gray-400">
          {canSeeMyTutors && (
            <button
              onClick={() => setViewMode('myTutors')}
              className={`flex-1 text-center py-3 px-6 text-lg font-medium transition-colors duration-200 ${
                viewMode === 'myTutors'
                  ? 'border-b-2 border-indigo-600 text-indigo-600 bg-indigo-50/50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              Các gia sư của tôi
            </button>
          )}
          {canSeeMyMentees && (
            <button
              onClick={() => setViewMode('myMentees')}
              className={`flex-1 text-center py-3 px-6 text-lg font-medium transition-colors duration-200 ${
                viewMode === 'myMentees'
                  ? 'border-b-2 border-indigo-600 text-indigo-600 bg-indigo-50/50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              Các học sinh của tôi
            </button>
          )}
          {canSeeCalendar && (
            <button
              onClick={() => setViewMode('calendar')}
              className={`flex-1 text-center py-3 px-6 text-lg font-medium transition-colors duration-200 ${
                viewMode === 'calendar'
                  ? 'border-b-2 border-indigo-600 text-indigo-600 bg-indigo-50/50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              Lịch sắp tới
            </button>
          )}
        </div>

        <div className="relative overflow-hidden">
          <div key={viewMode} className="transition-opacity duration-300 ease-in-out">

            {viewMode === 'myTutors' && canSeeMyTutors && (
              <div className="bg-gradient-to-bl from-gray-100 to-gray-200 p-6 rounded-xl shadow-md border border-gray-300 relative pb-16">
                {myCurrentTutors.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedTutors.map((tutor) => (
                      <TutorListCard key={tutor.id} tutor={tutor} />
                    ))}
                    {Array.from({ length: Math.max(0, ITEMS_PER_PAGE - paginatedTutors.length) }).map((_, i) => (
                      <div key={`placeholder-${i}`} aria-hidden="true"></div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 min-h-[400px] flex flex-col justify-center items-center">
                    <p className="text-gray-600">Bạn hiện chưa có gia sư nào.</p>
                    <Link to="/dashboard">
                      <Button type="primary" className="mt-4">Tìm kiếm gia sư</Button>
                    </Link>
                  </div>
                )}
                {myCurrentTutors.length > ITEMS_PER_PAGE && (
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 mt-4">
                    <Button
                      icon={<LeftOutlined />}
                      onClick={handlePrevTutorPage}
                      disabled={currentPage === 1}
                      aria-label="Trang trước"
                    />
                    <span className="text-sm text-gray-600">
                      Trang {currentPage} / {totalTutorPages}
                    </span>
                    <Button
                      icon={<RightOutlined />}
                      onClick={handleNextTutorPage}
                      disabled={currentPage === totalTutorPages}
                      aria-label="Trang sau"
                    />
                  </div>
                )}
              </div>
            )}

            {viewMode === 'myMentees' && canSeeMyMentees && (
              <TutorDashboard />
            )}

            {viewMode === 'calendar' && canSeeCalendar && (
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300">
                <div className="flex justify-between items-center mb-4 px-2">
                  <h2 className="text-xl font-bold text-gray-800">{monthYearDisplay}</h2>
                </div>
                <MyCalendar
                  events={myCalendarEvents}
                  year={currentYear}
                  month={currentMonth}
                />
                <div className="flex justify-end items-center gap-2 mt-4">
                  <Button
                    icon={<LeftOutlined />}
                    onClick={handlePrevMonth}
                    aria-label="Tháng trước"
                  />
                  <Button
                    icon={<RightOutlined />}
                    onClick={handleNextMonth}
                    aria-label="Tháng sau"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Dashboard