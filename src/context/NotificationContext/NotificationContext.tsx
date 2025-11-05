import React, { createContext, useState, useContext } from 'react'

export interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error' | 'booking' | 'review' | 'assignment' | 'payment'
  title: string
  message: string
  timestamp: string
  isRead: boolean
  actionUrl?: string
  senderName?: string
  avatarUrl?: string
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAllNotifications: () => void
}

const defaultContext: NotificationContextType = {
  notifications: [],
  unreadCount: 0,
  addNotification: () => {},
  markAsRead: () => {},
  markAllAsRead: () => {},
  removeNotification: () => {},
  clearAllNotifications: () => {}
}

export const NotificationContext = createContext<NotificationContextType>(defaultContext)

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'booking',
      title: 'Lịch học mới được đặt',
      message: 'Bạn có một buổi học mới với gia sư Lê Minh Si vào thứ 3, 29/10 lúc 14:00',
      timestamp: '2024-10-28 14:30',
      isRead: false,
      actionUrl: '/course/1',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      senderName: 'Lê Minh Si'
    },
    {
      id: '2',
      type: 'assignment',
      title: 'Bài tập mới được giao',
      message: 'Gia sư Trần Văn Bạch đã giao bài tập React.js cho bạn',
      timestamp: '2024-10-28 13:15',
      isRead: false,
      actionUrl: '/course/2/assignments'
    },
    {
      id: '3',
      type: 'review',
      title: 'Đánh giá mới',
      message: 'Nguyễn Văn Minh đã đánh giá bạn 5 sao cho buổi học React.js',
      timestamp: '2024-10-28 10:45',
      isRead: false,
      actionUrl: '/profile/reviews'
    },
    {
      id: '4',
      type: 'payment',
      title: 'Thanh toán thành công',
      message: 'Bạn đã thanh toán thành công 500.000đ cho khóa học Web Development',
      timestamp: '2024-10-27 16:20',
      isRead: true,
      actionUrl: '/payments'
    },
    {
      id: '5',
      type: 'info',
      title: 'Cập nhật hệ thống',
      message: 'Hệ thống sẽ bảo trì từ 2:00 - 4:00 sáng ngày 30/10',
      timestamp: '2024-10-27 09:00',
      isRead: true
    }
  ])

  const unreadCount = notifications.filter(n => !n.isRead).length

  const addNotification = (notificationData: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotification: Notification = {
      ...notificationData,
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString('vi-VN'),
      isRead: false
    }
    setNotifications(prev => [newNotification, ...prev])
  }

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    )
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      removeNotification,
      clearAllNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}