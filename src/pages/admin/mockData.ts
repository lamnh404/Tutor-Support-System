import { type User } from '~/context/User/userContext'
import { type DashboardStats, type ActivityLog, type UserDetail } from '~/pages/admin/TypeDefinition'

export const mockAdminData: User = {
  username: 'admin',
  firstName: 'Admin',
  lastName: 'System',
  roles: ['admin'],
  avatarUrl: undefined
}

export const dashboardStats: DashboardStats = {
  totalUsers: 1247,
  totalTutors: 89,
  totalStudents: 1158,
  totalDocuments: 3456,
  totalAssignments: 892,
  totalSessions: 2341,
  activeUsers: 987,
  completionRate: 87.5
}

export const monthlyData = [
  { month: 'T1', users: 800, sessions: 1200, documents: 450 },
  { month: 'T2', users: 850, sessions: 1400, documents: 520 },
  { month: 'T3', users: 920, sessions: 1650, documents: 580 },
  { month: 'T4', users: 1050, sessions: 1900, documents: 650 },
  { month: 'T5', users: 1150, sessions: 2100, documents: 720 },
  { month: 'T6', users: 1247, sessions: 2341, documents: 890 }
]

export const categoryData = [
  { name: 'Bài giảng', value: 45, color: '#6366f1' },
  { name: 'Tài liệu', value: 35, color: '#8b5cf6' },
  { name: 'Thông báo', value: 15, color: '#ec4899' },
  { name: 'Khác', value: 5, color: '#f59e0b' }
]

export const sessionTypeData = [
  { type: 'Trực tuyến', count: 1450 },
  { type: 'Trực tiếp', count: 891 }
]

export const activityLogs: ActivityLog[] = [
  { id: 1, user: 'Nguyễn Văn A', action: 'Đăng tài liệu mới: "Công nghệ phần mềm - Chương 5"', timestamp: '5 phút trước', type: 'success' },
  { id: 2, user: 'Trần Thị B', action: 'Tạo bài tập mới: "Thiết kế hệ thống"', timestamp: '12 phút trước', type: 'info' },
  { id: 3, user: 'Lê Văn C', action: 'Xác nhận buổi tư vấn với sinh viên', timestamp: '25 phút trước', type: 'success' },
  { id: 4, user: 'Phạm Thị D', action: 'Cảnh báo: Đăng nhập thất bại nhiều lần', timestamp: '1 giờ trước', type: 'warning' },
  { id: 5, user: 'Hoàng Văn E', action: 'Xóa tài liệu: "File cũ"', timestamp: '2 giờ trước', type: 'error' }
]

export const recentUsers: UserDetail[] = [
  { id: 1, name: 'Nguyễn Văn A', email: 'a.nguyen@hcmut.edu.vn', role: 'Tutor', department: 'KHMT', joinDate: '2025-01-15', status: 'active', sessionsCount: 45, documentsUploaded: 23 },
  { id: 2, name: 'Trần Thị B', email: 'b.tran@hcmut.edu.vn', role: 'Student', department: 'KHMT', joinDate: '2025-02-20', status: 'active', sessionsCount: 12, documentsUploaded: 0 },
  { id: 3, name: 'Lê Văn C', email: 'c.le@hcmut.edu.vn', role: 'Tutor', department: 'ĐTVT', joinDate: '2024-09-10', status: 'active', sessionsCount: 67, documentsUploaded: 45 },
  { id: 4, name: 'Phạm Thị D', email: 'd.pham@hcmut.edu.vn', role: 'Student', department: 'CK', joinDate: '2025-03-05', status: 'inactive', sessionsCount: 8, documentsUploaded: 0 },
  { id: 5, name: 'Hoàng Văn E', email: 'e.hoang@hcmut.edu.vn', role: 'Tutor', department: 'XD', joinDate: '2024-11-22', status: 'active', sessionsCount: 34, documentsUploaded: 19 }
]