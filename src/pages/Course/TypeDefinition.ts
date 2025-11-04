import * as react from 'react'
import type { LucideProps } from 'lucide-react'


export type ActiveTab = 'documents' | 'assignments' | 'sessions' | 'availability' | 'students';

export type DocumentType = 'video' | 'pdf' | 'document' | 'link';

export type DocumentCategory = 'Bài giảng' | 'Tài liệu';

export type AssignmentStatus = 'active' | 'upcoming' | 'closed';

export type AvailabilityType = 'both' | 'online' | 'in-person';

export type DayOfWeek = 'Thứ Hai' | 'Thứ Ba' | 'Thứ Tư' | 'Thứ Năm' | 'Thứ Sáu' | 'Thứ Bảy' | 'Chủ Nhật';

export type SessionType = 'online' | 'in-person';

export type SessionStatus = 'confirmed' | 'pending' | 'completed' | 'cancelled';

export const daysOfWeek: DayOfWeek[] = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật']

export interface Document {
  id: number;
  title: string;
  type: DocumentType;
  category: DocumentCategory;
  uploadDate: string;
  size?: string;
  views: number;
  downloads?: number;
  author: string;
  description?: string;
  url?: string;
}

export interface Assignment {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: AssignmentStatus;
  submissions: number;
  totalStudents: number;
  points: number;
  createdDate: string;
}

export interface Availability {
  id: number;
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  type: AvailabilityType;
}

export interface Session {
  id: number;
  studentName: string;
  studentEmail: string;
  date: string;
  time: string;
  duration: number;
  type: SessionType;
  status: SessionStatus;
  topic: string;
  meetingLink?: string;
  location?: string;
  notes: string;
}

export interface NewDocumentState {
  title: string;
  type: DocumentType;
  category: DocumentCategory;
  description: string;
  file: File | null;
  url?: string;
}

export interface NewAssignmentState {
  title: string;
  description: string;
  dueDate: string;
  points: number;
}

export interface NewAvailabilityState {
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  type: AvailabilityType;
}

export interface Tab{
  id: ActiveTab
  label: string
  icon: react.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & react.RefAttributes<SVGSVGElement>>
  gradient: string
}