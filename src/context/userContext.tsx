import React, { createContext } from 'react'
import { useState, useEffect } from 'react'

export interface User {
  username: string;
  name: string;
  role: string[];
  password: string;
  avatarUrl?: string;
}


interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// 3. Provide a default value that matches the context type
const defaultUserContext: UserContextType = {
  user: null,
  setUser: () => {} // A placeholder function,

}

export const userContext = createContext<UserContextType>(defaultUserContext)


export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) setUser(JSON.parse(storedUser))
  }, [])

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user))
    else localStorage.removeItem('user')
  }, [user])

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  )
}