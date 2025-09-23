import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12">
      <div className="container mx-auto grid md:grid-cols-2 gap-8 px-4 ">
        <div className="items-center justify-between mx-auto">
          <h4 className="text-lg font-bold mb-4">HCMUT</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="https://hcmut.edu.vn/" className="hover:underline">Trang chủ</a></li>
            <li><a href="https://lms.hcmut.edu.vn/" className="hover:underline">LMS</a></li>
            <li><a href="https://mybk.hcmut.edu.vn/my/index.action" className="hover:underline">MyBK</a></li>
            <li><a href="#" className="hover:underline">Hệ thống hỗ trợ Tutor</a></li>
          </ul>
        </div>

        <div className="items-center justify-between mx-auto">
          <h4 className="text-lg font-bold mb-4">Các trang</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Dashboard</a></li>
            <li><a href="library" className="hover:underline">Thư viện</a></li>
            <li><a href="#" className="hover:underline">Hỗ trợ</a></li>
          </ul>
        </div>

      </div>
      <div className="text-center text-sm mt-8 border-t border-gray-700 pt-4">
        <p>&copy; 2025 HCMUT. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer