import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        <div>
          <h4 className="text-lg font-bold mb-4">Coursera</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Blog</a></li>
            <li><a href="#" className="hover:underline">Sitemap</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-4">Community</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Learners</a></li>
            <li><a href="#" className="hover:underline">Partners</a></li>
            <li><a href="#" className="hover:underline">Developers</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-4">More</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Terms</a></li>
            <li><a href="#" className="hover:underline">Privacy</a></li>
            <li><a href="#" className="hover:underline">Help</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-4">Social</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Facebook</a></li>
            <li><a href="#" className="hover:underline">Twitter</a></li>
            <li><a href="#" className="hover:underline">LinkedIn</a></li>
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