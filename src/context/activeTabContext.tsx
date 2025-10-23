import React, { createContext, useState } from 'react'

import { type ActiveTab } from '~/pages/Course/TypeDefinition.ts'


interface activeTabType{
  activeTab: ActiveTab,
  setActiveTab: React.Dispatch<React.SetStateAction<ActiveTab>>
}
const defaultTabs: activeTabType = {
  activeTab: 'documents',
  setActiveTab: () => {}
}
export const ActiveTabContext = createContext<activeTabType>(defaultTabs)

export const ActiveTabContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('documents')
  return (
    <ActiveTabContext.Provider value = {
      {
        activeTab, setActiveTab
      }}>
      {children}
    </ActiveTabContext.Provider>
  )
}