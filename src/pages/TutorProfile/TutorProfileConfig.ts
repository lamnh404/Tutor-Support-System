export const DEPARTMENTS = [
  { code: 'CS', name: 'Khoa học máy tính' },
  { code: 'EE', name: 'Điện - Điện tử' },
  { code: 'ME', name: 'Cơ khí' },
  { code: 'CE', name: 'Hóa học' }
]

export const EXPERTISE_OPTIONS = [
  { code: 'MACHINE_LEARNING', name: 'Học máy' },
  { code: 'ARTIFICIAL_INTELLIGENCE', name: 'Trí tuệ nhân tạo' },
  { code: 'CYBERSECURITY', name: 'An ninh mạng' },
  { code: 'WEB_DEVELOPMENT', name: 'Phát triển web' },
  { code: 'DATA_SCIENCE', name: 'Khoa học dữ liệu' }
]

export interface Certificate {
  id: string
  name: string
  issuer: string
  year: string
  icon: string
}

export interface TutorProfileData {
  id: string
  firstName: string
  lastName: string
  avatarUrl: string
  department: string
  expertise: string[]
  rating_count: number
  rating_avg: number
  currMentee: number
  maxMentee: number
  totalStudentsTaught: number
  yearsOfExperience: number
  description: string
  email: string
  phone: string
  certificates: Certificate[]
}