import authorizedAxiosInstance from '~/utils/authorizedAxiosInstance.ts'
import { API_ROOT } from '~/utils/constants'

export const updateTutorProfileAPI = async (formData: FormData) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/api/profile/tutor/update`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}
