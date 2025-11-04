import React from 'react'
import { motion } from 'framer-motion'
import { BellOutlined, CalendarOutlined, ClockCircleOutlined, TeamOutlined } from '@ant-design/icons'

type ViewMode = 'overview' | 'requests' | 'appointments' | 'availability' | 'students';
interface TabInfo {
  id: string;
  label: string;
  dataCount: number | null;
}
interface DashboardOverviewProps {
  setViewMode: (view: ViewMode) => void;
  tabs: TabInfo[];
}

const icons = {
  requests: <BellOutlined />,
  appointments: <CalendarOutlined />,
  availability: <ClockCircleOutlined />,
  students: <TeamOutlined />
}

const gradients = {
  requests: 'bg-gradient-to-br from-blue-400 to-sky-500',
  appointments: 'bg-gradient-to-br from-green-400 to-emerald-500',
  availability: 'bg-gradient-to-br from-indigo-400 to-purple-500',
  students: 'bg-gradient-to-br from-amber-400 to-orange-500'
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ setViewMode, tabs }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {tabs.map(tab => (
        <motion.div
          key={tab.id}
          layoutId={`tab-${tab.id}`}
          onClick={() => setViewMode(tab.id as ViewMode)}
          className={`relative p-6 rounded-xl shadow-lg text-white cursor-pointer ${gradients[tab.id as keyof typeof gradients]} overflow-hidden`}
          whileHover={{ scale: 1.03, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
        >
          <div className={'absolute -right-4 -bottom-4 text-white/20 text-7xl transition-transform group-hover:scale-110'}>
            {icons[tab.id as keyof typeof icons]}
          </div>
          <div className="relative z-10">
            <h3 className="text-xl font-semibold">{tab.label}</h3>
            {tab.dataCount !== null ? (
              <p className="text-3xl font-bold mt-2">{tab.dataCount}</p>
            ) : (
              <p className="text-sm mt-2 opacity-90">Cập nhật lịch</p>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default DashboardOverview