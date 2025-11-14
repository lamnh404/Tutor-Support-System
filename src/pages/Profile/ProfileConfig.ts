import { type Certificate } from '~/pages/TutorProfile/TutorProfileConfig.ts'
import type { DepartmentCode, ExpertiseCode } from '~/utils/definitions.tsx'


export interface UserInfo {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  department: DepartmentCode
  avatarUrl?: string
}

export interface StudentProfileType {
  studentID: string
  currentGPA: number
  learningGoals: string []
  studentDescription: string
  achievements: Certificate[]
}

export interface TutorProfileType {
  currMenteeCount: number
  maximumCapacity: number
  ratingAvg: number
  ratingCount: number
  totalStudentTaught: number
  yearsOfExperience: number
  expertise: ExpertiseCode []
  tutorDescription: string
  achievements: Certificate[]
}

