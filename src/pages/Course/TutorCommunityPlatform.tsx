import React, { useState, type ChangeEvent, useContext } from 'react'

import { Calendar, Clock, Video, MapPin, Trash2, Plus, Check, X, Mail } from 'lucide-react'

import { motion, AnimatePresence } from 'framer-motion'

import toast from 'react-hot-toast'

import type {
  DocumentType, DocumentCategory, Document,
  Assignment, DayOfWeek, AvailabilityType, SessionStatus, Session,
  Availability, NewDocumentState, NewAssignmentState, NewAvailabilityState
} from '~/pages/Course/TypeDefinition.ts'

import { daysOfWeek } from '~/pages/Course/TypeDefinition'

import { mockUserData, mockDocuments, mockAssignments, mockAvailability, mockSessions } from '~/pages/Course/mockData.ts'

import { gridItemVariants, gridContainerVariants,
  tabContentVariants, modalBackdropVariants, modalPanelVariants } from '~/pages/Course/Config'

import { isTutor, getFullName } from '~/pages/Course/utils'

import Header from '~/pages/Course/Header.tsx'

import { Tabs, getStatusColor } from '~/pages/Course/utils'

import TabCard from '~/pages/Course/Tab.tsx'

import { ActiveTabContext } from '~/context/CourseContext/ActiveTabContext.tsx'

import DocumentCard from '~/pages/Course/Contents/DocumentCard.tsx'

import AssignmentCard from '~/pages/Course/Contents/AssignmentCard.tsx'

const TutorCommunityPlatform: React.FC = () => {
  const { activeTab } = useContext(ActiveTabContext)
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
    description: '',
    file: null
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
    setNewDocument({ title: '', type: 'pdf', category: 'Tài liệu', description: '', file: null })
    toast.success('Đăng tài liệu thành công!')
  }

  const handleFileUpload = (e:React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0]
    if (file) {
      setNewDocument({
        ...newDocument,
        file: file,
        title: newDocument.title || file.name.replace(/\.[^/.]+$/, '')
      })
    }
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

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch= doc.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterCategory === 'all' || doc.category == filterCategory
    return matchesFilter && matchesSearch
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
    <div className="min-h-screen  relative overflow-hidden">
      {/* Header */}
      <Header tutor={ mockUserData }/>
      {/* Navigation */}
      <div className="relative backdrop-blur-md  border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-2 overflow-x-auto">
            {Tabs.map(tab => (
              <TabCard key={tab.id} tab={tab} />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {/* Documents Tab */}
          {activeTab === 'documents' &&
            <DocumentCard
              setShowUploadModal={setShowUploadModal}
              searchTerm={ searchTerm }
              setSearchTerm={setSearchTerm}
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
              filteredDocuments={filteredDocuments}
            />}

          {/* Assignments Tab */}
          {activeTab === 'assignments' &&
            <AssignmentCard
              setShowAssignmentModal={setShowAssignmentModal}
              assignments={assignments}
            />}

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

                {/* File Upload Section */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Tải lên tệp tin
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      accept={
                        newDocument.type === 'pdf' ? '.pdf' :
                          newDocument.type === 'video' ? 'video/*' :
                            newDocument.type === 'document' ? '.doc,.docx,.txt,.ppt,.pptx,.xls,.xlsx' :
                              '*'
                      }
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex items-center justify-center w-full border-2 border-dashed border-indigo-300 rounded-xl px-4 py-6 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50/50 transition-all bg-white/80"
                    >
                      <div className="text-center">
                        <div className="text-3xl mb-2">📁</div>
                        <p className="text-sm text-gray-600">
                          {newDocument.file ? (
                            <span className="text-indigo-600 font-medium">
                      ✓ {newDocument.file.name}
                            </span>
                          ) : (
                            <>
                              <span className="text-indigo-600 font-medium">Chọn tệp</span> hoặc kéo thả vào đây
                            </>
                          )}
                        </p>
                        {newDocument.file && (
                          <p className="text-xs text-gray-500 mt-1">
                            {(newDocument.file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        )}
                      </div>
                    </label>
                  </div>
                </div>

                {/* URL input for link type */}
                {newDocument.type === 'link' && (
                  <input
                    type="url"
                    placeholder="Đường dẫn URL"
                    name="url"
                    value={newDocument.url || ''}
                    onChange={handleNewDocChange}
                    className="w-full border-2 border-indigo-100 rounded-xl px-4 py-3 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 bg-white/80 outline-none transition-all"
                  />
                )}

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