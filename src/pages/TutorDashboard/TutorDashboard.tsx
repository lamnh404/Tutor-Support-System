// src/pages/TutorDashboard/TutorDashboard.tsx
import React from 'react' // Assuming you might add state later for accept/reject
import PendingRequests from './PendingRequests'
import UpcomingAppointments from './UpcomingAppointments'
import AvailabilityShortcut from './AvailabilityShortcut'
import StudentProgressLinks from './StudentProgressLinks'
import {
  pendingRequestsData,
  upcomingAppointmentsData,
  currentStudentsData
} from './TutorDashboardData'

const TutorDashboard: React.FC = () => {

  //   Placeholder handlers for request actions
  const handleAcceptRequest = (requestId: string) => {
    console.log('Accepted request:', requestId)
  }

  const handleRejectRequest = (requestId: string) => {
    console.log('Rejected request:', requestId)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">

        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Bảng điều khiển Gia sư</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <PendingRequests
              requests={pendingRequestsData}
              onAccept={handleAcceptRequest}
              onReject={handleRejectRequest}
            />
          </div>
          <div className="flex flex-col justify-center">
            <AvailabilityShortcut />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <UpcomingAppointments appointments={upcomingAppointmentsData} />
          <StudentProgressLinks students={currentStudentsData} />
        </div>

      </div>
    </div>
  )
}

export default TutorDashboard