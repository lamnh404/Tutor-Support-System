import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { Form, Input, Button, Alert } from 'antd'
import {
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE
} from '~/utils/validators.ts'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert.tsx'
// import { userContext } from '~/context/userContext.tsx'
import { toast } from 'react-toastify'
import { userRegisterAPI } from '~/apis/userAPI'
import { type User } from '~/context/userContext'
import { AxiosError } from 'axios'

type RegisterFormData = {
  email: string
  password: string
  confirmPassword: string
}

const Register: React.FC = () => {
  const { handleSubmit, control, watch, formState: { errors } } = useForm<RegisterFormData>()
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  // const { login } = useContext(userContext)

  const handleRoleSelection = (role: string) => {
    setSelectedRole(role)
    setError(null)
  }

  const handleRegister = async (data: RegisterFormData) => {
    const { email, password } = data
    try {
      await toast.promise<User>(
        userRegisterAPI(email, password),
        {
          pending: 'Đang tạo tài khoản...',
          success: 'Đăng ký thành công!'
          // error: 'Đăng ký thất bại!'
        }
      )
      setError(null)
      navigate('/login')
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err?.response?.data?.message)
      } else {
        console.log('Unknown error:', err)
        setError('Unknown error occurred')
      }
    }
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
                Bạn muốn đăng ký với vai trò nào?
              </h3>
              <Button
                type="primary"
                size="large"
                block
                className="mb-4 py-3 text-lg"
                onClick={() => handleRoleSelection('client')}
              >
                Tài khoản HCMUT
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
              onFinish={handleSubmit(handleRegister)}
              className="text-lg"
            >
              <h3 className="text-center text-gray-700 font-semibold mb-4 text-xl">
                Đăng ký với vai trò: {selectedRole}
              </h3>

              {error && <Alert message={error} type="error" showIcon className="mb-6" />}

              <Form.Item label="Email" required>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: FIELD_REQUIRED_MESSAGE,
                    pattern:{ value: EMAIL_RULE, message: EMAIL_RULE_MESSAGE } }
                  }
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

              <Form.Item label="Xác nhận mật khẩu" required>
                <Controller
                  name="confirmPassword"
                  control={control}
                  rules={{
                    required: FIELD_REQUIRED_MESSAGE,
                    validate: value =>
                      value === watch('password') || 'Mật khẩu không khớp'
                  }}
                  render={({ field }) => <Input.Password {...field} size="large" />}
                />
                <FieldErrorAlert errors={errors} fieldName="confirmPassword" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block size="large" className="mb-3 py-3 text-lg interceptor-loading">
                  Đăng ký
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

export default Register
