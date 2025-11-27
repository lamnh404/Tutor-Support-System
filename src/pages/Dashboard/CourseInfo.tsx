export interface TutorCourse {
  id: string;
  name: string;
  studentCount: number;
  isActive?: boolean;
  gradient: string;
}

export const myTaughtCourses: TutorCourse[] = [
  {
    id: 'course-1',
    name: 'Cấu trúc dữ liệu và giải thuật',
    studentCount: 32,
    isActive: true,
    gradient: 'from-blue-100 to-cyan-100'
  },
  {
    id: 'course-2',
    name: 'Mạng máy tính',
    studentCount: 28,
    isActive: false,
    gradient: 'from-green-100 to-teal-100'
  },
  {
    id: 'course-3',
    name: 'Vật lý 1',
    studentCount: 45,
    isActive: false,
    gradient: 'from-purple-100 to-indigo-100'
  }
]