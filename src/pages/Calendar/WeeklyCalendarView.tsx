import React, { useState } from 'react'
import { type CalendarEvent } from './MyCalendarData'
import { getEventTypeColor } from './MyCalendarData'
import EventHoverPanel from './EventHoverPanel'
import { AnimatePresence } from 'framer-motion'

interface WeeklyCalendarViewProps {
  events: CalendarEvent[];
  weekDays: Date[];
}

const formatTime = (date: Date) => date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })

const WeeklyCalendarView: React.FC<WeeklyCalendarViewProps> = ({ events, weekDays }) => {
  const [hoveredEvent, setHoveredEvent] = useState<CalendarEvent | null>(null)

  const eventsByDay: Record<string, CalendarEvent[]> = {}
  weekDays.forEach(day => {
    const dayString = day.toDateString()
    eventsByDay[dayString] = events
      .filter(event => event.dateTime.toDateString() === dayString)
      .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime())
  })

  return (
    <div className="grid grid-cols-7 min-h-[360px] gap-px bg-gray-300 border border-gray-300 rounded-lg overflow-hidden">
      {weekDays.map(day => {
        const dayString = day.toDateString()
        const dayEvents = eventsByDay[dayString] || []
        const isToday = day.toDateString() === new Date().toDateString()

        return (
          <div key={dayString} className={`relative p-2 min-h-[200px] ${isToday ? 'bg-indigo-50/70' : 'bg-white'}`}>
            <div className={`text-center font-semibold text-sm mb-2 ${isToday ? 'text-indigo-600' : 'text-gray-700'}`}>
              <span className="text-xs">{day.toLocaleDateString('vi-VN', { weekday: 'short' })}</span>
              <div className="text-2xl">{day.getDate()}</div>
            </div>
            <div className="space-y-1">
              {dayEvents.map(event => (
                <div
                  key={event.id}
                  className={`relative ${hoveredEvent && hoveredEvent.id === event.id ? 'z-20' : 'z-10'}`}
                  onMouseEnter={() => setHoveredEvent(event)}
                  onMouseLeave={() => setHoveredEvent(null)}
                >
                  <div className={`flex items-center gap-2 p-1.5 rounded cursor-pointer ${getEventTypeColor(event.type)}`}>
                    <span className="font-bold text-white text-[10px]">{formatTime(event.dateTime)}</span>
                    <span className="text-white text-xs font-medium truncate">{event.title}</span>
                  </div>
                  <AnimatePresence>
                    {hoveredEvent && hoveredEvent.id === event.id && (
                      <EventHoverPanel event={event} />
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default WeeklyCalendarView