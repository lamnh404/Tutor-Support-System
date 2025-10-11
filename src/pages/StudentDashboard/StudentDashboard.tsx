import React, { useState, useEffect } from 'react'
import { searchEvents, type Event, type FacultyName, FACULTIES } from './EventData'
import EventCard from './EventCard'

const StudentDashboard: React.FC = () => {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyName | 'all'>('all')

  useEffect(() => {
    const results = searchEvents(searchTerm, selectedFaculty)
    setFilteredEvents(results)
  }, [searchTerm, selectedFaculty])

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Các buổi tư vấn và gặp gỡ</h1>
        <div className="sticky top-[71px] bg-white z-10 p-4 -mx-4 sm:mx-0 rounded-b-xl shadow-md">
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value as FacultyName | 'all')}
              className="flex-shrink-0 w-full sm:w-1/3 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg shadow-sm bg-white"
            >
              <option value="all">Tất cả Khoa</option>
              {FACULTIES.map(faculty => (
                <option key={faculty} value={faculty}>{faculty}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc mô tả sự kiện..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg shadow-sm"
            />
          </div>
        </div>
        <div className="space-y-6 mt-8">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <div className="text-center p-12 bg-white rounded-xl shadow-lg border border-gray-100">
              <p className="text-2xl font-medium text-gray-600">Không tìm thấy sự kiện nào.</p>
              <p className="text-gray-400 mt-2">Hãy thử một từ khóa khác hoặc điều chỉnh bộ lọc.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard