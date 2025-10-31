// src/pages/TutorDashboard/TutorDashboard.tsx
import React, { useState } from 'react'
import { AnimatePresence, motion, LayoutGroup } from 'framer-motion'
import { AppstoreOutlined } from '@ant-design/icons'
import {
  pendingRequestsData,
  upcomingAppointmentsData,
  currentStudentsData
} from './TutorDashboardData'
import PendingRequests from './PendingRequests'
import UpcomingAppointments from './UpcomingAppointments'
import AvailabilityShortcut from './AvailabilityShortcut'
import StudentProgressLinks from './StudentProgressLinks'
import DashboardOverview from './DashboardOverview'

// Định nghĩa các "view" mà dashboard có thể hiển thị
type ViewMode = 'overview' | 'requests' | 'appointments' | 'availability' | 'students';

const TutorDashboard: React.FC = () => {
  // 'overview' là trạng thái ban đầu hiển thị 4 nút
  const [viewMode, setViewMode] = useState<ViewMode>('overview')

  const tabs = [
    { id: 'requests', label: 'Yêu cầu', dataCount: pendingRequestsData.length },
    { id: 'appointments', label: 'Lịch hẹn', dataCount: upcomingAppointmentsData.length },
    { id: 'availability', label: 'Lịch trống', dataCount: null },
    { id: 'students', label: 'Học sinh', dataCount: currentStudentsData.length }
  ]

  return (
    // LayoutGroup là chìa khóa để cho phép animation layoutId
    <LayoutGroup>
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Tiêu đề hoặc Thanh Tabs, tùy thuộc vào viewMode */}
          <motion.div layout className="flex justify-between items-center mb-6">
            {viewMode === 'overview' ? (
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Bảng điều khiển Gia sư</h1>
            ) : (
              // Đây là thanh tabs sau khi đã click
              <div className="flex-grow flex space-x-1 p-1 bg-gray-200 rounded-lg">
                {tabs.map(tab => (
                  <TabButton
                    key={tab.id}
                    id={tab.id as ViewMode}
                    label={tab.label}
                    viewMode={viewMode}
                    setViewMode={setViewMode}
                  />
                ))}
              </div>
            )}
            {/* Nút quay về Overview (biểu tượng lưới) */}
            {viewMode !== 'overview' && (
              <motion.button
                layoutId="overview-button" // Sẽ khớp với layoutId của một widget (nếu bạn muốn)
                onClick={() => setViewMode('overview')}
                className="ml-4 p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
                aria-label="Quay về tổng quan"
              >
                <AppstoreOutlined className="text-xl" />
              </motion.button>
            )}
          </motion.div>

          {/* Khu vực nội dung chính */}
          <div className="relative">
            {/* AnimatePresence để xử lý việc ra/vào của các component */}
            <AnimatePresence mode="wait">
              {viewMode === 'overview' && (
                <DashboardOverview setViewMode={setViewMode} tabs={tabs} />
              )}
              {viewMode === 'requests' && (
                <DetailView>
                  <PendingRequests requests={pendingRequestsData} onAccept={() => {}} onReject={() => {}} />
                </DetailView>
              )}
              {viewMode === 'appointments' && (
                <DetailView>
                  <UpcomingAppointments appointments={upcomingAppointmentsData} />
                </DetailView>
              )}
              {viewMode === 'availability' && (
                <DetailView>
                  <AvailabilityShortcut />
                </DetailView>
              )}
              {viewMode === 'students' && (
                <DetailView>
                  <StudentProgressLinks students={currentStudentsData} />
                </DetailView>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </LayoutGroup>
  )
}

// Component Nút Tab
const TabButton = ({ id, label, viewMode, setViewMode }: { id: ViewMode, label: string, viewMode: ViewMode, setViewMode: (view: ViewMode) => void }) => (
  <motion.button
    layoutId={`tab-${id}`} // layoutId khớp với widget
    key={id}
    onClick={() => setViewMode(id)}
    className={`relative py-1.5 px-4 text-sm font-medium rounded-md transition-colors ${
      viewMode === id ? 'text-gray-900' : 'text-gray-500 hover:text-gray-800'
    }`}
  >
    {viewMode === id && (
      // Đây là vệt màu trắng di chuyển phía sau nút active
      <motion.div
        layoutId="active-pill"
        className="absolute inset-0 bg-white rounded-md shadow-sm z-0"
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />
    )}
    <span className="relative z-10">{label}</span>
  </motion.button>
)

// Component Bọc Nội dung Chi tiết (để có hiệu ứng fade-in)
const DetailView = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
)

export default TutorDashboard