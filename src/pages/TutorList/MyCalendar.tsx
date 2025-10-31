import React, { useState } from 'react'
import { type CalendarEvent } from './MyCalendarData'
import { Tag, Modal } from 'antd'
import { CalendarOutlined, InfoCircleOutlined, UserOutlined, ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons'

interface MyCalendarProps {
  events: CalendarEvent[];
  year: number;
  month: number;
}

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
}
const formatDate = (date: Date): string => {
  return date.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

const MAX_EVENTS_DISPLAY = 2

const MyCalendar: React.FC<MyCalendarProps> = ({ events, year, month }) => {
  const [eventModalVisible, setEventModalVisible] = useState(false)
  const [dayModalVisible, setDayModalVisible] = useState(false) // New state for day modal
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [selectedDayEvents, setSelectedDayEvents] = useState<CalendarEvent[]>([]) // State for day's events
  const [selectedDay, setSelectedDay] = useState<Date | null>(null) // State for the selected day

  const daysOfWeek = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
  // ... (calendarDays generation logic remains the same) ...
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const daysInMonth = lastDayOfMonth.getDate()
  const startDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7

  const calendarDays: (Date | null)[] = []
  for (let i = 0; i < startDayOfWeek; i++) calendarDays.push(null)
  for (let day = 1; day <= daysInMonth; day++) calendarDays.push(new Date(year, month, day))
  while (calendarDays.length < 35) calendarDays.push(null)


  const eventsByDate: Record<string, CalendarEvent[]> = {}
  events.forEach(event => {
    if (event.dateTime.getFullYear() === year && event.dateTime.getMonth() === month) {
      const dateString = event.dateTime.toDateString()
      if (!eventsByDate[dateString]) eventsByDate[dateString] = []
      eventsByDate[dateString].push(event)
    }
  })

  const getEventTypeStyle = (type: CalendarEvent['type']): { color: string; bgColor: string; borderColor: string, icon: React.ReactNode } => {
    switch (type) {
    case 'assignment_open': return { color: 'text-blue-700', bgColor: 'bg-blue-50', borderColor: 'border-blue-200', icon: <InfoCircleOutlined/> }
    case 'assignment_due': return { color: 'text-red-700', bgColor: 'bg-red-50', borderColor: 'border-red-200', icon: <ClockCircleOutlined /> }
    case 'session': return { color: 'text-green-700', bgColor: 'bg-green-50', borderColor: 'border-green-200', icon: <UserOutlined /> }
    default: return { color: 'text-gray-700', bgColor: 'bg-gray-50', borderColor: 'border-gray-200', icon: <CalendarOutlined/> }
    }
  }

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setEventModalVisible(true)
  }

  const handleShowMoreClick = (day: Date, dayEvents: CalendarEvent[]) => {
    setSelectedDay(day)
    setSelectedDayEvents(dayEvents)
    setDayModalVisible(true)
  }

  const handleEventModalClose = () => {
    setEventModalVisible(false)
    setSelectedEvent(null)
  }

  const handleDayModalClose = () => {
    setDayModalVisible(false)
    setSelectedDayEvents([])
    setSelectedDay(null)
  }


  return (
    <>
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-300">
        <div className="grid grid-cols-7 gap-px border-b border-gray-300">
          {daysOfWeek.map((dayLabel) => (
            <div key={dayLabel} className="text-center font-semibold text-xs sm:text-sm py-2 text-gray-600">
              {dayLabel}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-gray-300 border border-gray-300 border-t-0 rounded-b-lg overflow-hidden">
          {calendarDays.map((day, index) => {
            const isPadding = day === null
            const dayString = day?.toDateString()
            const dayEvents = dayString ? (eventsByDate[dayString] || []) : []
            const isToday = day?.toDateString() === new Date().toDateString()
            const showMoreCount = dayEvents.length - MAX_EVENTS_DISPLAY

            return (
              <div
                key={index}
                className={`relative p-1.5 sm:p-2 min-h-[140px] sm:min-h-[160px] ${isPadding ? 'bg-gray-100' : isToday ? 'bg-blue-200' : 'bg-white'}`}
              >
                {!isPadding && (
                  <div className={`text-xs sm:text-sm font-medium mb-1 ${isToday ? 'text-indigo-600 font-bold' : 'text-gray-500'}`}>
                    {day.getDate()}
                  </div>
                )}
                {!isPadding && dayEvents.length > 0 && (
                  <div className="space-y-1">
                    {dayEvents.slice(0, MAX_EVENTS_DISPLAY).map((event) => {
                      const style = getEventTypeStyle(event.type)
                      return (
                        <button
                          key={event.id}
                          onClick={() => handleEventClick(event)}
                          className={`w-full text-left text-[10px] sm:text-xs p-1.5 rounded ${style.bgColor} ${style.color} border ${style.borderColor} hover:shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-300 truncate transition-shadow`}
                          title={event.title}
                        >
                          <div className="flex items-center gap-1 font-medium">
                            {style.icon}
                            <span className="truncate">{event.title}</span>
                          </div>
                          <div className="pl-4 text-[9px] sm:text-[10px] opacity-80">{formatTime(event.dateTime)}</div>
                        </button>
                      )
                    })}
                    {showMoreCount > 0 && day && ( // Check if day is not null
                      <button
                        onClick={() => handleShowMoreClick(day, dayEvents)} // Pass the full day's events
                        className="w-full text-center text-[10px] sm:text-xs cursor-pointer text-indigo-600 hover:text-indigo-800 pt-1 font-medium focus:outline-none"
                      >
                             Và {showMoreCount} sự kiện khác...
                      </button>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Event Detail Modal (Existing) */}
      <Modal
        title={selectedEvent?.title}
        open={eventModalVisible}
        onCancel={handleEventModalClose}
        footer={null}
      >
        {selectedEvent && (
          <div className='space-y-3 mt-4'>
            <p className='flex items-center gap-2'><CalendarOutlined className='text-gray-500'/> <strong>Ngày:</strong> {formatDate(selectedEvent.dateTime)}</p>
            <p className='flex items-center gap-2'><ClockCircleOutlined className='text-gray-500'/> <strong>Giờ:</strong> {formatTime(selectedEvent.dateTime)}</p>
            {selectedEvent.relatedInfo && (
              <p className='flex items-center gap-2'><InfoCircleOutlined className='text-gray-500'/> <strong>Liên quan:</strong> {selectedEvent.relatedInfo}</p>
            )}
            {selectedEvent.location && selectedEvent.type === 'session' && (
              <p className='flex items-center gap-2'><EnvironmentOutlined className='text-gray-500'/> <strong>Địa điểm:</strong> {selectedEvent.location}</p>
            )}
            {selectedEvent.description && (
              <p className='text-gray-700 mt-2'>{selectedEvent.description}</p>
            )}
            <Tag color={getEventTypeStyle(selectedEvent.type).color.split('-')[1]} className='capitalize mt-2'>
              {selectedEvent.type.replace('_', ' ')}
            </Tag>
          </div>
        )}
      </Modal>

      {/* New Modal for All Day Events */}
      <Modal
        // Use formatDate for the title, check if selectedDay exists
        title={`Sự kiện ngày ${selectedDay ? formatDate(selectedDay) : ''}`}
        open={dayModalVisible}
        onCancel={handleDayModalClose}
        footer={null} // Or add a close button if preferred
      >
        {selectedDayEvents.length > 0 && (
          <div className="space-y-3 mt-4 max-h-96 overflow-y-auto pr-2">
            {selectedDayEvents.map(event => {
              const style = getEventTypeStyle(event.type)
              return (
                <div key={event.id} className={`p-3 rounded border ${style.borderColor} ${style.bgColor} ${style.color}`}>
                  <div className="flex items-center gap-2 font-semibold">
                    {style.icon}
                    <span>{event.title}</span>
                  </div>
                  <div className="pl-6 text-xs mt-1 space-y-0.5 opacity-90">
                    <p className='flex items-center gap-1'><ClockCircleOutlined /> {formatTime(event.dateTime)}</p>
                    {event.relatedInfo && <p className='flex items-center gap-1'><InfoCircleOutlined /> {event.relatedInfo}</p>}
                    {event.location && event.type === 'session' && <p className='flex items-center gap-1'><EnvironmentOutlined /> {event.location}</p>}
                    {event.description && <p className='mt-1 text-[11px]'>{event.description}</p>}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Modal>
    </>
  )
}

export default MyCalendar