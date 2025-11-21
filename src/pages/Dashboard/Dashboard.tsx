import React, { useState, useMemo, useContext, useEffect } from 'react'
import { myCurrentTutors } from './MyTutorData'
import TutorListCard from './TutorListCard'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Button, message, Tooltip } from 'antd'
import {
  UserOutlined,
  TeamOutlined,
  BellOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  SwapOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons'
import { userContext } from '~/context/User/userContext'
import { motion, AnimatePresence } from 'framer-motion'

import PendingRequests from './PendingRequests'
import UpcomingAppointments from './UpcomingAppointments'
import AvailabilityShortcut from './AvailabilityShortcut'
import CommunityView from './CommunityView'
import { upcomingAppointmentsData } from './TutorDashboardData'

import { getPendingReqAPI } from '~/apis/connectionAPI.ts'
import { iDContext } from '~/context/IdContext/idContext.tsx'
import { toast } from 'react-toastify'

type Role = 'STUDENT' | 'TUTOR';

const MyTutorsView: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 12


  const totalTutorPages = Math.ceil(myCurrentTutors.length / ITEMS_PER_PAGE)
  const paginatedTutors = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return myCurrentTutors.slice(startIndex, endIndex)
  }, [currentPage])

  const handlePrevTutorPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1))
  }
  const handleNextTutorPage = () => {
    setCurrentPage(prev => Math.min(totalTutorPages, prev + 1))
  }

  return (
    <div className="bg-gradient-to-bl from-gray-100 to-gray-200 p-6 rounded-xl shadow-md border border-gray-300 relative pb-16">
      {myCurrentTutors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedTutors.map((tutor) => (
            <TutorListCard key={tutor.id} tutor={tutor} />
          ))}
          {Array.from({ length: Math.max(0, ITEMS_PER_PAGE - paginatedTutors.length) }).map((_, i) => (
            <div key={`placeholder-${i}`} aria-hidden="true" style={{ minHeight: '150px' }}></div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 min-h-[400px] flex flex-col justify-center items-center">
          <p className="text-gray-600">Bạn hiện chưa có gia sư nào.</p>
          <Link to="/dashboard">
            <Button type="primary" className="mt-4">Tìm kiếm gia sư</Button>
          </Link>
        </div>
      )}
      {myCurrentTutors.length > ITEMS_PER_PAGE && (
        <div className="absolute bottom-4 right-4 flex items-center gap-2 mt-4">
          <Button
            icon={<LeftOutlined />}
            onClick={handlePrevTutorPage}
            disabled={currentPage === 1}
            aria-label="Trang trước"
          />
          <span className="text-sm text-gray-600">
            Trang {currentPage} / {totalTutorPages}
          </span>
          <Button
            icon={<RightOutlined />}
            onClick={handleNextTutorPage}
            disabled={currentPage === totalTutorPages}
            aria-label="Trang sau"
          />
        </div>
      )}
    </div>
  )
}

const studentTabs = [
  { id: 'myTutors', path: 'my-tutors', label: 'Gia sư của tôi', icon: <UserOutlined />, gradient: 'from-blue-500 to-blue-600' }
]

const tutorTabs = [
  { id: 'requests', path: 'requests', label: 'Yêu cầu đang chờ', icon: <BellOutlined />, gradient: 'from-orange-500 to-red-500' },
  { id: 'appointments', path: 'appointments', label: 'Lịch hẹn sắp tới', icon: <CalendarOutlined />, gradient: 'from-green-500 to-green-600' },
  { id: 'community', path: 'community', label: 'Cộng đồng', icon: <TeamOutlined />, gradient: 'from-purple-500 to-purple-600' },
  { id: 'availability', path: 'availability', label: 'Quản lý lịch trống', icon: <ClockCircleOutlined />, gradient: 'from-gray-500 to-gray-600' }
]

const contentVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
}

const Dashboard: React.FC = () => {
  const { user } = useContext(userContext)
  const userRoles = user?.roles || []
  const { ownId } = useContext(iDContext)
  const [pendingRequestsData, setPendingRequestsData] = useState([])
  const navigate = useNavigate()
  const location = useLocation()

  const isStudent = userRoles.includes('STUDENT')
  const isTutor = userRoles.includes('TUTOR')
  const isMultiRole = isStudent && isTutor

  const [activeRole, setActiveRole] = useState<Role>(isStudent ? 'STUDENT' : 'TUTOR')

  const activeTabs = useMemo(() => {
    return activeRole === 'STUDENT' ? studentTabs : tutorTabs
  }, [activeRole])

  useEffect(() => {
    const currentPath = location.pathname.split('/').pop()
    const matchingTab = activeTabs.find(tab => tab.path === currentPath)

    if (!matchingTab && activeTabs.length > 0) {
      navigate(`/dashboard/${activeTabs[0].path}`, { replace: true })
    }
  }, [location.pathname, activeTabs, navigate])

  const activeTabId = useMemo(() => {
    const currentPath = location.pathname.split('/').pop()
    const tab = activeTabs.find(t => t.path === currentPath)
    return tab ? tab.id : activeTabs[0]?.id
  }, [location.pathname, activeTabs])

  const handleTabClick = (path: string) => {
    navigate(`/dashboard/${path}`)
  }

  const handleToggleRole = () => {
    setActiveRole(prev => (prev === 'STUDENT' ? 'TUTOR' : 'STUDENT'))
  }

  const handleAcceptRequest = () => {
    message.success('Đã chấp nhận yêu cầu!')
  }

  const handleRejectRequest = () => {
    message.info('Đã từ chối yêu cầu.')
  }

  useEffect(() => {
    if (!ownId) return
    getPendingReqAPI()
      .then(data => data.data)
      .then((data) => {
        setPendingRequestsData(data)
      })
      .catch((error) => {
        if (process.env.NODE_ENV === 'development') {
          toast.error('Lỗi khi lấy dữ liệu yêu cầu đang chờ: ' + error.message)
        }
      })
  }, [ownId])

  const renderContent = () => {
    switch (activeTabId) {
    case 'myTutors':
      return <MyTutorsView />
    case 'requests':
      return <PendingRequests requests={pendingRequestsData} onAccept={handleAcceptRequest} onReject={handleRejectRequest} />
    case 'appointments':
      return <UpcomingAppointments appointments={upcomingAppointmentsData} />
    case 'community':
      return <CommunityView />
    case 'availability':
      return <AvailabilityShortcut />
    default:
      return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className={activeRole === 'STUDENT' ? 'text-3xl font-bold text-transparent bg-clip-text bg-linear-to-t from-sky-600 to-indigo-600' : 'text-3xl font-bold text-transparent bg-clip-text bg-linear-to-t from-violet-600 to-fuchsia-600'}>
            Bảng điều khiển {activeRole === 'STUDENT' ? 'Học sinh' : 'Gia sư'}
          </h1>
          {isMultiRole && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600 hidden md:block">
                {activeRole === 'STUDENT' ? 'Xem với tư cách Gia sư' : 'Xem với tư cách Học sinh'}
              </span>
              <Tooltip title={activeRole === 'STUDENT' ? 'Chuyển sang giao diện Gia sư' : 'Chuyển sang giao diện Học sinh'}>
                <motion.button
                  onClick={handleToggleRole}
                  whileTap={{ scale: 0.9, rotate: 180 }}
                  className="p-2 rounded-full bg-gradient-to-br from-zinc-200 from-30% via-purple-300 to-zinc-300 cursor-pointer to-70% hover:bg-gray-300 text-black transition-colors"
                >
                  <SwapOutlined className="text-xl" />
                </motion.button>
              </Tooltip>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-[85px] space-y-2">
              {activeTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.path)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-base font-medium transition-all duration-300 border border-transparent
                    ${
                activeTabId === tab.id
                  ? `bg-gradient-to-bl ${tab.gradient} text-white cursor shadow-lg scale-105`
                  : 'bg-white text-gray-700 shadow-sm border-gray-200 cursor-pointer hover:shadow-md hover:text-black'
                }`}
                >
                  <span className={`text-xl ${activeTabId === tab.id ? 'text-white' : 'text-gray-400'}`}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTabId}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard