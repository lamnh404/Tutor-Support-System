export const DEPARTMENT_CODES = ['CS', 'CE', 'EE', 'ME', 'CH'] as const

export type DepartmentCode = typeof DEPARTMENT_CODES[number];

export const DEPARTMENTS: { code: DepartmentCode; name: string }[] = [
  { code: 'CS', name: 'Khoa học Máy tính' },
  { code: 'CE', name: 'Kỹ thuật Máy tính' },
  { code: 'EE', name: 'Kỹ thuật Điện - Điện tử' },
  { code: 'ME', name: 'Kỹ thuật Cơ khí' },
  { code: 'CH', name: 'Kỹ thuật Hóa học' }
]

export const EXPERTISE_CODES = [
  // CSE
  'MACHINE_LEARNING',
  'SOFTWARE_ENGINEERING',
  'DATA_SCIENCE',
  'ARTIFICIAL_INTELLIGENCE',
  'CYBERSECURITY',
  'WEB_DEVELOPMENT',
  'MOBILE_DEVELOPMENT',
  'DATABASE_DESIGN',
  'ALGORITHMS',
  'COMPUTER_NETWORKS',
  // EEE
  'EMBEDDED_SYSTEMS',
  'SIGNAL_PROCESSING',
  'CONTROL_SYSTEMS',
  // MECH & CHE
  'THERMODYNAMICS',
  'MECHANICAL_DESIGN',
  'PROCESS_ENGINEERING',
  'MATERIALS_SCIENCE'
] as const

export type ExpertiseCode = typeof EXPERTISE_CODES[number];

export const EXPERTISES: { code: ExpertiseCode; name: string }[] = [
  { code: 'MACHINE_LEARNING', name: 'Học máy' },
  { code: 'SOFTWARE_ENGINEERING', name: 'Kỹ thuật phần mềm' },
  { code: 'DATA_SCIENCE', name: 'Khoa học dữ liệu' },
  { code: 'ARTIFICIAL_INTELLIGENCE', name: 'Trí tuệ nhân tạo' },
  { code: 'CYBERSECURITY', name: 'An ninh mạng' },
  { code: 'WEB_DEVELOPMENT', name: 'Phát triển web' },
  { code: 'MOBILE_DEVELOPMENT', name: 'Phát triển di động' },
  { code: 'DATABASE_DESIGN', name: 'Thiết kế cơ sở dữ liệu' },
  { code: 'ALGORITHMS', name: 'Thuật toán' },
  { code: 'COMPUTER_NETWORKS', name: 'Mạng máy tính' },
  { code: 'EMBEDDED_SYSTEMS', name: 'Hệ thống nhúng' },
  { code: 'SIGNAL_PROCESSING', name: 'Xử lý tín hiệu' },
  { code: 'CONTROL_SYSTEMS', name: 'Hệ thống điều khiển' },
  { code: 'THERMODYNAMICS', name: 'Nhiệt động lực học' },
  { code: 'MECHANICAL_DESIGN', name: 'Thiết kế cơ khí' },
  { code: 'PROCESS_ENGINEERING', name: 'Công nghệ chế biến' },
  { code: 'MATERIALS_SCIENCE', name: 'Khoa học vật liệu' }
]

export const DEPARTMENT_EXPERTISE_MAP: Record<DepartmentCode, ExpertiseCode[]> = {
  CS: ['MACHINE_LEARNING', 'SOFTWARE_ENGINEERING', 'DATA_SCIENCE', 'ARTIFICIAL_INTELLIGENCE', 'WEB_DEVELOPMENT', 'MOBILE_DEVELOPMENT', 'DATABASE_DESIGN', 'ALGORITHMS'],
  CE: ['CYBERSECURITY', 'COMPUTER_NETWORKS', 'EMBEDDED_SYSTEMS', 'DATABASE_DESIGN', 'ALGORITHMS'],
  EE: ['EMBEDDED_SYSTEMS', 'SIGNAL_PROCESSING', 'CONTROL_SYSTEMS', 'COMPUTER_NETWORKS'],
  ME: ['THERMODYNAMICS', 'MECHANICAL_DESIGN', 'CONTROL_SYSTEMS'],
  CH: ['PROCESS_ENGINEERING', 'MATERIALS_SCIENCE', 'THERMODYNAMICS']
}

export interface Notification {
  id: string
  type: string
  title: string
  content: string
  timestamp: string
  isRead: boolean
  [key: string]: unknown
}

export const NOTIFICATION_TYPES = [
  'CONNECTION_REQUEST',
  'CONNECTION_ACCEPTED',
  'CONNECTION_REJECTED',
  'NEW_MESSAGE',
  'BOOKING_CREATED',
  'BOOKING_CANCELLED',
  'BOOKING_COMPLETED',
  'ASSIGNMENT_CREATED',
  'ASSIGNMENT_GRADED',
  'REVIEW_RECEIVED',
  'SYSTEM_INFO'
] as const

export type NotificationType = typeof NOTIFICATION_TYPES[number];