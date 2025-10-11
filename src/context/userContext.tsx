import React, { createContext, useState } from 'react'

export interface User {
  username: string
  firstName: string
  lastName: string
  role: string[]
  avatarUrl?: string
}

interface UserContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

const defaultContext: UserContextType = {
  user: null,
  login: () => {},
  logout: () => {}
}

export const userContext = createContext<UserContextType>(defaultContext)

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null
  })

  const login = (user: User) => {
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <userContext.Provider value={{ user, login, logout }}>
      {children}
    </userContext.Provider>
  )
}

