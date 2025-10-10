import { useContext } from 'react'
import { userContext } from '~/context/userContext'
import Home from '~/pages/Homepage/Home'
import TutorSearchPage from '~/pages/TutorSearch/TutorSearch'

const Hub = () => {
  // Truy cập vào đối tượng user từ context toàn cục.
  const { user } = useContext(userContext)
  // Nếu có đối tượng user (nghĩa là người dùng đã đăng nhập),
  // hiển thị trang tìm kiếm gia sư (TutorSearchPage).
  if (user) {
    return <TutorSearchPage />
  }

  // Nếu không, hiển thị trang chủ công khai (Home).
  return <Home />
}

export default Hub