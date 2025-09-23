import React from 'react'
import { Link } from 'react-router-dom'

const Library: React.FC = () => {
  return (
    <section className="bg-blue-600 text-white py-20 text-center">
      <div className="container mx-auto p-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Hệ thống thư viện</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Sinh viên và tutor có thể truy cập, chia sẻ tài liệu, sách, và giáo trình liên quan đến buổi học; từ đó tăng tính hỗ trợ học tập, bảo đảm nguồn học liệu chính thống và đồng bộ với cơ sở dữ liệu tài nguyên học tập của toàn trường.
        </p>
        <Link to="/library">
          <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition-colors">
            Thư viện
          </button>
        </Link>
      </div>
    </section>
  )
}

export default Library