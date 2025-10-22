import authorizedAxiosInstance from '~/utils/authorizedAxiosInstance.ts'
import { API_ROOT } from '~/utils/constants.ts'

export interface tutorSearchParams {
  department?: string
  expertise?: string
  sort?: string
  page?: number
  pageSize?: number
}
const tutorSearchAPI= async (params: tutorSearchParams) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/search-tutor`, {
    params: {
      department: params.department,
      expertise: params.expertise,
      sort: params.sort,
      page: params.page,
      pageSize: params.pageSize
    }
  })
  return response.data
}

export default tutorSearchAPI