import type { User } from '~/context/User/userContext.tsx'
import { type ActiveTab, type DocumentType, type SessionStatus, type Tab } from '~/pages/Course/TypeDefinition'
import { BookOpen, Calendar, FileText, Users } from 'lucide-react'

export const getInitials = (user: User): string => {
  return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
}

export const getFullName = (user: User): string => {
  return `${user.lastName} ${user.firstName}`
}

export const isTutor = (user: User): boolean => {
  return user.roles.includes('TUTOR')
}

export const getStatusColor = (status: SessionStatus): string => {
  switch (status) {
  case 'confirmed': return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700'
  case 'pending': return 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700'
  case 'completed': return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700'
  case 'cancelled': return 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700'
  default: return 'bg-gray-100 text-gray-700'
  }
}

export const getTypeIcon = (type: DocumentType): string => {
  switch (type) {
  case 'video': return '🎥'
  case 'pdf': return '📄'
  case 'document': return '📝'
  case 'link': return '🔗'
  default: return '📁'
  }
}

export const Tabs: Tab[] = [
  { id: 'documents' as ActiveTab, label: 'Tài liệu & Bài giảng', icon: BookOpen, gradient: 'from-blue-500 to-cyan-500' },
  { id: 'assignments' as ActiveTab, label: 'Bài tập', icon: FileText, gradient: 'from-purple-500 to-pink-500' },
  { id: 'sessions' as ActiveTab, label: 'Buổi tư vấn', icon: Users, gradient: 'from-green-500 to-emerald-500' },
  { id: 'availability' as ActiveTab, label: 'Lịch trống', icon: Calendar, gradient: 'from-orange-500 to-red-500' }
]

