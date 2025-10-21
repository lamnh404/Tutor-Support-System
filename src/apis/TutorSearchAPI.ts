import authorizedAxiosInstance from '~/utils/authorizedAxiosInstance.ts'
import { API_ROOT } from '~/utils/constants.ts'

export interface tutorSearchParams {
  department?: string
  expertise?: string
  sort?: string
  page?: number
  pageSize?: number
}
const token= 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdHVkZW50MDAxIiwiaXNzIjoidXRtZW50b3IiLCJyb2xlcyI6WyJTVFVERU5UIl0sImlhdCI6MTc2MTAzNTE3NCwiZXhwIjoxNzYxMDM4Nzc0fQ.cTRs9GiSacsQXdnZ_coS0QDlkktQgHk1PZS65BVy1Bo'
const tutorSearchAPI= async (params: tutorSearchParams) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/search-tutor`, {
    params: {
      department: params.department,
      expertise: params.expertise,
      sort: params.sort,
      page: params.page,
      pageSize: params.pageSize
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export default tutorSearchAPI