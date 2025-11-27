import { Link, useNavigate } from 'react-router-dom'
import { Button, Dropdown, Avatar } from 'antd'
import { BellOutlined, CheckOutlined } from '@ant-design/icons'
import { useState, useContext, useRef, useEffect } from 'react'
import NotificationCard from './Notification'
import { userContext } from '~/context/User/userContext.tsx'
import { useNotifications } from '~/context/NotificationContext/NotificationContext'
import type { MenuProps } from 'antd'
import { userLogoutAPI } from '~/apis/userAPI'
import HeaderButtons from './HeaderButtons'
import { getNotificationsAPI } from '~/apis/notificationAPI.ts'
import { toast } from 'react-toastify'
import { iDContext } from '~/context/IdContext/idContext.tsx'
import { connectWebSocket, getWebSocketClient, closeWebSocketClient } from '~/utils/webSocket.ts'
import type { Notification } from '~/utils/definitions.ts'
export default function Header() {
  const [isOpenNoti, setIsOpenNoti] = useState(false)
  const navigate = useNavigate()
  const { notifications, unreadCount, markAllAsRead } = useNotifications()
  const notiRef = useRef<HTMLDivElement>(null)

  const { user, logout } = useContext(userContext)
  const { ownId } = useContext(iDContext)
  const { addNotification, setNotifications } = useNotifications()

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notiRef.current && !notiRef.current.contains(event.target as Node)) {
        setIsOpenNoti(false)
      }
    }

    if (isOpenNoti) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpenNoti])

  useEffect(() => {
    if ( !ownId ) return

    connectWebSocket(ownId)
    const webSocketClient = getWebSocketClient(ownId)
    webSocketClient?.on('PRIVATE_NOTIFICATION', (msg) => {
      addNotification(msg.content as unknown as Notification)
    })
    getNotificationsAPI()
      .then((data) => {
        setNotifications(data.notifications)
      })
      .catch((error) => {
        if (process.env.NODE_ENV === 'development') {
          toast.error(error?.response?.data?.message)
        }

      })

    return () => {
      closeWebSocketClient()
    }

  }, [ownId])


  const handleLogout = () => {
    userLogoutAPI(true)
      .then(() => {
        logout()
        navigate('/login')
      })
  }

  const userMenuItems: MenuProps['items'] = [
    { key: 'settings', label: 'Cài đặt', onClick: () => navigate('/settings') },
    { key: 'logout', label: 'Đăng xuất', danger: true, onClick: handleLogout }
  ]

  return (
    <nav className="mb-0 px-4 sm:px-10 bg-[#0388B4] border-b border-white h-[71px] items-stretch fixed top-0 left-0 right-0 z-20 flex flex-row justify-start box-border">
      <div className="w-full h-full flex items-center justify-between box-border">
        <Link to="/" className="inline-block py-[5px] mr-4 whitespace-nowrap bg-transparent max-h-[52px]">
          <img src="/logoBK.png" alt="Logo" className="max-h-[35px] align-middle overflow-clip" />
        </Link>

        {user &&<HeaderButtons />}

        <div className="h-full flex items-center ml-auto pl-0 box-border relative">
          {user ? (
            <>
              <div className="h-full flex items-center mr-3 sm:mr-5" ref={notiRef}>
                <div className="relative cursor-pointer" onClick={() => setIsOpenNoti(!isOpenNoti)}>
                  <div className="relative">
                    <BellOutlined className="text-xl sm:text-2xl text-white hover:text-gray-200 transition-colors" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full leading-tight min-w-[18px] text-center">
                        {unreadCount > 99 ? '99+' : unreadCount}
                      </span>
                    )}
                  </div>
                </div>
                {isOpenNoti && (
                  <div className="absolute right-0 top-[60px] w-80 bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-200 z-50">
                    {/* Header */}
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-900">Thông báo</h3>
                      {unreadCount > 0 && (
                        <button
                          onClick={() => markAllAsRead()}
                          className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer flex items-center gap-1"
                        >
                          <CheckOutlined className="text-xs" />
                          Đánh dấu đã đọc
                        </button>
                      )}
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <NotificationCard
                            notification={notification}
                            key={notification.id}
                            onClose={() => setIsOpenNoti(false)}
                          />
                        ))
                      ) : (
                        <div className="p-8 text-center">
                          <BellOutlined className="text-4xl text-gray-300 mb-2" />
                          <p className="text-sm text-gray-500">Không có thông báo mới</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="h-full flex items-center ml-2 sm:ml-4 mr-2">
                <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight">
                  <div className="cursor-pointer flex items-center gap-2">
                    <Avatar src={user?.avatarUrl} alt={user?.firstName}>
                      {user?.firstName?.[0]?.toUpperCase() ?? 'U'}
                    </Avatar>
                    <span className="hidden sm:inline text-white">{user?.firstName ?? 'Guest'}</span>
                  </div>
                </Dropdown>
              </div>
            </>
          ) : (
            <div className="items-stretch flex box-border">
              <Link to="/login" className="flex h-full items-center px-2">
                <Button type="text" className="!text-white !text-lg leading-none hover:!bg-white/10">
                  Đăng nhập
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}