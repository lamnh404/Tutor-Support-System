import authorizedAxiosInstance from '~/utils/authorizedAxiosInstance.ts'
import { API_ROOT } from '~/utils/constants.ts'


export const getListCommunitiesOfTutorAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/communities/getCommunitiesInfoOfTutor`)
  return response.data
}