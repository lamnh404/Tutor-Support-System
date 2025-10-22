// TutorData.tsx

import type { DepartmentCode, ExpertiseCode } from './TutorDefinitions'

export type Department = DepartmentCode;

export interface Tutor {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  department: DepartmentCode;
  expertise: ExpertiseCode[];
  rating_count: number;
  rating_avg: number;
  currMentee: number;
  maxMentee: number;
  description: string;
}