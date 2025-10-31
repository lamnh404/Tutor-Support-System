// src/pages/TutorDashboard/StudentProgressLinks.tsx
import React from 'react'
import { type CurrentStudent } from './TutorDashboardData'
import { Link } from 'react-router-dom'
import { EditOutlined } from '@ant-design/icons'

interface StudentProgressLinksProps {
  students: CurrentStudent[];
}

const StudentProgressLinks: React.FC<StudentProgressLinksProps> = ({ students }) => {
  if (!students || students.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Cập nhật tiến độ học sinh</h2>
        <p className="text-gray-500 italic">Bạn chưa có học sinh nào.</p>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Cập nhật tiến độ học sinh</h2>
      <ul className="space-y-3 max-h-72 overflow-y-auto pr-2">
        {students.map((student) => (
          <li key={student.id} className="border border-gray-100 rounded-md p-3 flex items-center justify-between gap-3 bg-gradient-to-bl from-purple-200 to-purple-300">
            <div className="flex items-center gap-3">
              <img src={student.studentAvatar} alt={student.studentName} className="w-10 h-10 rounded-full object-cover"/>
              <div>
                <p className="font-medium text-xl text-gray-700">{student.studentName}</p>
                <p className="text-xs text-purple-700 font-semibold">{student.subject}</p>
                {student.lastUpdate && (
                  <p className="text-xs text-gray-400 mt-0.5">Cập nhật lần cuối: {student.lastUpdate.toLocaleDateString('vi-VN')}</p>
                )}
              </div>
            </div>
            <Link to={`/student-progress/${student.id}`}>
              <button
                className="flex-shrink-0 px-3 text-purple-600 hover:text-purple-800 p-2 rounded-full cursor-pointer hover:bg-purple-200 transition-colors focus:outline-none focus:ring-1 focus:ring-purple-400"
                aria-label={`Cập nhật tiến độ cho ${student.studentName}`}
              >
                <EditOutlined />
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StudentProgressLinks