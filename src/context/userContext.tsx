import React, { createContext } from 'react'

// 1. Define the type for the user object
export interface User {
  username: string;
  name: string;
  role: 'student' | 'lecturer' | 'admin' | null;
  password: string;
  avatarUrl?: string;
}

// 2. Define the type for the entire context value
interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  // isLoggedIn: boolean
  // setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

// 3. Provide a default value that matches the context type
const defaultUserContext: UserContextType = {
  user: null,
  setUser: () => {} // A placeholder function,
  // isLoggedIn: false,
  // setIsLoggedIn: () => {} // A placeholder function
}

// Create the context with the explicit type
export const userContext = createContext<UserContextType>(defaultUserContext)
