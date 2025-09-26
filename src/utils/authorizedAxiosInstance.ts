import axios, { type AxiosInstance } from 'axios'
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

authorizedAxiosInstance.interceptors.response.use((respone) => {
  interceptorLoadingElements(false)
  return respone
}
, (error) => {
  interceptorLoadingElements(false)
  if (error?.response?.status === 401) {
    toast.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.')
    userLogoutAPI(false)
  }

  const originalRequests = error.config
  if (error.response?.status === 410 && originalRequests) {
    if (!refreshTokenPromise) {
      refreshTokenPromise = refreshTokenAPI()
        .then((data: RefreshResponse) => {
          return data.accessToken
        })
        .catch((err) => {
          userLogoutAPI(false)
          return Promise.reject(err)
        })
        .finally(() => {
          refreshTokenPromise = null
        })
    }
    return refreshTokenPromise.then(() => {
      return authorizedAxiosInstance(originalRequests)
    })
  }
  let errorMessage = error?.message
  if (error.response?.data?.message) {
    errorMessage = error.response?.data?.message
  }
  // Dùng toastify để hiển thị bất kể mọi mã lỗi lên màn hình - Ngoại trừ mã 410 - GONE phục vụ việc tự động refresh lại token.
  // if (error.response?.status !== 410) {
  //   toast.error(errorMessage)
  // }
  console.log(error)

  return Promise.reject(error)
})

export default authorizedAxiosInstance