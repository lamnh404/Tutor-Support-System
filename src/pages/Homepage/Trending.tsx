import React from 'react'

const trendingTopics = [
  'Giải Tích 1',
  'Xác Suất Thống Kê',
  'Hệ Điều Hành',
  'Mạng Máy Tính',
  'Kiến Trúc Máy Tính',
  'Đại Số Tuyến Tính',
  'Hóa Đại Cương',
  'Cấu Trúc Dữ Liệu & Giải Thuật'
]

const Trending: React.FC = () => {
  return (
    <section className="bg-gray-200 py-16">
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Các môn học nổi bật</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {trendingTopics.map((topic, index) => (
            <a
              key={index}
              className="bg-white text-gray-700 px-6 py-3 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors text-sm font-medium"
            >
              {topic}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Trending