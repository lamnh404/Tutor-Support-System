import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MOCK_USERS } from './mockdata'

const Login: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleRoleSelection = (role: string) => {
    setSelectedRole(role)
    setError(null)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const user = MOCK_USERS.find(
      (u) =>
        u.username === username && u.password === password && u.role === selectedRole
    )

    if (user) {
      setError(null)
      if (user.role === 'student') navigate('/student')
      if (user.role === 'lecturer') navigate('/lecturer')
      if (user.role === 'admin') navigate('/admin')
    } else {
      setError('Các thông tin mà bạn cung cấp không đúng.')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-sm mx-auto">
        <div className="bg-blue-600 text-white p-6 flex flex-col items-center text-center">
          <img
            src="./logoBK.png"
            alt="HCMUT Logo"
            className="h-12 mb-4"
          />
          <h2 className="text-xl font-bold">HỆ THỐNG HỖ TRỢ HỌC TẬP</h2>
          {/* <p className="text-sm font-medium">BẠN ĐANG TRUY CẬP VÀO HỆ THỐNG HỌC TẬP CỦA TRƯỜNG</p> */}
        </div>

        <div className="p-6">
          {!selectedRole ? (
            <>
              <h3 className="text-center text-gray-700 font-semibold mb-6">Bạn là ai?</h3>
              <button
                onClick={() => handleRoleSelection('student')}
                className="w-full flex items-center justify-center p-4 mb-4 border border-blue-600 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                Sinh viên
              </button>
              <button
                onClick={() => handleRoleSelection('lecturer')}
                className="w-full flex items-center justify-center p-4 mb-4 border border-gray-300 bg-gray-50 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                Giảng viên
              </button>
              <button
                onClick={() => handleRoleSelection('admin')}
                className="w-full flex items-center justify-center p-4 border border-gray-300 bg-gray-50 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                Quản trị viên
              </button>
            </>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <h3 className="text-center text-gray-700 font-semibold mb-2">Đăng nhập với vai trò: {selectedRole}</h3>
              {error && <div className="text-red-500 text-sm text-center">{error}</div>}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên đăng nhập</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Đăng nhập
              </button>
              <button
                onClick={() => setSelectedRole(null)}
                className="w-full p-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                Quay lại
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login