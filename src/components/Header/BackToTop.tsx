import React, { useState, useEffect } from 'react'
import { UpOutlined } from '@ant-design/icons'
import { motion, AnimatePresence } from 'framer-motion'

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 flex items-center justify-center
                     bg-gradient-to-br from-blue-500 to-indigo-600 text-white
                     rounded-full shadow-lg
                     cursor-pointer
                     focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
          aria-label="Scroll back to top"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.1, y: -5, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)' }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <UpOutlined className="text-xl" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default BackToTop