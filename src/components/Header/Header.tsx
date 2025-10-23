import { Link, useNavigate } from 'react-router-dom'
import { Button, Dropdown, Avatar } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { useState, useContext } from 'react'
import Noti from './Noti'
import { userContext } from '~/context/userContext'
import type { MenuProps } from 'antd'
import { userLogoutAPI } from '~/apis/userAPI'
import HeaderButtons from './HeaderButtons'

export default function Header() {
  const [isOpenNoti, setIsOpenNoti] = useState(false)
  const navigate = useNavigate()
  const notifications = [
    'Thông báo 1', 'Thông báo 2', 'Thông báo 3', 'Thông báo 4', 'Thông báo 5'
  ]

  const { user, logout } = useContext(userContext)
  // useLocation is no longer needed here for navigation active state

  const handleLogout = () => {
    userLogoutAPI(true)
    logout()
    navigate('/login')
  }

  const userMenuItems: MenuProps['items'] = [
    { key: 'settings', label: 'Cài đặt', onClick: () => navigate('/settings') },
    { key: 'logout', label: 'Đăng xuất', danger: true, onClick: handleLogout }
  ]

  return (
    <nav className="mb-0 px-4 sm:px-10 bg-[#0388B4] border-b border-white h-[71px] items-stretch fixed top-0 left-0 right-0 z-20 flex flex-row justify-start box-border">
      <div className="w-full h-full flex items-center justify-between box-border">
        <Link to="/" className="inline-block py-[5px] mr-4 whitespace-nowrap bg-transparent max-h-[52px]">
          <img src="/logoBK.png" alt="Logo" className="max-h-[35px] align-middle overflow-clip" />
        </Link>

        {user && <HeaderButtons />}

        <div className="h-full flex items-center ml-auto pl-0 box-border relative">
          {user ? (
            <>
              <div className="h-full flex items-center mr-3 sm:mr-5">
                <div className="relative cursor-pointer" onClick={() => setIsOpenNoti(!isOpenNoti)}>
                  <FontAwesomeIcon icon={faBell} className="text-xl sm:text-2xl text-white hover:text-gray-200" />
                  {notifications.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full leading-tight">
                      {notifications.length}
                    </span>
                  )}
                </div>
                {isOpenNoti && (
                  <div className="absolute right-0 top-[60px] w-64 bg-white shadow-lg rounded-md overflow-hidden border border-gray-200 z-30">
                    <ul className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((n, idx) => <Noti noti={n} key={idx} />)
                      ) : (
                        <li className="p-3 text-sm text-gray-500 text-center">Không có thông báo mới</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              <div className="h-full flex items-center ml-2 sm:ml-4 mr-2">
                <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight">
                  <div className="cursor-pointer flex items-center gap-2">
                    <Avatar src={user?.avatarUrl} alt={user?.firstName}>
                      {user?.firstName?.[0]?.toUpperCase() ?? 'U'}
                    </Avatar>
                    <span className="hidden sm:inline text-white">{user?.firstName ?? 'Guest'}</span>
                  </div>
                </Dropdown>
              </div>
            </>
          ) : (
            <div className="items-stretch flex box-border">
              <Link to="/login" className="flex h-full items-center px-2">
                <Button type="text" className="!text-white !text-lg leading-none hover:!bg-white/10">
                  Đăng nhập
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}