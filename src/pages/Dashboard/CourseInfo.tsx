export interface TutorCourse {
  id: string;
  name: string;
  code: string;
  studentCount: number;
  lastActivity: string;
  hasNotification: boolean;
  gradient: string;
}

export const myTaughtCourses: TutorCourse[] = [
  {
    id: 'course-1',
    name: 'Cấu trúc dữ liệu và giải thuật',
    code: 'CO2003',
    studentCount: 32,
    lastActivity: '1 yêu cầu mới đang chờ',
    hasNotification: true,
    gradient: 'from-blue-100 to-cyan-100'
  },
  {
    id: 'course-2',
    name: 'Mạng máy tính',
    code: 'CO3005',
    studentCount: 28,
    lastActivity: 'Đã cập nhật tiến độ cho 2 học sinh',
    hasNotification: false,
    gradient: 'from-green-100 to-teal-100'
  },
  {
    id: 'course-3',
    name: 'Vật lý 1',
    code: 'ME1001',
    studentCount: 45,
    lastActivity: '3 lịch hẹn mới được xác nhận',
    hasNotification: true,
    gradient: 'from-purple-100 to-indigo-100'
  }
]