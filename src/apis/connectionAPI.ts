import authorizedAxiosInstance from '~/utils/authorizedAxiosInstance.ts'
import { API_ROOT } from '~/utils/constants'


export const connectionAPI = async (tutorId: string, studentId: string, message: string) => {
  const formData = new FormData()
  formData.append('tutorId', tutorId)
  formData.append('studentId', studentId)
  formData.append('message', message)
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/api/connections/create`, formData)
  return response.data
}

export const getPendingReqAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/connections/getPendingReq`)
  return response.data
}