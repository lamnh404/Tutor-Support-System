import authorizedAxiosInstance from '~/utils/authorizedAxiosInstance.ts'
import { API_ROOT } from '~/utils/constants.ts'

export const profileAPI = async (id: string) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/info`,
    {
      params: {
        id: id
      }
    })
  return response.data
}