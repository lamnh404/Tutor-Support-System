import { Link } from 'react-router-dom'
import {
  MessageOutlined,
  CalendarOutlined,
  StarOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
  CloseCircleOutlined,
  UserAddOutlined,
  CloseSquareOutlined,
  CloseOutlined,
  FileTextOutlined
} from '@ant-design/icons'
import type { NotificationRequest } from '~/utils/definitions'
import { useNotifications } from '~/context/NotificationContext/NotificationContext'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'


dayjs.extend(relativeTime)

interface NotificationProps {
  notification: NotificationRequest
  onClose?: () => void
}

const getNotificationIcon = (type: NotificationRequest['type']) => {
  const iconProps = { className: 'text-lg' }

  switch (type) {
  case 'CONNECTION_REQUEST':
    return <UserAddOutlined {...iconProps} style={{ color: '#722ed1' }} />
  case 'CONNECTION_ACCEPTED':
    return <CheckCircleOutlined {...iconProps} style={{ color: '#52c41a' }} />
  case 'CONNECTION_REJECTED':
    return <CloseCircleOutlined {...iconProps} style={{ color: '#ff4d4f' }} />
  case 'NEW_MESSAGE':
    return <MessageOutlined {...iconProps} style={{ color: '#1890ff' }} />
  case 'BOOKING_CREATED':
    return <CalendarOutlined {...iconProps} style={{ color: '#52c41a' }} />
  case 'BOOKING_CANCELLED':
    return <CloseSquareOutlined {...iconProps} style={{ color: '#ff4d4f' }} />
  case 'BOOKING_COMPLETED':
    return <CalendarOutlined {...iconProps} style={{ color: '#52c41a' }} />
  case 'ASSIGNMENT_CREATED':
    return <FileTextOutlined {...iconProps} style={{ color: '#1890ff' }} />
  case 'ASSIGNMENT_GRADED':
    return <CheckCircleOutlined {...iconProps} style={{ color: '#52c41a' }} />
  case 'REVIEW_RECEIVED':
    return <StarOutlined {...iconProps} style={{ color: '#faad14' }} />
  case 'SYSTEM_INFO':
    return <InfoCircleOutlined {...iconProps} style={{ color: '#1890ff' }} />
  default:
    return <InfoCircleOutlined {...iconProps} style={{ color: '#1890ff' }} />
  }
}

export default function Notification({ notification, onClose }: NotificationProps) {
  const { markAsRead, removeNotification } = useNotifications()

  const handleClick = () => {
    if (!notification.isRead) {
      markAsRead(notification.id)
    }

    if (onClose) {
      onClose()
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
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            {getNotificationIcon(notification.type)}
          </div>
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
                {notification.content}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-gray-400">
                  {dayjs(notification.timestamp).fromNow()}
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
