import React, { useState, type ChangeEvent, useContext } from 'react'

import { AnimatePresence } from 'framer-motion'

import toast from 'react-hot-toast'

import type {
  DocumentType, DocumentCategory, Document,
  Assignment, DayOfWeek, AvailabilityType, Session,
  Availability, NewDocumentState, NewAssignmentState, NewAvailabilityState, SessionStatus
} from '~/pages/Course/TypeDefinition.ts'

import { mockUserData, mockDocuments, mockAssignments, mockAvailability, mockSessions } from '~/pages/Course/mockData.ts'

import { isTutor, getFullName } from '~/pages/Course/utils'

import Header from '~/pages/Course/Header.tsx'

import { Tabs } from '~/pages/Course/utils'

import TabCard from '~/pages/Course/Tab.tsx'

import { ActiveTabContext } from '~/context/CourseContext/ActiveTabContext.tsx'

import DocumentCard from '~/pages/Course/Contents/DocumentCard.tsx'

import AssignmentCard from '~/pages/Course/Contents/AssignmentCard.tsx'

import SessionCard from '~/pages/Course/Contents/SessionCard.tsx'

import AvailabilityCard from '~/pages/Course/Contents/AvailabilityCard.tsx'

import UploadDocument from '~/pages/Course/Modals/UploadDocument.tsx'

import CreateAssignment from '~/pages/Course/Modals/CreateAssignment.tsx'

import AvailabilityModal from '~/pages/Course/Modals/AvailabilityModal.tsx'
import SessionModal from '~/pages/Course/Modals/SessionModal.tsx'

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
          {activeTab === 'sessions' &&
            <SessionCard
              sessions={sessions}
              setShowSessionModal={setShowSessionModal}
              selectedSession={selectedSession}
              setSelectedSession={setSelectedSession}
              setSessions={ setSessions }
              handleSessionAction={ handleSessionAction }
            />}

          {/* Availability Tab */}
          {activeTab === 'availability' &&
            <AvailabilityCard
              setShowAvailabilityModal={setShowAvailabilityModal}
              availability={availability}
              setAvailability={setAvailability}
            />
          }
        </AnimatePresence>
      </div>

      {/* --- Modals --- */}
      <AnimatePresence>
        {/* Upload Document Modal */}
        {showUploadModal && isTutor(mockUserData) &&
          <UploadDocument
            newDocument = {newDocument}
            handleNewDocChange={ handleNewDocChange}
            handleNewDocSelectChange={handleNewDocSelectChange}
            handleFileUpload={handleFileUpload}
            handleUploadDocument={handleUploadDocument}
            setShowUploadModal={setShowUploadModal}
          />
        }

        {/* Create Assignment Modal */}
        {showAssignmentModal && isTutor(mockUserData) &&
          <CreateAssignment
            newAssignment={newAssignment}
            handleCreateAssignment={handleCreateAssignment}
            handleNewAssignmentChange={handleNewAssignmentChange}
            setShowAssignmentModal={setShowAssignmentModal}
          />
        }

        {/* Add Availability Modal */}
        {showAvailabilityModal && isTutor(mockUserData) &&
          <AvailabilityModal
            newAvailability={newAvailability}
            handleAddAvailability={handleAddAvailability}
            handleNewAvailabilityChange={handleNewAvailabilityChange}
            setShowAvailabilityModal={setShowAvailabilityModal}
          />}

        {/* Manage Session Modal */}
        {showSessionModal && selectedSession && isTutor(mockUserData) &&
          <SessionModal
            selectedSession={selectedSession}
            setSelectedSession={setSelectedSession}
            setShowSessionModal={setShowSessionModal}
            handleSessionAction={handleSessionAction}
          />
        }
      </AnimatePresence>
    </div>
  )
}

export default TutorCommunityPlatform