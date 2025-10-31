// src/pages/TutorDashboard/TutorDashboardData.tsx

export interface PendingRequest {
  id: string;
  studentName: string;
  studentAvatar: string;
  message?: string;
  requestDate: Date;
}

export interface UpcomingAppointment {
  id: string;
  studentName: string;
  studentAvatar: string;
  dateTime: Date;
  location: string;
  subject: string;
  description?: string; // Add description field
}

export interface CurrentStudent {
  id: string;
  studentName: string;
  studentAvatar: string;
  subject: string;
  lastUpdate?: Date;
}

export const pendingRequestsData: PendingRequest[] = [
  { id: 'req1', studentName: 'Nguyễn Văn An', studentAvatar: 'https://randomuser.me/api/portraits/men/32.jpg', message: 'Em muốn học về Thuật toán ạ.', requestDate: new Date('2025-10-27T10:00:00') },
  { id: 'req2', studentName: 'Trần Thị Bình', studentAvatar: 'https://randomuser.me/api/portraits/women/44.jpg', requestDate: new Date('2025-10-28T09:15:00') }
]

export const upcomingAppointmentsData: UpcomingAppointment[] = [
  { id: 'app1', studentName: 'Lê Văn Cường', studentAvatar: 'https://randomuser.me/api/portraits/men/34.jpg', dateTime: new Date('2025-10-29T15:30:00'), location: 'Google Meet ID: xyz-abc-def', subject: 'Mạng máy tính', description: 'Ôn tập về mô hình TCP/IP.' },
  { id: 'app2', studentName: 'Phạm Thị Dung', studentAvatar: 'https://randomuser.me/api/portraits/women/68.jpg', dateTime: new Date('2025-10-30T14:00:00'), location: 'Phòng H1-202', subject: 'Vật lý 1', description: 'Giải đáp bài tập chương 3.' },
  { id: 'app3', studentName: 'Lê Văn Cường', studentAvatar: 'https://randomuser.me/api/portraits/men/34.jpg', dateTime: new Date('2025-11-01T10:00:00'), location: 'Google Meet ID: xyz-abc-def', subject: 'Mạng máy tính', description: 'Hướng dẫn bài tập lớn.' }
].sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime())

export const currentStudentsData: CurrentStudent[] = [
  { id: 's3', studentName: 'Lê Văn Cường', studentAvatar: 'https://randomuser.me/api/portraits/men/34.jpg', subject: 'Mạng máy tính', lastUpdate: new Date('2025-10-25T11:00:00') },
  { id: 's4', studentName: 'Phạm Thị Dung', studentAvatar: 'https://randomuser.me/api/portraits/women/68.jpg', subject: 'Vật lý 1' },
  { id: 's5', studentName: 'Hoàng Văn E', studentAvatar: 'https://randomuser.me/api/portraits/men/55.jpg', subject: 'Cấu trúc dữ liệu', lastUpdate: new Date('2025-10-26T16:30:00') }
]