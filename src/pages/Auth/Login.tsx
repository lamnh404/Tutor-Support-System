import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MOCK_USERS } from './mockdata'
import { useForm, Controller } from 'react-hook-form'
import { Form, Input, Button, Alert } from 'antd'
import {
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from '~/utils/validators.ts'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert.tsx'
import { userContext } from '~/context/userContext.tsx'

type LoginFormData = {
  username: string;
  password: string;
};

const Login: React.FC = () => {

  const { handleSubmit, control, formState: { errors } } = useForm<LoginFormData>()
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { user, setUser } = useContext(userContext)
  const handleRoleSelection = (role: string) => {
    setSelectedRole(role)
    setError(null)
  }
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  const handleLogin = (data: LoginFormData) => {
    const user = MOCK_USERS.find(
      u => u.username === data.username && u.password === data.password && u.role === selectedRole
    )

    if (user) {
      setError(null)
      setUser(user)
      if (user.role === 'student') navigate('/student')
      if (user.role === 'lecturer') navigate('/lecturer')
      if (user.role === 'admin') navigate('/admin')
    } else {
      setError('Các thông tin mà bạn cung cấp không đúng.')
    }
    // console.log('Login data:', user)
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-6 text-lg">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-[500px] mx-auto block ">
        {/* Header */}
        <div className="bg-blue-600 text-white p-8 flex flex-col items-center text-center">
          <img src="/logoBK.png" alt="HCMUT Logo" className="h-16 mb-4" />
          <h2 className="text-2xl font-bold">HỆ THỐNG HỖ TRỢ HỌC TẬP</h2>
        </div>

        {/* Body */}
        <div className="p-8">
          {!selectedRole ? (
            <>
              <h3 className="text-center text-gray-700 font-semibold mb-8 text-xl">
                Bạn là ai?
              </h3>
              <Button
                type="primary"
                size="large"
                block
                className="mb-4 py-3 text-lg"
                onClick={() => handleRoleSelection('student')}
              >
                Sinh viên
              </Button>
              <Button
                size="large"
                block
                className="mb-4 py-3 text-lg"
                onClick={() => handleRoleSelection('lecturer')}
              >
                Giảng viên
              </Button>
              <Button
                size="large"
                block
                className="py-3 text-lg"
                onClick={() => handleRoleSelection('admin')}
              >
                Quản trị viên
              </Button>
            </>
          ) : (
            <Form
              layout="vertical"
              onFinish={handleSubmit(handleLogin)}
              className="text-lg"
            >
              <h3 className="text-center text-gray-700 font-semibold mb-4 text-xl">
                Đăng nhập với vai trò: {selectedRole}
              </h3>

              {error && <Alert message={error} type="error" showIcon className="mb-6" />}

              <Form.Item label="Tên đăng nhập" required>
                <Controller
                  name="username"
                  control={control}
                  rules={{ required: FIELD_REQUIRED_MESSAGE }}
                  render={({ field }) => <Input {...field} size="large" />}
                />
                <FieldErrorAlert errors={errors} fieldName="username" />
              </Form.Item>

              <Form.Item label="Mật khẩu" required>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: { value: PASSWORD_RULE, message: PASSWORD_RULE_MESSAGE }
                  }}
                  render={({ field }) => <Input.Password {...field} size="large" />}
                />
                <FieldErrorAlert errors={errors} fieldName="password" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block size="large" className="mb-3 py-3 text-lg">
                  Đăng nhập
                </Button>
                <Button block size="large" className="py-3 text-lg" onClick={() => setSelectedRole(null)}>
                  Quay lại
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
