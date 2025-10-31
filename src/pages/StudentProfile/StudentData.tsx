import type { DepartmentCode } from '~/pages/TutorSearch/TutorDefinitions'

export interface Student {
  id: string
  firstName: string
  lastName: string
  username: string
  avatarUrl: string
  studentId: string // MSSV hoặc Student ID
  department: DepartmentCode
  year: number // Năm học (1, 2, 3, 4)
  gpa: number
  totalHoursLearned: number // Tổng số giờ đã học
  completedCourses: number // Số khóa học đã hoàn thành
  currentCourses: string[]
  needHelpWith: string[] // Môn học cần hỗ trợ
  learningGoals: string[]
  studyStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed'
  preferredFormat: 'online' | 'offline' | 'both'
  joinedDate: string
  isActive: boolean
  achievements: string[] // Thành tích đạt được
  skillLevel: 'beginner' | 'intermediate' | 'advanced' // Trình độ hiện tại
  tutorHistory: {
    tutorId: string
    tutorName: string
    subject: string
    rating: number
    comment: string
    date: string
  }[]
}

export const initialStudents: Student[] = [
  {
    id: 'student1',
    firstName: 'Minh',
    lastName: 'Nguyễn Văn',
    username: 'nguyenvanminh',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    studentId: '2152001',
    department: 'CS',
    year: 3,
    gpa: 3.65,
    totalHoursLearned: 245,
    completedCourses: 28,
    currentCourses: [
      'Phát triển ứng dụng Web',
      'Cơ sở dữ liệu nâng cao', 
      'Trí tuệ nhân tạo',
      'Kỹ thuật phần mềm',
      'Mạng máy tính',
      'Thực tập doanh nghiệp'
    ],
    needHelpWith: [
      'Machine Learning',
      'React.js',
      'Database Design',
      'Algorithms'
    ],
    learningGoals: [
      'Làm chủ Full-stack Development',
      'Chuẩn bị cho thực tập tại công ty công nghệ',
      'Tham gia các dự án mã nguồn mở',
      'Nâng GPA lên trên 3.7'
    ],
    studyStyle: 'mixed',
    preferredFormat: 'both',
    joinedDate: '2024-09-01',
    isActive: true,
    achievements: [
      'Top 10% lớp môn Lập trình Java',
      'Hoàn thành khóa học React cơ bản',
      'Tham gia hackathon HCMUT 2024',
      'Được scholarship học kỳ 2'
    ],
    skillLevel: 'intermediate',
    tutorHistory: [
      {
        tutorId: 'tutor1',
        tutorName: 'Lê Minh Si',
        subject: 'Data Science',
        rating: 5.0,
        comment: 'Giảng dạy rất dễ hiểu, có nhiều ví dụ thực tế. Giúp em hiểu sâu về machine learning.',
        date: '2024-10-15'
      },
      {
        tutorId: 'tutor2', 
        tutorName: 'Trần Văn Bạch',
        subject: 'Web Development',
        rating: 4.5,
        comment: 'Hướng dẫn chi tiết về React và Node.js. Rất kiên nhẫn khi giải thích.',
        date: '2024-09-20'
      },
      {
        tutorId: 'tutor3',
        tutorName: 'Nguyễn Thị Mai',
        subject: 'Algorithms',
        rating: 5.0,
        comment: 'Cô giảng bài rất hay, giải thuật phức tạp cũng trở nên dễ hiểu. Rất recommend!',
        date: '2024-08-10'
      },
      {
        tutorId: 'tutor4',
        tutorName: 'Phạm Minh Tuấn',
        subject: 'Database Design',
        rating: 4.0,
        comment: 'Anh hướng dẫn thiết kế database rất chi tiết, có nhiều case study thực tế.',
        date: '2024-07-25'
      },
      {
        tutorId: 'tutor5',
        tutorName: 'Lê Thị Hoa',
        subject: 'Software Engineering',
        rating: 5.0,
        comment: 'Chị dạy về quy trình phát triển phần mềm rất bài bản, giúp em chuẩn bị tốt cho dự án.',
        date: '2024-06-30'
      }
    ]
  },
  {
    id: 'student2',
    firstName: 'Hương',
    lastName: 'Phạm Thị',
    username: 'phamthihuong',
    avatarUrl: 'https://i.pravatar.cc/400?img=5',
    studentId: '2152045',
    department: 'EE',
    year: 2,
    gpa: 3.85,
    totalHoursLearned: 180,
    completedCourses: 15,
    currentCourses: [
      'Mạch điện tử',
      'Xử lý tín hiệu số',
      'Vi xử lý',
      'Toán cao cấp 3',
      'Vật lý điện tử'
    ],
    needHelpWith: [
      'Signal Processing',
      'Embedded Systems',
      'Circuit Analysis',
      'Mathematics'
    ],
    learningGoals: [
      'Thành thạo thiết kế mạch PCB',
      'Học lập trình vi điều khiển',
      'Tham gia nghiên cứu khoa học',
      'Đạt học bổng xuất sắc'
    ],
    studyStyle: 'visual',
    preferredFormat: 'offline',
    joinedDate: '2024-08-15',
    isActive: true,
    achievements: [
      'Giải Nhì cuộc thi Thiết kế mạch số',
      'Hoàn thành project Arduino thành công',
      'GPA 3.8+ liên tục 2 học kỳ',
      'Thành viên CLB Robotics HCMUT'
    ],
    skillLevel: 'beginner',
    tutorHistory: [
      {
        tutorId: 'tutor3',
        tutorName: 'Nguyễn Thanh Tùng',
        subject: 'Electronics',
        rating: 4.8,
        comment: 'Giải thích rất kỹ về mạch điện tử, có nhiều bài tập thực hành hay.',
        date: '2024-10-10'
      }
    ]
  },
  {
    id: 'student3',
    firstName: 'Đức',
    lastName: 'Lê Minh',
    username: 'leminhduc',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    studentId: '2152089',
    department: 'ME',
    year: 4,
    gpa: 3.45,
    totalHoursLearned: 320,
    completedCourses: 42,
    currentCourses: [
      'Đồ án tốt nghiệp',
      'Quản lý dự án',
      'Thiết kế máy nâng chuyển'
    ],
    needHelpWith: [
      'Project Management',
      'CAD Design',
      'Thermodynamics',
      'Thesis Writing'
    ],
    learningGoals: [
      'Hoàn thành đồ án tốt nghiệp xuất sắc',
      'Chuẩn bị phỏng vấn việc làm',
      'Nâng cao kỹ năng AutoCAD',
      'Học thêm về Industry 4.0'
    ],
    studyStyle: 'kinesthetic',
    preferredFormat: 'both',
    joinedDate: '2024-07-01',
    isActive: true,
    achievements: [
      'Hoàn thành 3 năm học với GPA 3.4+',
      'Thực tập tại công ty cơ khí 6 tháng',
      'Chứng chỉ AutoCAD Professional',
      'Leader nhóm đồ án chuyên ngành'
    ],
    skillLevel: 'advanced',
    tutorHistory: [
      {
        tutorId: 'tutor4',
        tutorName: 'Đơn Văn Giản',
        subject: 'Mechanical Design',
        rating: 4.2,
        comment: 'Hỗ trợ tốt trong việc thiết kế cơ khí, có kinh nghiệm thực tế.',
        date: '2024-09-25'
      },
      {
        tutorId: 'tutor5',
        tutorName: 'Phạm Ngọc Thạch',
        subject: 'CAD/AutoCAD',
        rating: 4.7,
        comment: 'Dạy AutoCAD rất chi tiết, từ cơ bản đến nâng cao.',
        date: '2024-08-30'
      }
    ]
  }
]