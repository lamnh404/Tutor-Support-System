import authorizedAxiosInstance from '~/utils/authorizedAxiosInstance.ts'
import { API_ROOT } from '~/utils/constants.ts'

export const getNotificationsAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/notifications/get`)
  return response.data
}