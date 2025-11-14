import type { DepartmentCode } from '~/utils/definitions.tsx'
import { type Certificate } from '~/pages/TutorProfile/TutorProfileConfig.ts'

export interface StudentProfileData {
  firstName: string
  lastName: string
  avatarUrl?: string
  department: DepartmentCode
  email: string
  phoneNumber: string
  studentID: string
  currentGPA: number
  learningGoals: string[]
  studentDescription: string
}

export type { Certificate }
