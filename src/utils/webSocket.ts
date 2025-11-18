
import { API_ROOT } from '~/utils/constants.ts'


interface WebSocketMessage {
  type: string
  senderId : string
  [key: string]: unknown
}

type Listener<T> = (data: T) => void

class WebSocketClient<T extends WebSocketMessage = WebSocketMessage> {
  private ws: WebSocket | null = null
  private userId: string

  private listeners: Map<string, Listener<T>[]> = new Map()
  private reconnectDelay = 2000
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null
  private heartbeatTimer: ReturnType<typeof setInterval> | null = null

  constructor(userId: string) {
    this.userId = userId
  }

  buildWsUrl() {
    let url = API_ROOT

    if (url.startsWith('https://')) {
      url = url.replace('https://', 'wss://')
    } else if (url.startsWith('http://')) {
      url = url.replace('http://', 'ws://')
    }

    return `${url}/ws?userId=${encodeURIComponent(this.userId)}`
  }

  connect() {
    this.ws = new WebSocket(this.buildWsUrl())


    this.ws?.addEventListener('open', () => {
      this.startHeartbeat()
    })


    this.ws?.addEventListener('message', (event) => {
      this.handleMessage(event.data)
    })

    this.ws?.addEventListener('close', () => {
      this.stopHeartbeat()
      this.scheduleReconnect()
    })

    this.ws?.addEventListener('error', (error) => {
      if (process.env.NODE_ENV === 'development') {
        console.error('WebSocket error:', error)
      }
      this.ws?.close()
    })
  }

  // Automatically send PING messages every 30 seconds
  startHeartbeat() {
    this.heartbeatTimer = setInterval(() => {
      this.ws?.send(JSON.stringify(
        { type: 'PING',
          senderId: this.userId
        }))
    }, 30000)
  }

  stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer)
      this.heartbeatTimer = null
    }
  }

  // Automatically try to reconnect when the connection is closed
  private scheduleReconnect() {
    if (this.reconnectTimer) return
    this.reconnectTimer = setTimeout(() => {
      this.connect()
      this.reconnectTimer = null
    }, this.reconnectDelay)
  }

  // Handle received messages
  private handleMessage(raw: string) {
    try {
      const data : T = JSON.parse(raw)

      const list = this.listeners.get(data.type)
      if (list) {
        list.forEach((listener) => listener(data))
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to parse WebSocket message:', error)
      }
    }
  }

  send(data: T) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data))
    }
  }

  // Register event listeners
  on(type: string, callback: Listener<T>) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, [])
    }
    this.listeners.get(type)!.push(callback)
  }

  close() {
    this.ws?.close()
    this.ws = null
  }
}

let webSocketClient: WebSocketClient | null = null

export const connectWebSocket = (userId: string | null | undefined) => {
  if (!userId) return
  if (!webSocketClient) {
    webSocketClient = new WebSocketClient(userId)
    webSocketClient.connect()
  }
}

export const getWebSocketClient = (userId: string) => {

  if (!userId) {
    return null
  }

  if (!webSocketClient) {
    webSocketClient = new WebSocketClient(userId)
    webSocketClient.connect()
  }
  return webSocketClient
}


export const closeWebSocketClient = () => {
  if (webSocketClient) {
    webSocketClient.close()
    webSocketClient = null
  }
}

