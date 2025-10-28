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
    // Add logic here to update backend and remove from pendingRequestsData state
  }

  const handleRejectRequest = (requestId: string) => {
    console.log('Rejected request:', requestId)
    // Add logic here to update backend and remove from pendingRequestsData state
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Bảng điều khiển Gia sư</h1>

        {/* Top Row: Requests and Availability */}
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

        {/* Bottom Row: Appointments and Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <UpcomingAppointments appointments={upcomingAppointmentsData} />
          <StudentProgressLinks students={currentStudentsData} />
        </div>

      </div>
    </div>
  )
}

export default TutorDashboard