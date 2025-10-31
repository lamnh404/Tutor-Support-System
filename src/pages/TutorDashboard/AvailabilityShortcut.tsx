import React, { useContext } from 'react'
import { ActiveTabContext } from '~/context/CourseContext/ActiveTabContext.tsx'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import type { ActiveTab } from '~/pages/Course/TypeDefinition.ts'

const AvailabilityShortcut: React.FC = () => {
  const { setActiveTab } = useContext(ActiveTabContext)
  return (
    <div className="bg-gradient-to-bl from-orange-200 to-red-200 text-black p-6 rounded-lg shadow flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold mb-1">Quản lý lịch trống</h2>
        <p className="text-sm opacity-90">Cập nhật thời gian trống trên lịch.</p>
      </div>
      <Link to="/course/1">
        <Button
          onClick={() => setActiveTab('availability' as ActiveTab)}
          className="!px-5 !py-2 !h-auto !rounded-xl !bg-gradient-to-r !from-orange-500 !to-red-500 !text-white !border-none hover:!from-orange-600 hover:!to-red-600 !shadow-md !font-semibold"
          icon={<EditOutlined />}
          size="large"
          type="primary"
        >
          Cập nhật
        </Button>
      </Link>
    </div>
  )
}

export default AvailabilityShortcut