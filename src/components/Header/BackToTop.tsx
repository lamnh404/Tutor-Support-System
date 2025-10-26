// src/components/BackToTop/BackToTop.tsx
import React, { useState, useEffect } from 'react'
import { UpOutlined } from '@ant-design/icons'

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) { // Show after scrolling 300px
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Set up scroll listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      // Apply Tailwind classes for styling and conditional visibility
      className={`
        fixed bottom-6 right-6 z-50 p-3 bg-gradient-to-t from-blue-800 to-blue-400 text-white rounded-md shadow-lg 
        hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500
        transition-opacity duration-300 ease-in-out cursor-pointer ring-2 ring-indigo-500
        ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'} 
      `}
      aria-label="Scroll back to top"
    >
      <UpOutlined className="text-xl" />
    </button>
  )
}

export default BackToTop