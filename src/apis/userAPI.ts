import authorizedAxiosInstance from '~/utils/authorizedAxiosInstance.ts'
import { API_ROOT } from '~/utils/constants.ts'
import { toast } from 'react-toastify'

export const userLoginAPI = async (username: string, password: string) => {
  // console.log('User Login API called with:', { username, password })
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/api/auth/login`, {
    username,
    password
  },
  {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  // console.log(response)
  return response.data
}

// ~/apis/userAPI.ts
export const userRegisterAPI = async (email: string, password: string) => {
  console.log('User Register API called with:', { email, password })
  const res = await authorizedAxiosInstance.post(`${API_ROOT}/api/auth/register`, { email, password })
  return res.data
}

export const userLogoutAPI = async (showSuccessMessage: boolean) => {
  const res = await authorizedAxiosInstance.delete(`${API_ROOT}/api/auth/logout`)
  if (showSuccessMessage) {
    toast.success('Đăng xuất thành công!')
  }
  return res.data
}

export const refreshTokenAPI = async () => {
  const res = await authorizedAxiosInstance.post('${API_ROOT}/api/auth/refresh-token')
  return res.data
}