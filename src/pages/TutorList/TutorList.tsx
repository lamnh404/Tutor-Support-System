import React, { useState, useMemo } from 'react'
import { myCurrentTutors } from './MyTutorData'
import TutorListCard from './TutorListCard'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import MyCalendar from './MyCalendar'
import { myCalendarEvents } from './MyCalendarData'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

type ViewMode = 'tutors' | 'calendar';


const TutorList: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('tutors')
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

        {/* Tab Buttons - Full Width */}
        <div className="mb-8 flex border-b border-gray-400"> {/* Darker border */}
          <button
            onClick={() => setViewMode('tutors')}
            className={`flex-1 text-center py-3 px-6 text-lg font-medium transition-colors duration-200 ${
              viewMode === 'tutors'
                ? 'border-b-2 border-indigo-600 text-indigo-600 bg-indigo-50/50' // Add subtle bg
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            Các gia sư của tôi
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`flex-1 text-center py-3 px-6 text-lg font-medium transition-colors duration-200 ${
              viewMode === 'calendar'
                ? 'border-b-2 border-indigo-600 text-indigo-600 bg-indigo-50/50' // Add subtle bg
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            Lịch sắp tới
          </button>
        </div>

        <div className="relative overflow-hidden">
          <div key={viewMode} className="transition-opacity duration-300 ease-in-out">

            {/* Tutor View */}
            {viewMode === 'tutors' && (
              // Bounding box for tutors with darker border
              <div className="bg-gradient-to-bl from-gray-100 to-gray-200 p-6 rounded-xl shadow-md border border-gray-300 relative pb-16">
                {myCurrentTutors.length > 0 ? (
                  // Grid container with fixed height attempt
                  // We use placeholders to fill the grid to 12 slots, pushing pagination down
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedTutors.map((tutor) => (
                      <TutorListCard key={tutor.id} tutor={tutor} />
                    ))}
                    {/* Render enough placeholders to make the grid always 12 items tall visually */}
                    {Array.from({ length: Math.max(0, ITEMS_PER_PAGE - paginatedTutors.length) }).map((_, i) => (
                      // Add min-height to placeholders matching card min-height if cards have variable height issues
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
                {/* Tutor Pagination */}
                {myCurrentTutors.length > 0 && ( // Only show pagination if there are tutors
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

            {/* Calendar View */}
            {viewMode === 'calendar' && (
            // Bounding box for calendar with darker border
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-300">
                <div className="flex justify-between items-center mb-4 px-2">
                  <h2 className="text-xl font-bold text-gray-800">{monthYearDisplay}</h2>
                  {/* Month Title Moved Here */}
                </div>
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
                <MyCalendar
                  events={myCalendarEvents}
                  year={currentYear}
                  month={currentMonth}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TutorList