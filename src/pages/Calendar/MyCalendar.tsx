import React, { useState } from 'react'
import { myCalendarEvents, getWeekNumber } from './MyCalendarData'
import { Button } from 'antd'
import { LeftOutlined, RightOutlined, CalendarOutlined, UnorderedListOutlined } from '@ant-design/icons'
import WeeklyCalendarView from './WeeklyCalendarView'
import MonthlyCalendarView from './MonthlyCalendarView'

const getMonday = (d: Date): Date => {
  d = new Date(d)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(d.setDate(diff))
  monday.setHours(0, 0, 0, 0)
  return monday
}

const MyCalendar: React.FC = () => {
  const [calendarView, setCalendarView] = useState<'week' | 'month'>('week')
  const [currentDate, setCurrentDate] = useState(new Date())

  const currentMonday = getMonday(currentDate)
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const currentWeekDays = Array.from({ length: 7 }).map((_, i) => {
    const day = new Date(currentMonday)
    day.setDate(currentMonday.getDate() + i)
    return day
  })

  const handlePrev = () => {
    if (calendarView === 'week') {
      setCurrentDate(prev => new Date(prev.setDate(prev.getDate() - 7)))
    } else {
      setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
    }
  }

  const handleNext = () => {
    if (calendarView === 'week') {
      setCurrentDate(prev => new Date(prev.setDate(prev.getDate() + 7)))
    } else {
      setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
    }
  }

  const getTitle = () => {
    if (calendarView === 'week') {
      return `Tuần ${getWeekNumber(currentDate)} - ${currentDate.toLocaleString('vi-VN', { month: 'long', year: 'numeric' })}`
    }
    return currentDate.toLocaleString('vi-VN', { month: 'long', year: 'numeric' })
  }

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="bg-white p-6 max-w-7xl mx-auto rounded-xl shadow-md border top-[64px] border-gray-300">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-4">
          <h2 className="text-xl font-bold text-gray-800">{getTitle()}</h2>
          <div className="flex items-center gap-2">
            <Button
              icon={<LeftOutlined />}
              onClick={handlePrev}
              aria-label={calendarView === 'week' ? 'Tuần trước' : 'Tháng trước'}
            />
            <Button
              icon={<RightOutlined />}
              onClick={handleNext}
              aria-label={calendarView === 'week' ? 'Tuần sau' : 'Tháng sau'}
            />
            <div className="ml-4 flex rounded-md bg-gray-100 p-0.5">
              <button
                onClick={() => setCalendarView('week')}
                className={`p-1.5 rounded ${calendarView === 'week' ? 'bg-white shadow-sm' : 'text-gray-500'} transition-all`}
                aria-label="Xem theo tuần"
              >
                <UnorderedListOutlined />
              </button>
              <button
                onClick={() => setCalendarView('month')}
                className={`p-1.5 rounded ${calendarView === 'month' ? 'bg-white shadow-sm' : 'text-gray-500'} transition-all`}
                aria-label="Xem theo tháng"
              >
                <CalendarOutlined />
              </button>
            </div>
          </div>
        </div>

        {calendarView === 'week' ? (
          <WeeklyCalendarView events={myCalendarEvents} weekDays={currentWeekDays} />
        ) : (
          <MonthlyCalendarView events={myCalendarEvents} year={currentYear} month={currentMonth} />
        )}
      </div>
    </div>
  )
}

export default MyCalendar