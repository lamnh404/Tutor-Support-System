/* eslint-disable no-console */
import SockJS from 'sockjs-client'
import { Client, type IFrame, type StompSubscription } from '@stomp/stompjs'
import { API_ROOT } from './constants'
let stompClient: Client | null = null
let subscription: StompSubscription | null = null
import type { Notification } from './definitions'

interface WebSocketConfig {
  userId: string
  onMessage: (message: Notification) => void
  onConnect?: () => void
  onError?: (error: Error | IFrame | Event) => void
}

export const connectWebSocket = ({
  userId, onMessage, onConnect, onError
}: WebSocketConfig) => {
  if (stompClient && stompClient.connected) {
    disconnectWebSocket()
  }

  const socket = new SockJS(`${API_ROOT}/ws?userId=${userId}`);

  stompClient = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,

    onConnect: () => {
      try {
        subscription = stompClient?.subscribe(
          '/user/queue/notifications',
          (msg) => {
            try {
              const payload = JSON.parse(msg.body)
              onMessage(payload)
            } catch (error) {
              console.error('❌ Lỗi parse message:', error)
            }
          }
        ) || null
      } catch (error) {
        console.error('❌ Lỗi khi đăng ký kênh thông báo:', error)
      }

      onConnect?.()
    },

    onStompError: (frame) => {
      console.error('❌ STOMP error:', frame.headers['message'])
      console.error('Chi tiết:', frame.body)
      onError?.(frame)
    },

    onWebSocketError: (event) => {
      console.error('❌ WebSocket error:', event)
      onError?.(event)
    },

    onDisconnect: () => {
    }
  })

  stompClient.activate()
}

export const disconnectWebSocket = () => {
  if (subscription) {
    subscription.unsubscribe()
    subscription = null
  }

  if (stompClient) {
    stompClient.deactivate()
    stompClient = null
  }
}

export const sendMessage = (destination: string, body: unknown) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination,
      body: JSON.stringify(body)
    })
  } else {
    console.error('❌ WebSocket chưa kết nối')
  }
}

export const isConnected = (): boolean => {
  return stompClient?.connected || false
}