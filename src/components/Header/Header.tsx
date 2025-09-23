import { Link } from 'react-router-dom'
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
  const { user, setUser } = useContext(userContext)
  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('isLoggedIn')
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

  return (
    <nav className="mb-0 px-10 bg-[#0388B4] border-b border-white h-[71px] items-stretch
                    fixed top-0 left-0 right-0 z-10 flex flex-row justify-start box-border">
      <div className="w-full h-full flex items-center justify-between box-border">
        <Link
          to="/"
          className="inline-block py-[5px] mr-4 whitespace-nowrap bg-transparent max-h-[52px]"
        >
          <img src="/logoBK.png" alt="Logo" className="max-h-[35px] align-middle overflow-clip" />
        </Link>

        {user? (
          <>
            <div className="">
              Welcome, {user.name}
            </div>
            <div className="h-full flex ml-auto pl-0 pb-0 box-border relative">
              <div className="h-full flex items-center mr-[5px]">
                {/* Bọc icon + badge trong relative */}
                <div className="relative cursor-pointer"
                  onClick={() => setIsOpenNoti(!isOpenNoti)}
                >
                  <FontAwesomeIcon icon={faBell} className="text-2xl text-gray-700" />
                  {/* Badge số lượng */}
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
                    <Avatar src={user?.avatarUrl} alt={user?.name}>
                      {user?.name?.[0] ?? 'U'}
                    </Avatar>
                    <span>{user?.name ?? 'Guest'}</span>
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
