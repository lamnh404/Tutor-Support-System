import type { DepartmentCode, ExpertiseCode } from '~/utils/definitions.tsx'

export interface Certificate {
  id: string
  title: string
  description: string
  year: string
  type: string
}

export interface TutorProfileData {
  firstName: string
  lastName: string
  avatarUrl?: string
  department: DepartmentCode
  expertise: ExpertiseCode []
  ratingCount: number
  ratingAvg: number
  currMenteeCount: number
  maximumCapacity: number
  totalStudentTaught: number
  yearsOfExperience: number
  tutorDescription: string
  email: string
  phoneNumber: string
}