import React, { createContext, useState } from 'react'

export interface IdContextType {
  ownId: string
  setOwnId: React.Dispatch<React.SetStateAction<string>>
}

const defaultContext: IdContextType = {
  ownId: '',
  setOwnId: () => {}
}

export const iDContext = createContext<IdContextType>(defaultContext)

export const IdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ownId, setOwnId] = useState<string>('')

  return (
    <iDContext.Provider value={{ ownId, setOwnId }}>
      {children}
    </iDContext.Provider>
  )
}