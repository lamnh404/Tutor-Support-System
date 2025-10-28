import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Dropdown, Button } from 'antd'
import type { MenuProps } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import { userContext } from '~/context/User/userContext'

const allNavLinks = [
  { path: '/', label: 'Trang Chủ', requiredRoles: ['STUDENT', 'TUTOR'] },
  { path: '/student', label: 'Trang Cá Nhân', requiredRoles: ['STUDENT', 'TUTOR'] },
  { path: '/mytutors', label: 'Các gia sư của tôi', requiredRoles: ['STUDENT'] }, // Specifically for STUDENT
  { path: '/tutordashboard', label: 'Các học sinh của tôi', requiredRoles: ['TUTOR'] }, // Specifically for TUTOR
  { path: '/search', label: 'Tìm kiếm', requiredRoles: ['STUDENT', 'TUTOR'] },
  { path: '/library', label: 'Thư Viện', requiredRoles: ['STUDENT', 'TUTOR'] }
]

const HeaderButtons: React.FC = () => {
  const { pathname } = useLocation()
  const { user } = useContext(userContext)

  const availableNavLinks = user?.roles
    ? allNavLinks.filter(link => {
      return link.requiredRoles.some(requiredRole => user.roles?.includes(requiredRole))
    })
    : []

  const baseStyle = 'text-white py-4 px-3 rounded-xl text-lg transition-colors cursor-pointer'
  const activeStyle = 'bg-[#044CC8]'
  const inactiveStyle = 'bg-[#0388B4] hover:bg-[#045a77]'

  const responsiveMenuItems: MenuProps['items'] = availableNavLinks.map(link => ({
    key: link.path,
    label: (
      <Link
        to={link.path}
        className={`block px-4 py-2 text-sm ${
          (pathname.startsWith(link.path) && link.path !== '/') || pathname === link.path
            ? 'text-blue-600 font-semibold bg-blue-50'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        {link.label}
      </Link>
    )
  }))

  if (availableNavLinks.length === 0) {
    return null
  }

  return (
    <>
      <div className="hidden xl:flex h-full items-center space-x-2">
        {availableNavLinks.map(link => {
          const isActive = (pathname.startsWith(link.path) && link.path !== '/') || pathname === link.path
          return (
            <Link key={link.path} to={link.path}>
              <button className={`${baseStyle} ${isActive ? activeStyle : inactiveStyle}`}>
                {link.label}
              </button>
            </Link>
          )
        })}
      </div>

      <div className="flex items-center xl:hidden">
        <Dropdown menu={{ items: responsiveMenuItems }} trigger={['click']} placement="bottomRight">
          <Button
            type="text"
            icon={<MenuOutlined className="text-xl text-white" />}
            className="!h-[40px] !w-[40px] !flex !items-center !justify-center"
            aria-label="Menu"
          />
        </Dropdown>
      </div>
    </>
  )
}

export default HeaderButtons