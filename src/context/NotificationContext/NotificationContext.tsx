import React, { createContext, useState, useContext, useEffect } from 'react'
import { type Notification } from '~/utils/definitions'
import { connectWebSocket, disconnectWebSocket } from '~/utils/webSocket.ts'
import { iDContext } from '~/context/IdContext/idContext.tsx'

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Notification) => void
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
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { ownId } = useContext(iDContext)

  const addNotification = (notification: Notification) => {
    setNotifications(prev => [notification, ...prev])
  }

  const unreadCount = notifications.filter(n => !n.isRead).length


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
  useEffect(() => {
    const userId = ownId
    connectWebSocket({
      userId,
      onMessage: (msg: Notification) => {
        addNotification(msg)
      },
      onConnect: () => {},
      onError: (_error) => {}
    })
    return () => {
      disconnectWebSocket()
    }

  }, [addNotification, ownId])

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