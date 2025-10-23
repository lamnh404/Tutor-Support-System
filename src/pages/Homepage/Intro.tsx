import { Link } from 'react-router-dom'
import Cycle from './Cycle'
import { userContext } from '~/context/User/userContext.tsx'
import { useContext } from 'react'

export default function Intro() {
  const { user } = useContext(userContext)

  return (
    <section className="text-center py-20 mt-16 relative overflow-hidden">
      <Cycle />
      <div className="container mx-auto p-8 rounded-lg bg-black/60 max-w-5/10 relative z-10">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
          HCMUT <br />
          Hệ thống hỗ trợ Tutor
        </h2>
        <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
          Chương trình Tutor/Mentor được triển khai nhằm hỗ trợ sinh viên trong quá trình học tập và phát triển kỹ năng.
        </p>
        <Link to={user ? '/dashboard' : '/login'}>
          <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition-colors cursor-pointer">
            {user ? 'Tìm kiếm ngay' : 'Đăng nhập bằng BKeID'}
          </button>
        </Link>
      </div>
    </section>
  )
}