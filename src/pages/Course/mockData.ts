import type { User } from '~/context/User/userContext.tsx'
import type { Assignment, Availability, Document, Session } from '~/pages/Course/TypeDefinition.ts';

export const mockUserData: User = {
  username: 'cong.nguyen',
  firstName: 'Công',
  lastName: 'Nguyễn Thành',
  roles: ['TUTOR'],
  avatarUrl: undefined
}

export const mockDocuments: Document[] = [
  {
    id: 1,
    title: 'Công nghệ Phần mềm (CO3001)_Video',
    type: 'video',
    category: 'Bài giảng',
    uploadDate: '2025-10-15',
    size: '1.2 GB',
    views: 234,
    downloads: 145,
    author: 'Nguyễn Thành Công',
    description: 'Video bài giảng đầy đủ cho môn Công nghệ Phần mềm'
  },
  {
    id: 2,
    title: 'SE_Course Syllabus',
    type: 'pdf',
    category: 'Tài liệu',
    uploadDate: '2025-10-10',
    size: '2.5 MB',
    views: 456,
    downloads: 234,
    author: 'Nguyễn Thành Công',
    description: 'Đề cương chi tiết môn học'
  },
  {
    id: 3,
    title: 'Course Planning',
    type: 'link',
    category: 'Tài liệu',
    uploadDate: '2025-10-10',
    views: 189,
    author: 'Nguyễn Thành Công',
    url: 'https://planning.example.com'
  }
]

export const mockAssignments: Assignment[] = [
  {
    id: 1,
    title: 'Bài tập 1: Phân tích yêu cầu',
    description: 'Phân tích và viết tài liệu yêu cầu cho hệ thống quản lý thư viện',
    dueDate: '2025-10-30',
    status: 'active',
    submissions: 23,
    totalStudents: 45,
    points: 100,
    createdDate: '2025-10-15'
  },
  {
    id: 2,
    title: 'Bài tập 2: Thiết kế UML',
    description: 'Vẽ các biểu đồ UML cho hệ thống',
    dueDate: '2025-11-15',
    status: 'upcoming',
    submissions: 0,
    totalStudents: 45,
    points: 100,
    createdDate: '2025-10-20'
  }
]

export const mockAvailability: Availability[] = [
  { id: 1, day: 'Thứ Hai', startTime: '09:00', endTime: '12:00', type: 'both' },
  { id: 2, day: 'Thứ Hai', startTime: '14:00', endTime: '17:00', type: 'online' },
  { id: 3, day: 'Thứ Tư', startTime: '10:00', endTime: '15:00', type: 'in-person' },
  { id: 4, day: 'Thứ Sáu', startTime: '09:00', endTime: '13:00', type: 'both' }
]

export const mockSessions: Session[] = [
  {
    id: 1,
    studentName: 'Nguyễn Văn A',
    studentEmail: 'a.nguyen@student.hcmut.edu.vn',
    date: '2025-10-24',
    time: '10:00',
    duration: 60,
    type: 'online',
    status: 'confirmed',
    topic: 'Tư vấn đồ án giữa kỳ',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    notes: ''
  },
  {
    id: 2,
    studentName: 'Trần Thị B',
    studentEmail: 'b.tran@student.hcmut.edu.vn',
    date: '2025-10-24',
    time: '14:00',
    duration: 45,
    type: 'in-person',
    status: 'confirmed',
    topic: 'Hỏi đáp bài tập',
    location: 'H6-301',
    notes: ''
  },
  {
    id: 3,
    studentName: 'Lê Văn C',
    studentEmail: 'c.le@student.hcmut.edu.vn',
    date: '2025-10-25',
    time: '11:00',
    duration: 30,
    type: 'online',
    status: 'pending',
    topic: 'Review bài làm',
    meetingLink: 'https://meet.google.com/xyz-abcd-efg',
    notes: ''
  },
  {
    id: 4,
    studentName: 'Phạm Thị D',
    studentEmail: 'd.pham@student.hcmut.edu.vn',
    date: '2025-10-20',
    time: '09:30',
    duration: 60,
    type: 'in-person',
    status: 'completed',
    topic: 'Hướng dẫn làm đồ án',
    location: 'H6-301',
    notes: 'Sinh viên đã hiểu rõ yêu cầu. Cần theo dõi tiến độ tuần sau.'
  }
]

export const mockStudents = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0901234567',
    enrollDate: '2024-09-01',
    coursesEnrolled: 3,
    completedAssignments: 12,
    averageScore: 8.5,
    status: 'active',
    avatar: '👨‍🎓'
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'tranthib@email.com',
    phone: '0912345678',
    enrollDate: '2024-09-05',
    coursesEnrolled: 2,
    completedAssignments: 8,
    averageScore: 9.0,
    status: 'active',
    avatar: '👩‍🎓'
  },
  {
    id: 3,
    name: 'Lê Văn C',
    email: 'levanc@email.com',
    phone: '0923456789',
    enrollDate: '2024-08-20',
    coursesEnrolled: 4,
    completedAssignments: 15,
    averageScore: 7.8,
    status: 'active',
    avatar: '👨‍🎓'
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    email: 'phamthid@email.com',
    phone: '0934567890',
    enrollDate: '2024-09-10',
    coursesEnrolled: 2,
    completedAssignments: 6,
    averageScore: 8.2,
    status: 'inactive',
    avatar: '👩‍🎓'
  },
  {
    id: 5,
    name: 'Hoàng Văn E',
    email: 'hoangvane@email.com',
    phone: '0945678901',
    enrollDate: '2024-09-15',
    coursesEnrolled: 3,
    completedAssignments: 10,
    averageScore: 8.8,
    status: 'active',
    avatar: '👨‍🎓'
  }
]