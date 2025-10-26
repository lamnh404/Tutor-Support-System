import React, { useContext } from 'react'
import { ActiveTabContext } from '~/context/CourseContext/ActiveTabContext.tsx'
import type { ActiveTab, Tab } from '~/pages/Course/TypeDefinition.ts'

interface TabProps {
  tab: Tab
}

const TabCard: React.FC<TabProps> = ({ tab }) => {
  const { activeTab, setActiveTab } = useContext(ActiveTabContext)
  const Icon = tab.icon

  return (
    <button
      onClick={() => setActiveTab(tab.id as ActiveTab)}
      className={`flex items-center cursor-pointer space-x-2 px-4 py-2 rounded-lg transition-all ${
        activeTab === tab.id
          ? `bg-gradient-to-r ${tab.gradient} text-white`
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="whitespace-nowrap">{tab.label}</span>
    </button>
  )
}

export default TabCard