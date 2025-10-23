import React from 'react'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import type { User } from '~/context/userContext'
import { getInitials, getFullName } from '~/pages/Course/utils.ts'

interface HeaderProps {
  tutor: User
}

const Header: React.FC<HeaderProps> = ({ tutor }) => {
  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex items-center space-x-4">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="w-16 h-16 cursor-pointer bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-xl ring-4 ring-indigo-100"
          >
            {tutor.avatarUrl ? (
              <img src={tutor.avatarUrl} alt="Avatar" className="w-full h-full rounded-2xl object-cover" />
            ) : (
              getInitials(tutor)
            )}
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {getFullName(tutor)}
            </h1>
            <p className="text-sm text-gray-600 flex items-center space-x-2 mt-1">
              <Mail className="w-3 h-3" />
              <span>{tutor.email}</span>
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-indigo-700 rounded-full text-xs font-bold shadow-sm"
              >
                👨‍🏫 Gia sư
              </motion.span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header