import React, { createContext, useState, useContext } from 'react'
import { type NotificationRequest } from '~/utils/definitions'
import { sendMessage } from '~/utils/webSocket.ts'


interface NotificationContextType {
  notifications: NotificationRequest[]
  setNotifications: React.Dispatch<React.SetStateAction<NotificationRequest[]>>
  unreadCount: number
  addNotification: (notification: NotificationRequest) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAllNotifications: () => void
}

const defaultContext: NotificationContextType = {
  notifications: [],
  setNotifications: () => {},
  unreadCount: 0,
  addNotification: () => {},
  markAsRead: () => {},
  markAllAsRead: () => {},
  removeNotification: () => {},
  clearAllNotifications: () => {}
}

export const NotificationContext = createContext<NotificationContextType>(defaultContext)

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationRequest[]>([])

  const addNotification = (notification: NotificationRequest) => {
    setNotifications(prev => [notification, ...prev])
  }

  const unreadCount = notifications.filter(n => !n.isRead).length


  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    )
    sendMessage('/app/notifications/markAsRead', { id })
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
      setNotifications,
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