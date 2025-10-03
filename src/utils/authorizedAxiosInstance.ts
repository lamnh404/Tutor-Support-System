import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from '~/utils/formatters'
import { userLogoutAPI } from '~/apis/userAPI'
import { refreshTokenAPI } from '~/apis/userAPI'

type RefreshResponse = {
  accessToken: string
  refreshToken: string
}

const authorizedAxiosInstance: AxiosInstance = axios.create(
  {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
)

// Set timeout to 3 minutes
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 3

// Include credentials (cookies) in requests
authorizedAxiosInstance.defaults.withCredentials = true


authorizedAxiosInstance.interceptors.request.use((config) => {
  interceptorLoadingElements(true)
  return config
}, (error) => {
  // Do something with request error

  return Promise.reject(error)
})

let refreshTokenPromise: Promise<RefreshResponse> | null = null
const handleTokenRefresh = async (originalRequest: AxiosRequestConfig) => {
  if (!refreshTokenPromise) {
    refreshTokenPromise = (async () => {
      try {
        const data: RefreshResponse = await refreshTokenAPI()
        return data
      } catch (err) {
        await userLogoutAPI(false)
        throw err
      } finally {
        refreshTokenPromise = null
      }
    })()
  }

  await refreshTokenPromise

  // Retry the original request after refresh
  return authorizedAxiosInstance(originalRequest)
}

authorizedAxiosInstance.interceptors.response.use((res) => {
  interceptorLoadingElements(false)
  return res
}
, async (error) => {
  interceptorLoadingElements(false)
  if (error?.response?.status === 401) {
    // toast.error(error?.response?.data?.errors?.[0]?.message)
    await userLogoutAPI(false)
  }

  const originalRequests = error.config
  // console.log('Original request: ', originalRequests)
  if (error.response?.status === 410 && originalRequests) {
    return handleTokenRefresh(originalRequests)
  }
  let errorMessage = error?.message
  if (error.response?.data?.message) {
    errorMessage = error.response?.data?.message
  }

  if (errorMessage=='Network Error') errorMessage = 'Lỗi mạng - Vui lòng kiểm tra kết nối của bạn hoặc thử lại sau.'
  else if (errorMessage=='timeout of 180000 ms exceeded') errorMessage = 'Hết thời gian chờ phản hồi từ máy chủ - Vui lòng thử lại sau.'
  else if (errorMessage=='Request failed with status code 500') errorMessage = 'Lỗi máy chủ nội bộ - Vui lòng thử lại sau.'
  else if (errorMessage=='Request failed with status code 404') errorMessage = 'Không tìm thấy tài nguyên - Vui lòng thử lại sau.'
  else if (errorMessage=='Request failed with status code 403') errorMessage = 'Bạn không có quyền truy cập tài nguyên này.'
  else if (errorMessage=='Request failed with status code 401') errorMessage = 'Phiên đăng nhập đã hết hạn hoặc bạn chưa đăng nhập. Vui lòng đăng nhập lại.'
  else if (errorMessage=='Request failed with status code 400') errorMessage = 'Yêu cầu không hợp lệ - Vui lòng kiểm tra và thử lại.'
  else errorMessage = 'Lỗi không xác định - Vui lòng thử lại sau.'
  if (error?.response?.status!==410)
    toast.error(errorMessage)

  return Promise.reject(error)
})

export default authorizedAxiosInstance