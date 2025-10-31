// src/pages/MyTutors/EventHoverPanel.tsx
import React from 'react'
import { type CalendarEvent } from './MyCalendarData'
import { CalendarOutlined, InfoCircleOutlined, ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'

interface EventHoverPanelProps {
  event: CalendarEvent;
}

const formatTime = (date: Date) => date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
const formatDate = (date: Date) => date.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' })

const EventHoverPanel: React.FC<EventHoverPanelProps> = ({ event }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      // Sửa: Thêm z-50 để đảm bảo nó luôn ở trên cùng
      className="absolute z-50 left-full top-0 ml-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 p-4"
    >
      <h4 className="font-bold text-gray-800">{event.title}</h4>
      <p className="text-sm text-gray-600 flex items-center gap-2 mt-2">
        <CalendarOutlined /> {formatDate(event.dateTime)}
      </p>
      <p className="text-sm text-gray-600 flex items-center gap-2">
        <ClockCircleOutlined /> {formatTime(event.dateTime)}
      </p>
      {event.location && (
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <EnvironmentOutlined /> {event.location}
        </p>
      )}
      {event.relatedInfo && (
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <InfoCircleOutlined /> {event.relatedInfo}
        </p>
      )}
      {event.description && (
        <p className="text-sm text-gray-500 italic mt-2 border-t pt-2">{event.description}</p>
      )}
    </motion.div>
  )
}

export default EventHoverPanel