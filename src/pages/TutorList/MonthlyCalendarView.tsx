// src/pages/MyTutors/MonthlyCalendarView.tsx
import React from 'react'
import { type CalendarEvent } from './MyCalendarData'
import { getEventTypeColor } from './MyCalendarData'

interface MonthlyCalendarViewProps {
  events: CalendarEvent[];
  year: number;
  month: number;
}

const MonthlyCalendarView: React.FC<MonthlyCalendarViewProps> = ({ events, year, month }) => {
  const daysOfWeek = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()
  const startDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7

  const calendarDays: (Date | null)[] = []
  for (let i = 0; i < startDayOfWeek; i++) calendarDays.push(null)
  for (let day = 1; day <= daysInMonth; day++) calendarDays.push(new Date(year, month, day))
  while (calendarDays.length < 35) calendarDays.push(null) // Chỉ dùng 5 hàng (35 ô) nếu đủ

  // Nếu 5 hàng không đủ (ví dụ tháng có 31 ngày bắt đầu vào T6 hoặc T7), dùng 6 hàng
  if (calendarDays.length > 35 && calendarDays[34] !== null && calendarDays[34].getDate() < lastDayOfMonth.getDate()) {
    while (calendarDays.length < 42) calendarDays.push(null)
  }


  const eventsByDate: Record<string, CalendarEvent[]> = {}
  events.forEach(event => {
    if (event.dateTime.getFullYear() === year && event.dateTime.getMonth() === month) {
      const dateString = event.dateTime.toDateString()
      if (!eventsByDate[dateString]) eventsByDate[dateString] = []
      eventsByDate[dateString].push(event)
    }
  })

  return (
    <div className="grid grid-cols-7 gap-px bg-gray-300 border border-gray-300 rounded-lg overflow-hidden">
      {daysOfWeek.map((dayLabel) => (
        <div key={dayLabel} className="text-center font-semibold text-xs py-2 text-gray-600 bg-gray-100">
          {dayLabel}
        </div>
      ))}
      {calendarDays.map((day, index) => {
        const isPadding = day === null
        const dayString = day?.toDateString()
        const dayEvents = dayString ? eventsByDate[dayString] || [] : []
        const isToday = day?.toDateString() === new Date().toDateString()

        const eventTypes = [...new Set(dayEvents.map(e => e.type))]

        return (
          <div
            key={index}
            // Giảm chiều cao và padding
            className={`relative p-1.5 min-h-[72px] ${isPadding ? 'bg-gray-100' : isToday ? 'bg-indigo-50/70' : 'bg-white'}`}
          >
            {!isPadding && (
              // Giảm kích thước chữ và margin
              <div className={`text-xs font-medium mb-1 ${isToday ? 'text-indigo-600 font-bold' : 'text-gray-500'}`}>
                {day.getDate()}
              </div>
            )}
            {!isPadding && eventTypes.length > 0 && (
              // Giảm margin-top và kích thước chấm
              <div className="flex justify-start items-center flex-wrap gap-1 mt-1">
                {eventTypes.slice(0, 5).map((type) => ( // Hiển thị tối đa 5 chấm
                  <div key={type} className={`w-3 h-3 rounded-full ${getEventTypeColor(type)}`} />
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default MonthlyCalendarView