import { Link } from 'react-router-dom'
import { Avatar } from 'antd'
import {
  MessageOutlined,
  CalendarOutlined,
  StarOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  ExclamationCircleOutlined,
  CloseOutlined
} from '@ant-design/icons'
import type { Notification } from '~/context/NotificationContext/NotificationContext'
import { useNotifications } from '~/context/NotificationContext/NotificationContext'

interface NotiProps {
  notification: Notification
}

const getNotificationIcon = (type: Notification['type']) => {
  const iconProps = { className: 'text-lg' }

  switch (type) {
  case 'booking':
    return <CalendarOutlined {...iconProps} style={{ color: '#52c41a' }} />
  case 'assignment':
    return <MessageOutlined {...iconProps} style={{ color: '#722ed1' }} />
  case 'review':
    return <StarOutlined {...iconProps} style={{ color: '#faad14' }} />
  case 'payment':
    return <CheckCircleOutlined {...iconProps} style={{ color: '#52c41a' }} />
  case 'success':
    return <CheckCircleOutlined {...iconProps} style={{ color: '#52c41a' }} />
  case 'warning':
    return <ExclamationCircleOutlined {...iconProps} style={{ color: '#faad14' }} />
  case 'error':
    return <CloseOutlined {...iconProps} style={{ color: '#ff4d4f' }} />
  default:
    return <InfoCircleOutlined {...iconProps} style={{ color: '#1890ff' }} />
  }
}

const getTimeAgo = (timestamp: string) => {
  const now = new Date()
  const notifTime = new Date(timestamp)
  const diffInMinutes = Math.floor((now.getTime() - notifTime.getTime()) / (1000 * 60))

  if (diffInMinutes < 1) return 'Vừa xong'
  if (diffInMinutes < 60) return `${diffInMinutes} phút trước`
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} giờ trước`
  return `${Math.floor(diffInMinutes / 1440)} ngày trước`
}

export default function Noti({ notification }: NotiProps) {
  const { markAsRead, removeNotification } = useNotifications()

  const handleClick = () => {
    if (!notification.isRead) {
      markAsRead(notification.id)
    }
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    removeNotification(notification.id)
  }

  const content = (
    <div
      className={`w-full border-b border-gray-100 p-4 relative hover:bg-gray-50 transition-colors cursor-pointer group ${
        !notification.isRead ? 'bg-blue-50/30' : ''
      }`}
      onClick={handleClick}
    >
      <div className="flex items-start gap-3">
        {/* Icon or Avatar */}
        <div className="flex-shrink-0 mt-1">
          {notification.avatarUrl ? (
            <Avatar src={notification.avatarUrl} size={40} />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              {getNotificationIcon(notification.type)}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h4 className={`text-sm font-medium text-gray-900 line-clamp-1 ${
                !notification.isRead ? 'font-semibold' : ''
              }`}>
                {notification.title}
              </h4>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {notification.message}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-gray-400">
                  {getTimeAgo(notification.timestamp)}
                </span>
                {!notification.isRead && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </div>
            </div>

            {/* Remove button */}
            <button
              onClick={handleRemove}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded-full ml-2"
              title="Xóa thông báo"
            >
              <CloseOutlined className="text-xs text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  if (notification.actionUrl) {
    return (
      <Link to={notification.actionUrl} className="block">
        {content}
      </Link>
    )
  }

  return content
}
