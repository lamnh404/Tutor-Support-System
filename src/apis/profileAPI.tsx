import authorizedAxiosInstance from '~/utils/authorizedAxiosInstance.ts'
import { API_ROOT } from '~/utils/constants.ts'

export const basicTutorInfoAPI = async (id: string) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/tutor/info`, {
    params: {
      id
    }
  })
  return response.data
}


