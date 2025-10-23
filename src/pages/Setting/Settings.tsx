import React, { useState, useContext } from 'react'
import { User, Save, Lock, Camera } from 'lucide-react'
import { userContext } from '~/context/userContext'
// import type { User as UserTypte } from '~/context/userContext'

const Settings: React.FC = () => {
  const { user, setUser } = useContext(userContext)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    username: user?.username || user?.email?.split('@')[0] || '',
    email: user?.email,
    phone: '+84 123 456 789',
    bio: 'Sinh viên năm 3 ngành Công nghệ Thông tin'
  })
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Update user with form values
      if (user) {
        const updatedUser = {
          ...user,
          firstName: formData.firstName ?? user.firstName,
          lastName: formData.lastName ?? user.lastName,
          email: formData.email ?? user.email,
          roles: user.roles ?? []
        }
        setUser(updatedUser)
      }

      setMessage({ type: 'success', text: 'Cập nhật thông tin thành công!' })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMessage({ type: 'error', text: 'Có lỗi xảy ra khi cập nhật thông tin!' })
    } finally {
      setLoading(false)
    }
  }

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        setMessage({ type: 'error', text: 'Chỉ có thể upload file JPG/PNG!' })
        return
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        setMessage({ type: 'error', text: 'Hình ảnh phải nhỏ hơn 2MB!' })
        return
      }
      setMessage({ type: 'success', text: 'Cập nhật avatar thành công!' })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">⚙️ Cài đặt tài khoản</h2>

        {message && (
          <div className={`mb-4 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* TutorProfile Settings */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">👤 Thông tin cá nhân</h3>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Họ và tên đệm
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-gray-700"
                      placeholder="Họ và tên đệm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tên
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-gray-700"
                      placeholder="Tên"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nhập email"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên đăng nhập</label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed text-gray-700"
                      placeholder="Tên đăng nhập"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giới thiệu về bản thân</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    maxLength={200}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Viết vài dòng giới thiệu về bản thân..."
                  />
                  <div className="text-right text-sm text-gray-500 mt-1">{formData.bio.length}/200</div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                </button>
              </form>
            </div>
          </div>

          {/* Avatar and Quick Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <h3 className="text-xl font-semibold mb-4">📷 Ảnh đại diện</h3>
              <div className="mb-4">
                <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full flex items-center justify-center text-gray-400 border-4 border-gray-200 shadow-lg">
                  {user?.avatarUrl ? (
                    <img src={user.avatarUrl} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <User className="w-16 h-16" />
                  )}
                </div>
              </div>

              <label className="inline-flex items-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <Camera className="w-4 h-4 mr-2" />
                <span>Thay đổi ảnh đại diện</span>
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </label>

              <p className="text-xs text-gray-500 mt-2">
                Định dạng: JPG, PNG • Kích thước tối đa: 2MB
              </p>
            </div>

            {/* Account Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">ℹ️ Thông tin tài khoản</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tên hiển thị:</span>
                  <span className="font-semibold">{user?.lastName} {user?.firstName}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between">
                  <span className="text-gray-600">Vai trò:</span>
                  <span className="font-semibold">
                    {user?.roles?.includes('STUDENT') ? '🎓 Sinh viên' :
                      user?.roles?.includes('TUTOR') ? '👨‍🏫 Giảng viên' : '👨‍💼 Quản trị viên'}
                  </span>
                </div>
              </div>
            </div>

            {/* Security Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-4">🔒 Bảo mật & Quyền riêng tư</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Lock className="w-4 h-4 mr-2" />
                  Đổi mật khẩu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings