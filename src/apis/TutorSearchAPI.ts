import authorizedAxiosInstance from '~/utils/authorizedAxiosInstance.ts'
import { API_ROOT } from '~/utils/constants.ts'

const tutorSearchAPI= async (query: string) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/search-tutor`, {
    params: { query }
  })
  return response.data
}

export default tutorSearchAPI