export interface DashboardStats {
  totalUsers: number
  totalTutors: number
  totalStudents: number
  totalDocuments: number
  totalAssignments: number
  totalSessions: number
  activeUsers: number
  completionRate: number
}

export interface ActivityLog {
  id: number
  user: string
  action: string
  timestamp: string
  type: 'success' | 'warning' | 'error' | 'info'
}

export interface UserDetail {
  id: number
  name: string
  email: string
  role: string
  department: string
  joinDate: string
  status: 'active' | 'inactive' | 'suspended'
  sessionsCount: number
  documentsUploaded: number
}