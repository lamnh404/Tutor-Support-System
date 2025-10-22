import React, { useState, ChangeEvent } from 'react'
import {
  Calendar, Clock, Video, MapPin, Edit, Trash2, Plus, Check, X,
  Mail, Search, Upload, Download,
  BookOpen, FileText, Users, Star, Eye, MoreVertical
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import type { User } from '~/context/userContext.tsx'
// --- Type Definitions ---

type DocumentType = 'video' | 'pdf' | 'document' | 'link';
type DocumentCategory = 'Bài giảng' | 'Tài liệu' | 'Thông báo';

interface Document {
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

type AssignmentStatus = 'active' | 'upcoming' | 'closed';

interface Assignment {
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

type AvailabilityType = 'both' | 'online' | 'in-person';
type DayOfWeek = 'Thứ Hai' | 'Thứ Ba' | 'Thứ Tư' | 'Thứ Năm' | 'Thứ Sáu' | 'Thứ Bảy' | 'Chủ Nhật';

interface Availability {
  id: number;
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  type: AvailabilityType;
}

type SessionType = 'online' | 'in-person';
type SessionStatus = 'confirmed' | 'pending' | 'completed' | 'cancelled';

interface Session {
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

const mockUserData: User = {
  email: 'cong.nguyen@hcmut.edu.vn',
  firstName: 'Công',
  lastName: 'Nguyễn Thành',
  roles: ['TUTOR'],
  avatarUrl: undefined
}

const mockDocuments: Document[] = [
  {
    id: 1,
    title: 'Công nghệ Phần mềm (CO3001)_Video',
    type: 'video',
    category: 'Bài giảng',
    uploadDate: '2025-10-15',
    size: '1.2 GB',
    views: 234,
    downloads: 145,
    author: 'Nguyễn Thành Công',
    description: 'Video bài giảng đầy đủ cho môn Công nghệ Phần mềm'
  },
  {
    id: 2,
    title: 'SE_Course Syllabus',
    type: 'pdf',
    category: 'Tài liệu',
    uploadDate: '2025-10-10',
    size: '2.5 MB',
    views: 456,
    downloads: 234,
    author: 'Nguyễn Thành Công',
    description: 'Đề cương chi tiết môn học'
  },
  {
    id: 3,
    title: 'Course Planning',
    type: 'link',
    category: 'Tài liệu',
    uploadDate: '2025-10-10',
    views: 189,
    author: 'Nguyễn Thành Công',
    url: 'https://planning.example.com'
  },
  {
    id: 4,
    title: 'Thông báo - Blended Learning',
    type: 'document',
    category: 'Thông báo',
    uploadDate: '2025-09-24',
    size: '850 KB',
    views: 345,
    downloads: 123,
    author: 'Nguyễn Thành Công'
  }
]

const mockAssignments: Assignment[] = [
  {
    id: 1,
    title: 'Bài tập 1: Phân tích yêu cầu',
    description: 'Phân tích và viết tài liệu yêu cầu cho hệ thống quản lý thư viện',
    dueDate: '2025-10-30',
    status: 'active',
    submissions: 23,
    totalStudents: 45,
    points: 100,
    createdDate: '2025-10-15'
  },
  {
    id: 2,
    title: 'Bài tập 2: Thiết kế UML',
    description: 'Vẽ các biểu đồ UML cho hệ thống',
    dueDate: '2025-11-15',
    status: 'upcoming',
    submissions: 0,
    totalStudents: 45,
    points: 100,
    createdDate: '2025-10-20'
  }
]

const mockAvailability: Availability[] = [
  { id: 1, day: 'Thứ Hai', startTime: '09:00', endTime: '12:00', type: 'both' },
  { id: 2, day: 'Thứ Hai', startTime: '14:00', endTime: '17:00', type: 'online' },
  { id: 3, day: 'Thứ Tư', startTime: '10:00', endTime: '15:00', type: 'in-person' },
  { id: 4, day: 'Thứ Sáu', startTime: '09:00', endTime: '13:00', type: 'both' }
]

const mockSessions: Session[] = [
  {
    id: 1,
    studentName: 'Nguyễn Văn A',
    studentEmail: 'a.nguyen@student.hcmut.edu.vn',
    date: '2025-10-24',
    time: '10:00',
    duration: 60,
    type: 'online',
    status: 'confirmed',
    topic: 'Tư vấn đồ án giữa kỳ',
    meetingLink: 'https://meet.google.com/abc-defg-hij',
    notes: ''
  },
  {
    id: 2,
    studentName: 'Trần Thị B',
    studentEmail: 'b.tran@student.hcmut.edu.vn',
    date: '2025-10-24',
    time: '14:00',
    duration: 45,
    type: 'in-person',
    status: 'confirmed',
    topic: 'Hỏi đáp bài tập',
    location: 'H6-301',
    notes: ''
  },
  {
    id: 3,
    studentName: 'Lê Văn C',
    studentEmail: 'c.le@student.hcmut.edu.vn',
    date: '2025-10-25',
    time: '11:00',
    duration: 30,
    type: 'online',
    status: 'pending',
    topic: 'Review bài làm',
    meetingLink: 'https://meet.google.com/xyz-abcd-efg',
    notes: ''
  },
  {
    id: 4,
    studentName: 'Phạm Thị D',
    studentEmail: 'd.pham@student.hcmut.edu.vn',
    date: '2025-10-20',
    time: '09:30',
    duration: 60,
    type: 'in-person',
    status: 'completed',
    topic: 'Hướng dẫn làm đồ án',
    location: 'H6-301',
    notes: 'Sinh viên đã hiểu rõ yêu cầu. Cần theo dõi tiến độ tuần sau.'
  }
]

const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const gridItemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
}

const tabContentVariants = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -10, opacity: 0 },
  transition: { duration: 0.2 }
}

const modalBackdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

const modalPanelVariants = {
  initial: { scale: 0.9, opacity: 0, y: 50 },
  animate: { scale: 1, opacity: 1, y: 0 },
  exit: { scale: 0.9, opacity: 0, y: 50 },
  transition: { type: 'spring', stiffness: 300, damping: 30 }
}

// --- Component State Types ---

type ActiveTab = 'documents' | 'assignments' | 'sessions' | 'availability';

interface NewDocumentState {
  title: string;
  type: DocumentType;
  category: DocumentCategory;
  description: string;
}

interface NewAssignmentState {
  title: string;
  description: string;
  dueDate: string;
  points: number;
}

interface NewAvailabilityState {
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  type: AvailabilityType;
}

// --- Utility Functions ---

const getInitials = (user: User): string => {
  return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
}

const getFullName = (user: User): string => {
  return `${user.lastName} ${user.firstName}`
}

const isTutor = (user: User): boolean => {
  return user.roles.includes('TUTOR')
}

const TutorCommunityPlatform: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('documents')
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false)
  const [showAssignmentModal, setShowAssignmentModal] = useState<boolean>(false)
  const [showAvailabilityModal, setShowAvailabilityModal] = useState<boolean>(false)
  const [showSessionModal, setShowSessionModal] = useState<boolean>(false)

  const [documents, setDocuments] = useState<Document[]>(mockDocuments)
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments)
  const [availability, setAvailability] = useState<Availability[]>(mockAvailability)
  const [sessions, setSessions] = useState<Session[]>(mockSessions)
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)

  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filterCategory, setFilterCategory] = useState<string>('all')

  const [newDocument, setNewDocument] = useState<NewDocumentState>({
    title: '',
    type: 'pdf',
    category: 'Tài liệu',
    description: ''
  })

  const [newAssignment, setNewAssignment] = useState<NewAssignmentState>({
    title: '',
    description: '',
    dueDate: '',
    points: 100
  })

  const [newAvailability, setNewAvailability] = useState<NewAvailabilityState>({
    day: 'Thứ Hai',
    startTime: '09:00',
    endTime: '17:00',
    type: 'both'
  })

  const daysOfWeek: DayOfWeek[] = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật']

  const handleUploadDocument = () => {
    if (!isTutor(mockUserData)) {
      toast.error('Chỉ giảng viên mới có thể đăng tài liệu!')
      return
    }
    const doc: Document = {
      id: Date.now(),
      ...newDocument,
      uploadDate: new Date().toISOString().split('T')[0],
      views: 0,
      downloads: newDocument.type === 'link' ? undefined : 0,
      author: getFullName(mockUserData),
      size: '1.5 MB'
    }
    setDocuments([doc, ...documents])
    setShowUploadModal(false)
    setNewDocument({ title: '', type: 'pdf', category: 'Tài liệu', description: '' })
    toast.success('Đăng tài liệu thành công!')
  }

  const handleCreateAssignment = () => {
    if (!isTutor(mockUserData)) {
      toast.error('Chỉ giảng viên mới có thể tạo bài tập!')
      return
    }
    const assignment: Assignment = {
      id: Date.now(),
      ...newAssignment,
      status: 'active',
      submissions: 0,
      totalStudents: 45,
      createdDate: new Date().toISOString().split('T')[0]
    }
    setAssignments([assignment, ...assignments])
    setShowAssignmentModal(false)
    setNewAssignment({ title: '', description: '', dueDate: '', points: 100 })
    toast.success('Tạo bài tập thành công!')
  }

  const handleAddAvailability = () => {
    if (!isTutor(mockUserData)) {
      toast.error('Chỉ giảng viên mới có thể thêm lịch trống!')
      return
    }
    setAvailability([...availability, { ...newAvailability, id: Date.now() }])
    setShowAvailabilityModal(false)
    setNewAvailability({ day: 'Thứ Hai', startTime: '09:00', endTime: '17:00', type: 'both' })
    toast.success('Đã thêm lịch trống!')
  }

  const handleSessionAction = (sessionId: number, action: SessionStatus) => {
    if (!isTutor(mockUserData)) {
      toast.error('Chỉ giảng viên mới có thể quản lý buổi tư vấn!')
      return
    }
    setSessions(sessions.map(s =>
      s.id === sessionId ? { ...s, status: action, notes: action === 'completed' && selectedSession ? selectedSession.notes : s.notes } : s
    ))

    if (action === 'confirmed') toast.success('Đã xác nhận buổi tư vấn!')
    if (action === 'cancelled') toast.error('Đã từ chối buổi tư vấn')
    if (action === 'completed') toast.success('Buổi tư vấn đã hoàn thành!')

    setShowSessionModal(false)
    setSelectedSession(null)
  }

  const getStatusColor = (status: SessionStatus): string => {
    switch (status) {
    case 'confirmed': return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700'
    case 'pending': return 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700'
    case 'completed': return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-700'
    case 'cancelled': return 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700'
    default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeIcon = (type: DocumentType): string => {
    switch (type) {
    case 'video': return '🎥'
    case 'pdf': return '📄'
    case 'document': return '📝'
    case 'link': return '🔗'
    default: return '📁'
    }
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterCategory === 'all' || doc.category === filterCategory
    return matchesSearch && matchesFilter
  })

  const handleNewDocChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewDocument(prev => ({ ...prev, [name]: value }))
  }

  const handleNewDocSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewDocument(prev => ({ ...prev, [name]: value as DocumentType | DocumentCategory }))
  }

  const handleNewAssignmentChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewAssignment(prev => ({
      ...prev,
      [name]: name === 'points' ? parseInt(value) || 0 : value
    }))
  }

  const handleNewAvailabilityChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewAvailability(prev => ({
      ...prev,
      [name]: value as DayOfWeek | AvailabilityType | string
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Header */}
      <div className="relative bg-white/80 backdrop-blur-md border-b-2 border-indigo-100 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center space-x-4">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6, type: 'spring' }}
              className="w-16 h-16 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-xl ring-4 ring-indigo-100"
            >
              {mockUserData.avatarUrl ? (
                <img src={mockUserData.avatarUrl} alt="Avatar" className="w-full h-full rounded-2xl object-cover" />
              ) : (
                getInitials(mockUserData)
              )}
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {getFullName(mockUserData)}
              </h1>
              <p className="text-sm text-gray-600 flex items-center space-x-2 mt-1">
                <Mail className="w-3 h-3" />
                <span>{mockUserData.email}</span>
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-indigo-700 rounded-full text-xs font-bold shadow-sm"
                >
                  👨‍🏫 Gia sư
                </motion.span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="relative bg-white/70 backdrop-blur-md border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-2 overflow-x-auto">
            {[
              { id: 'documents', label: 'Tài liệu & Bài giảng', icon: BookOpen, gradient: 'from-blue-500 to-cyan-500' },
              { id: 'assignments', label: 'Bài tập', icon: FileText, gradient: 'from-purple-500 to-pink-500' },
              { id: 'sessions', label: 'Buổi tư vấn', icon: Users, gradient: 'from-green-500 to-emerald-500' },
              { id: 'availability', label: 'Lịch trống', icon: Calendar, gradient: 'from-orange-500 to-red-500' }
            ].map(tab => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ActiveTab)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`relative py-4 px-4 font-medium text-sm flex items-center space-x-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${tab.gradient} rounded-t-full`}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <motion.div key="documents" {...tabContentVariants} className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <motion.h2
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Tài liệu & Bài giảng
                </motion.h2>
                {isTutor(mockUserData) && (
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(99, 102, 241, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowUploadModal(true)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:via-indigo-600 hover:to-purple-700 flex items-center space-x-2 shadow-lg font-semibold"
                  >
                    <Upload className="w-5 h-5" />
                    <span>Đăng tài liệu</span>
                  </motion.button>
                )}
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm tài liệu..."
                    value={searchTerm}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-indigo-100 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 bg-white/80 backdrop-blur-sm transition-all"
                  />
                </div>
                <select
                  value={filterCategory}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilterCategory(e.target.value)}
                  className="px-5 py-3 border-2 border-indigo-100 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 bg-white/80 backdrop-blur-sm font-medium transition-all"
                >
                  <option value="all">📚 Tất cả danh mục</option>
                  <option value="Bài giảng">🎓 Bài giảng</option>
                  <option value="Tài liệu">📖 Tài liệu</option>
                  <option value="Thông báo">📢 Thông báo</option>
                </select>
              </div>

              {/* Documents Grid */}
              {filteredDocuments.length > 0 ? (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={gridContainerVariants}
                  initial="hidden"
                  animate="show"
                >
                  {filteredDocuments.map(doc => (
                    <motion.div
                      key={doc.id}
                      variants={gridItemVariants}
                      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-indigo-50 p-6 cursor-pointer overflow-hidden relative group"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100/50 to-purple-100/50 rounded-full blur-2xl -z-10 group-hover:scale-150 transition-transform duration-500" />

                      <div className="flex items-start justify-between mb-4">
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          className="text-5xl"
                        >
                          {getTypeIcon(doc.type)}
                        </motion.div>
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 90 }}
                          className="p-2 hover:bg-indigo-50 rounded-lg transition"
                        >
                          <MoreVertical className="w-5 h-5 text-gray-400" />
                        </motion.button>
                      </div>

                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 h-14 text-lg">{doc.title}</h3>

                      {doc.description && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2 h-10">{doc.description}</p>
                      )}

                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className="px-3 py-1.5 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full font-bold"
                        >
                          {doc.category}
                        </motion.span>
                        <span className="text-gray-400 font-medium">{doc.uploadDate}</span>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t-2 border-indigo-50">
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center space-x-1.5">
                            <Eye className="w-4 h-4 text-blue-500" />
                            <span className="font-semibold">{doc.views}</span>
                          </span>
                          {doc.downloads !== undefined && (
                            <span className="flex items-center space-x-1.5">
                              <Download className="w-4 h-4 text-green-500" />
                              <span className="font-semibold">{doc.downloads}</span>
                            </span>
                          )}
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 shadow-md"
                        >
                          <Download className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center p-16 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-dashed border-indigo-200"
                >
                  <FileText className="w-20 h-20 text-indigo-300 mb-4" />
                  <h3 className="text-xl font-bold text-gray-700">Không tìm thấy tài liệu</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {searchTerm
                      ? 'Hãy thử tìm kiếm với từ khoá khác.'
                      : 'Chưa có tài liệu nào trong danh mục này.'}
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Assignments Tab */}
          {activeTab === 'assignments' && (
            <motion.div key="assignments" {...tabContentVariants} className="space-y-6">
              <div className="flex justify-between items-center">
                <motion.h2
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                >
                  Quản lý Bài tập
                </motion.h2>
                {isTutor(mockUserData) && (
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(147, 51, 234, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAssignmentModal(true)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white rounded-xl hover:from-purple-600 hover:via-pink-600 hover:to-rose-600 flex items-center space-x-2 shadow-lg font-semibold"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Tạo bài tập mới</span>
                  </motion.button>
                )}
              </div>

              <motion.div
                className="grid gap-5"
                variants={gridContainerVariants}
                initial="hidden"
                animate="show"
              >
                {assignments.map(assignment => (
                  <motion.div
                    key={assignment.id}
                    variants={gridItemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-purple-50 p-6 hover:shadow-xl transition-all relative overflow-hidden group"
                  >
                    <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-purple-100/50 to-pink-100/50 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-500" />

                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{assignment.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 leading-relaxed">{assignment.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-2 rounded-lg"
                          >
                            <Calendar className="w-4 h-4 text-blue-500" />
                            <span className="font-medium">Hạn: {assignment.dueDate}</span>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center space-x-2 bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-2 rounded-lg"
                          >
                            <FileText className="w-4 h-4 text-green-500" />
                            <span className="font-medium">{assignment.submissions}/{assignment.totalStudents} bài nộp</span>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center space-x-2 bg-gradient-to-r from-yellow-50 to-amber-50 px-3 py-2 rounded-lg"
                          >
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="font-medium">{assignment.points} điểm</span>
                          </motion.div>
                        </div>
                      </div>
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold shadow-md ${
                          assignment.status === 'active' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' :
                            assignment.status === 'upcoming' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' :
                              'bg-gradient-to-r from-gray-400 to-slate-400 text-white'
                        }`}
                      >
                        {assignment.status === 'active' ? '✓ Đang mở' :
                          assignment.status === 'upcoming' ? '⏰ Sắp mở' : '🔒 Đã đóng'}
                      </motion.span>
                    </div>

                    <div className="flex items-center space-x-3 pt-4 border-t-2 border-purple-50">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 px-5 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition text-sm font-bold shadow-md"
                      >
                        Xem bài nộp
                      </motion.button>
                      {isTutor(mockUserData) && (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-3 border-2 border-indigo-200 text-indigo-600 rounded-xl hover:bg-indigo-50 transition text-sm font-medium"
                          >
                            <Edit className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-3 border-2 border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition text-sm font-medium"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Sessions Tab */}
          {activeTab === 'sessions' && (
            <motion.div key="sessions" {...tabContentVariants} className="space-y-6">
              <div className="flex justify-between items-center">
                <motion.h2
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
                >
                  Buổi tư vấn
                </motion.h2>
                <select className="px-5 py-3 border-2 border-green-100 rounded-xl text-sm focus:ring-4 focus:ring-green-200 focus:border-green-400 bg-white/80 backdrop-blur-sm font-medium">
                  <option>🔍 Tất cả trạng thái</option>
                  <option>⏳ Chờ xác nhận</option>
                  <option>✅ Đã xác nhận</option>
                  <option>✓ Hoàn thành</option>
                </select>
              </div>

              <motion.div
                className="grid gap-5"
                variants={gridContainerVariants}
                initial="hidden"
                animate="show"
              >
                {sessions.map(session => (
                  <motion.div
                    key={session.id}
                    variants={gridItemVariants}
                    whileHover={{ scale: 1.01 }}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-green-50 p-6 hover:shadow-xl transition-all relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-100/50 to-emerald-100/50 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-500" />

                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-4">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="w-14 h-14 bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg"
                          >
                            {session.studentName.charAt(0)}
                          </motion.div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{session.studentName}</h3>
                            <p className="text-sm text-gray-500 flex items-center space-x-1">
                              <Mail className="w-3 h-3" />
                              <span>{session.studentEmail}</span>
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3 ml-18">
                          <p className="text-gray-800 font-semibold text-lg">📝 {session.topic}</p>
                          <div className="flex flex-wrap gap-3 text-sm">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-2 rounded-lg"
                            >
                              <Calendar className="w-4 h-4 text-blue-500" />
                              <span className="font-medium text-gray-700">{session.date}</span>
                            </motion.div>
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className="flex items-center space-x-2 bg-gradient-to-r from-purple-50 to-pink-50 px-3 py-2 rounded-lg"
                            >
                              <Clock className="w-4 h-4 text-purple-500" />
                              <span className="font-medium text-gray-700">{session.time} ({session.duration}p)</span>
                            </motion.div>
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className="flex items-center space-x-2 bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-2 rounded-lg"
                            >
                              {session.type === 'online' ? (
                                <>
                                  <Video className="w-4 h-4 text-green-500" />
                                  <span className="font-medium text-gray-700">Trực tuyến</span>
                                </>
                              ) : (
                                <>
                                  <MapPin className="w-4 h-4 text-green-500" />
                                  <span className="font-medium text-gray-700">{session.location}</span>
                                </>
                              )}
                            </motion.div>
                          </div>
                          {session.type === 'online' && session.meetingLink && session.status === 'confirmed' && (
                            <motion.a
                              href={session.meetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05, x: 5 }}
                              className="text-indigo-600 hover:text-indigo-700 text-sm font-bold underline inline-flex items-center space-x-1 mt-2"
                            >
                              <Video className="w-4 h-4" />
                              <span>Tham gia cuộc họp →</span>
                            </motion.a>
                          )}
                          {session.notes && session.status === 'completed' && (
                            <div className="mt-3 p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border-2 border-gray-100">
                              <p className="text-sm text-gray-700"><strong className="text-indigo-600">📌 Ghi chú:</strong> {session.notes}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end space-y-3">
                        <motion.span
                          whileHover={{ scale: 1.1 }}
                          className={`px-4 py-2 rounded-xl text-xs font-bold shadow-md ${getStatusColor(session.status)}`}
                        >
                          {session.status === 'confirmed' ? '✅ Đã xác nhận' :
                            session.status === 'pending' ? '⏳ Chờ xác nhận' :
                              session.status === 'completed' ? '✓ Hoàn thành' : '❌ Đã hủy'}
                        </motion.span>
                        {isTutor(mockUserData) && session.status === 'pending' && (
                          <div className="flex space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleSessionAction(session.id, 'confirmed')}
                              className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 shadow-md"
                              title="Xác nhận"
                            >
                              <Check className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleSessionAction(session.id, 'cancelled')}
                              className="p-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl hover:from-red-600 hover:to-rose-600 shadow-md"
                              title="Từ chối"
                            >
                              <X className="w-5 h-5" />
                            </motion.button>
                          </div>
                        )}
                        {isTutor(mockUserData) && session.status === 'confirmed' && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setSelectedSession(session)
                              setShowSessionModal(true)
                            }}
                            className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 text-sm font-bold shadow-md"
                          >
                            Quản lý
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* Availability Tab */}
          {activeTab === 'availability' && (
            <motion.div key="availability" {...tabContentVariants} className="space-y-6">
              <div className="flex justify-between items-center">
                <motion.h2
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent"
                >
                  Lịch trống của tôi
                </motion.h2>
                {isTutor(mockUserData) && (
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(249, 115, 22, 0.3)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAvailabilityModal(true)}
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 via-red-500 to-rose-500 text-white rounded-xl hover:from-orange-600 hover:via-red-600 hover:to-rose-600 flex items-center space-x-2 shadow-lg font-semibold"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Thêm lịch trống</span>
                  </motion.button>
                )}
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-orange-50 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-orange-100 to-red-100 border-b-2 border-orange-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-bold text-orange-700 uppercase tracking-wider">📅 Thứ</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-orange-700 uppercase tracking-wider">⏰ Thời gian</th>
                      <th className="px-6 py-4 text-left text-sm font-bold text-orange-700 uppercase tracking-wider">📍 Hình thức</th>
                      {isTutor(mockUserData) && (
                        <th className="px-6 py-4 text-right text-sm font-bold text-orange-700 uppercase tracking-wider">⚙️ Thao tác</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-orange-50">
                    <AnimatePresence>
                      {availability.map((avail, index) => (
                        <motion.tr
                          key={avail.id}
                          layout
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ backgroundColor: 'rgba(249, 115, 22, 0.05)' }}
                          className="transition"
                        >
                          <td className="px-6 py-5 whitespace-nowrap text-sm font-bold text-gray-900">
                            {avail.day}
                          </td>
                          <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-700 font-medium">
                            {avail.startTime} - {avail.endTime}
                          </td>
                          <td className="px-6 py-5 whitespace-nowrap text-sm">
                            <span className={`px-3 py-1.5 rounded-lg font-bold ${
                              avail.type === 'online' ? 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700' :
                                avail.type === 'in-person' ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700' :
                                  'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700'
                            }`}>
                              {avail.type === 'online' ? '💻 Trực tuyến' :
                                avail.type === 'in-person' ? '🏫 Trực tiếp' : '🔄 Cả hai'}
                            </span>
                          </td>
                          {isTutor(mockUserData) && (
                            <td className="px-6 py-5 whitespace-nowrap text-right text-sm">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => {
                                  setAvailability(availability.filter(a => a.id !== avail.id))
                                  toast.error('Đã xoá lịch trống')
                                }}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition border-2 border-red-200"
                                title="Xóa lịch"
                              >
                                <Trash2 className="w-5 h-5" />
                              </motion.button>
                            </td>
                          )}
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* --- Modals --- */}
      <AnimatePresence>
        {/* Upload Document Modal */}
        {showUploadModal && isTutor(mockUserData) && (
          <motion.div
            variants={modalBackdropVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              variants={modalPanelVariants}
              className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md p-6 border-2 border-indigo-100"
            >
              <h3 className="text-xl font-bold mb-5 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                🚀 Đăng tài liệu mới
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Tiêu đề"
                  name="title"
                  value={newDocument.title}
                  onChange={handleNewDocChange}
                  className="w-full border-2 border-indigo-100 rounded-xl px-4 py-3 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 bg-white/80 outline-none transition-all"
                />
                <select
                  name="type"
                  value={newDocument.type}
                  onChange={handleNewDocSelectChange}
                  className="w-full border-2 border-indigo-100 rounded-xl px-4 py-3 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 bg-white/80 outline-none transition-all"
                >
                  <option value="pdf">📄 PDF</option>
                  <option value="video">🎥 Video</option>
                  <option value="document">📝 Tài liệu khác</option>
                  <option value="link">🔗 Đường dẫn</option>
                </select>
                <select
                  name="category"
                  value={newDocument.category}
                  onChange={handleNewDocSelectChange}
                  className="w-full border-2 border-indigo-100 rounded-xl px-4 py-3 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 bg-white/80 outline-none transition-all"
                >
                  <option value="Tài liệu">📖 Tài liệu</option>
                  <option value="Bài giảng">🎓 Bài giảng</option>
                  <option value="Thông báo">📢 Thông báo</option>
                </select>
                <textarea
                  placeholder="Mô tả (tuỳ chọn)"
                  name="description"
                  value={newDocument.description}
                  onChange={handleNewDocChange}
                  rows={3}
                  className="w-full border-2 border-indigo-100 rounded-xl px-4 py-3 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 bg-white/80 outline-none transition-all"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUploadModal(false)}
                  className="px-5 py-2 rounded-xl border-2 border-gray-300 hover:bg-gray-50 transition font-medium"
                >
                  Hủy
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 8px 15px rgba(99, 102, 241, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleUploadDocument}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-md font-semibold"
                >
                  Đăng
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Create Assignment Modal */}
        {showAssignmentModal && isTutor(mockUserData) && (
          <motion.div
            variants={modalBackdropVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              variants={modalPanelVariants}
              className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md p-6 border-2 border-purple-100"
            >
              <h3 className="text-xl font-bold mb-5 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ✨ Tạo bài tập mới
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Tiêu đề bài tập"
                  name="title"
                  value={newAssignment.title}
                  onChange={handleNewAssignmentChange}
                  className="w-full border-2 border-purple-100 rounded-xl px-4 py-3 focus:ring-4 focus:ring-purple-200 focus:border-purple-400 bg-white/80 outline-none transition-all"
                />
                <textarea
                  placeholder="Mô tả chi tiết"
                  name="description"
                  value={newAssignment.description}
                  onChange={handleNewAssignmentChange}
                  rows={3}
                  className="w-full border-2 border-purple-100 rounded-xl px-4 py-3 focus:ring-4 focus:ring-purple-200 focus:border-purple-400 bg-white/80 outline-none transition-all"
                />
                <input
                  type="date"
                  name="dueDate"
                  value={newAssignment.dueDate}
                  onChange={handleNewAssignmentChange}
                  className="w-full border-2 border-purple-100 rounded-xl px-4 py-3 focus:ring-4 focus:ring-purple-200 focus:border-purple-400 bg-white/80 outline-none transition-all"
                />
                <input
                  type="number"
                  placeholder="Điểm tối đa"
                  name="points"
                  value={newAssignment.points}
                  onChange={handleNewAssignmentChange}
                  className="w-full border-2 border-purple-100 rounded-xl px-4 py-3 focus:ring-4 focus:ring-purple-200 focus:border-purple-400 bg-white/80 outline-none transition-all"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAssignmentModal(false)}
                  className="px-5 py-2 rounded-xl border-2 border-gray-300 hover:bg-gray-50 transition font-medium"
                >
                  Hủy
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 8px 15px rgba(192, 38, 211, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCreateAssignment}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-md font-semibold"
                >
                  Tạo
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Add Availability Modal */}
        {showAvailabilityModal && isTutor(mockUserData) && (
          <motion.div
            variants={modalBackdropVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              variants={modalPanelVariants}
              className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md p-6 border-2 border-orange-100"
            >
              <h3 className="text-xl font-bold mb-5 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                🗓️ Thêm lịch trống
              </h3>
              <div className="space-y-4">
                <select
                  name="day"
                  value={newAvailability.day}
                  onChange={handleNewAvailabilityChange}
                  className="w-full border-2 border-orange-100 rounded-xl px-4 py-3 focus:ring-4 focus:ring-orange-200 focus:border-orange-400 bg-white/80 outline-none transition-all"
                >
                  {daysOfWeek.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
                <div className="flex space-x-3">
                  <input
                    type="time"
                    name="startTime"
                    value={newAvailability.startTime}
                    onChange={handleNewAvailabilityChange}
                    className="flex-1 border-2 border-orange-100 rounded-xl px-4 py-3 focus:ring-4 focus:ring-orange-200 focus:border-orange-400 bg-white/80 outline-none transition-all"
                  />
                  <input
                    type="time"
                    name="endTime"
                    value={newAvailability.endTime}
                    onChange={handleNewAvailabilityChange}
                    className="flex-1 border-2 border-orange-100 rounded-xl px-4 py-3 focus:ring-4 focus:ring-orange-200 focus:border-orange-400 bg-white/80 outline-none transition-all"
                  />
                </div>
                <select
                  name="type"
                  value={newAvailability.type}
                  onChange={handleNewAvailabilityChange}
                  className="w-full border-2 border-orange-100 rounded-xl px-4 py-3 focus:ring-4 focus:ring-orange-200 focus:border-orange-400 bg-white/80 outline-none transition-all"
                >
                  <option value="both">🔄 Cả hai</option>
                  <option value="online">💻 Trực tuyến</option>
                  <option value="in-person">🏫 Trực tiếp</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAvailabilityModal(false)}
                  className="px-5 py-2 rounded-xl border-2 border-gray-300 hover:bg-gray-50 transition font-medium"
                >
                  Hủy
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 8px 15px rgba(239, 68, 68, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddAvailability}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-md font-semibold"
                >
                  Thêm
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Manage Session Modal */}
        {showSessionModal && selectedSession && isTutor(mockUserData) && (
          <motion.div
            variants={modalBackdropVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              variants={modalPanelVariants}
              className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-lg p-6 border-2 border-green-100"
            >
              <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Quản lý buổi tư vấn
              </h3>
              <p className="text-sm text-gray-600 mb-4 font-medium">
                {selectedSession.studentName} – {selectedSession.topic}
              </p>
              <textarea
                placeholder="Nhập ghi chú sau buổi tư vấn..."
                value={selectedSession.notes || ''}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setSelectedSession({ ...selectedSession, notes: e.target.value })
                }
                rows={4}
                className="w-full border-2 border-green-100 rounded-xl px-4 py-3 focus:ring-4 focus:ring-green-200 focus:border-green-400 bg-white/80 outline-none transition-all"
              />
              <div className="flex justify-end space-x-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSessionModal(false)}
                  className="px-5 py-2 rounded-xl border-2 border-gray-300 hover:bg-gray-50 transition font-medium"
                >
                  Đóng
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 8px 15px rgba(16, 185, 129, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSessionAction(selectedSession.id, 'completed')}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-md font-semibold"
                >
                  Đánh dấu hoàn thành
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TutorCommunityPlatform