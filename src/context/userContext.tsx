import React, { createContext, useState } from 'react'

export interface User {
  username: string
  firstName: string
  lastName: string
  role: string[]
  avatarUrl?: string
}

export interface LoginResponse {
  user: User
  accessToken: string
}
interface UserContextType {
  user: User | null
  token: string | null
  login: (user: User, token: string) => void
  logout: () => void
}

const defaultContext: UserContextType = {
  user: null,
  token: null,
  login: () => {},
  logout: () => {}
}

export const userContext = createContext<UserContextType>(defaultContext)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null
  })

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token')
  })

  const login = (user: User, token: string) => {
    setUser(user)
    setToken(token)
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  return (
    <userContext.Provider value={{ user, token, login, logout }}>
      {children}
    </userContext.Provider>
  )
}

