import { Link, useLocation } from 'react-router-dom' // 1. Import useLocation
import { Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Noti from './Noti'
import { useContext } from 'react'
import { userContext } from '~/context/userContext'
import type { MenuProps } from 'antd'
import { Dropdown, Avatar } from 'antd'
import { useNavigate } from 'react-router-dom'
import { userLogoutAPI } from '~/apis/userAPI'

export default function Header() {
  const [isOpenNoti, setIsOpenNoti] = useState(false)
  const navigate = useNavigate()
  const notifications = [
    'Thông báo 1',
    'Thông báo 2',
    'Thông báo 3',
    'Thông báo 4',
    'Thông báo 5'
  ]
  // will delete later
  // const { login } = useContext(userContext)
  // end will delete later

  const { user, logout } = useContext(userContext)
  const { pathname } = useLocation() // 2. Get the current path

  const handleLogout = () => {
    userLogoutAPI(true)
    logout()
    navigate('/login')
  }
  const items: MenuProps['items'] = [
    {
      key: 'settings',
      label: 'Cài đặt',
      onClick: () => navigate('/settings')
    },
    {
      key: 'logout',
      label: 'Đăng xuất',
      danger: true,
      onClick: handleLogout
    }
  ]

  const baseStyle = 'text-white py-4 px-3 rounded-xl text-lg transition-colors cursor-pointer'
  const activeStyle = 'bg-[#044CC8]'
  const inactiveStyle = 'bg-[#0388B4] hover:bg-[#045a77]'

  return (
    <nav className="mb-0 px-10 bg-[#0388B4] border-b border-white h-[71px] items-stretch
                    fixed top-0 left-0 right-0 z-20 flex flex-row justify-start box-border">
      <div className="w-full h-full flex items-center justify-between box-border">
        <Link
          to="/"
          className="inline-block py-[5px] mr-4 whitespace-nowrap bg-transparent max-h-[52px]"
        >
          <img src="/logoBK.png" alt="Logo" className="max-h-[35px] align-middle overflow-clip" />
        </Link>
        {user && (
          <div className="h-full flex items-center space-x-2 cursor-pointer">
            <Link to="/">
              {/* 4. Apply conditional style */}
              <button className={`${baseStyle} ${pathname === '/' ? activeStyle : inactiveStyle}`}>
                Trang Chủ
              </button>
            </Link>
            <Link to="/student">
              <button className={`${baseStyle} ${pathname.startsWith('/student') ? activeStyle : inactiveStyle}`}>
                Trang Cá Nhân
              </button>
            </Link>
            <Link to="/mytutors">
              <button className={`${baseStyle} ${pathname.startsWith('/mytutors') ? activeStyle : inactiveStyle}`}>
                Các gia sư của tôi
              </button>
            </Link>
            <Link to="/dashboard">
              <button className={`${baseStyle} ${pathname.startsWith('/dashboard') ? activeStyle : inactiveStyle}`}>
                Bảng Điều Khiển
              </button>
            </Link>
            <Link to="/library">
              <button className={`${baseStyle} ${pathname.startsWith('/library') ? activeStyle : inactiveStyle}`}>
                Thư Viện
              </button>
            </Link>
          </div>
        )}

        {user? (
          <>
            <div className="h-full flex ml-auto pl-0 pb-0 box-border relative">
              <div className="h-full flex items-center mr-[5px]">
                <div className="relative cursor-pointer"
                  onClick={() => setIsOpenNoti(!isOpenNoti)}
                >
                  <FontAwesomeIcon icon={faBell} className="text-2xl text-gray-700" />
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {notifications.length}
                  </span>
                </div>
                {isOpenNoti && (
                  <div className="absolute right-0 top-[60px] w-64 bg-white shadow-lg rounded-md overflow-hidden">
                    <ul className="divide-y divide-gray-200">
                      {notifications.map((n, idx) => (
                        <Noti noti= {n} key= {idx}/>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="h-full flex items-center ml-4 mr-2">
                <Dropdown menu={{ items }} trigger={['click']}>
                  <div className="cursor-pointer flex items-center gap-2">
                    <Avatar src={user?.avatarUrl} alt={user?.firstName}>
                      {user?.firstName?.[0] ?? 'U'}
                    </Avatar>
                    <span>{user?.firstName ?? 'Guest'}</span>
                  </div>
                </Dropdown>
              </div>
            </div>

          </>
        )
          :
          (<div className="h-full flex flex-row ml-auto box-border">
            <div className="items-stretch flex box-border">
              <Link to="/login" className="flex h-full items-center px-2">
                <Button
                  type="text"
                  className="!text-white !text-lg leading-none hover:!border-black"
                  //testing purposes, remove later
                  // onClick={() => {const mockUser = {
                  //   name: 'Test Sinh Viên',
                  //   role: ['student'],
                  //   avatarUrl: 'https://hips.hearstapps.com/hmg-prod/images/cristiano-ronaldo-of-portugal-during-the-uefa-nations-news-photo-1748359673.pjpeg?crop=0.610xw:0.917xh;0.317xw,0.0829xh&resize=640:*',
                  //   username: 'student1',
                  //   password: 'password123',
                  //   firstName: 'Kim',
                  //   lastName: 'Ri Cha'
                  // }
                  // login(mockUser)
                  // localStorage.setItem('user', JSON.stringify(mockUser))
                  // localStorage.setItem('isLoggedIn', 'true')
                  // navigate('/student')}}
                  //end testing purposes
                >
                Đăng nhập
                </Button>
              </Link>
            </div>
          </div>)
        }
      </div>
    </nav>
  )
}