// src/pages/TutorDashboard/TutorDashboard.tsx
import React from 'react'
import PendingRequests from './PendingRequests'
import UpcomingAppointments from './UpcomingAppointments'
import AvailabilityShortcut from './AvailabilityShortcut'
import StudentProgressLinks from './StudentProgressLinks'
import {
  pendingRequestsData,
  upcomingAppointmentsData,
  currentStudentsData
} from './TutorDashboardData'
import { message } from 'antd'

const TutorDashboard: React.FC = () => {
  const handleAcceptRequest = (requestId: string) => {
    console.log('Accepted request:', requestId)
    message.success('Đã chấp nhận yêu cầu!')
    // Thêm logic xóa request khỏi state
  }

  const handleRejectRequest = (requestId: string) => {
    console.log('Rejected request:', requestId)
    message.info('Đã từ chối yêu cầu.')
    // Thêm logic xóa request khỏi state
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Bảng điều khiển Gia sư</h1>

        {/* Bố cục 2 cột */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

          {/* CỘT CHÍNH (Trái) - Dành cho các tác vụ khẩn cấp, động */}
          <div className="lg:col-span-2 space-y-6">
            <PendingRequests
              requests={pendingRequestsData}
              onAccept={handleAcceptRequest}
              onReject={handleRejectRequest}
              limit={2} // Chỉ hiển thị 2 yêu cầu mới nhất
            />
            <UpcomingAppointments
              appointments={upcomingAppointmentsData}
              limit={3} // Chỉ hiển thị 3 lịch hẹn gần nhất
            />
          </div>

          {/* CỘT PHỤ (Phải) - Dành cho các tác vụ quản lý, tĩnh */}
          <div className="lg:col-span-1 space-y-6">
            <AvailabilityShortcut />
            <StudentProgressLinks
              students={currentStudentsData}
              limit={4} // Hiển thị 4 học sinh
            />
          </div>

        </div>
      </div>
    </div>
  )
}

export default TutorDashboard