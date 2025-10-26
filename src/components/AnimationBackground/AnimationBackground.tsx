import React from 'react'
import { motion } from 'framer-motion'

const AnimationBackground: React.FC = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 90, 0],
        opacity: [0.7, 0.6, 0.8]
      }}
      transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl"
    />
    <motion.div
      animate={{
        scale: [1.2, 1, 1.2],
        rotate: [90, 0, 90],
        opacity: [0.7, 0.6, 0.8]
      }}
      transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      className="absolute top-1/3 -right-24 w-96 h-96 bg-gradient-to-br from-pink-400/30 to-indigo-400/30 rounded-full blur-3xl"
    />
    <motion.div
      animate={{
        scale: [1, 1.3, 1],
        rotate: [0, -90, 0],
        opacity: [0.7, 0.6, 0.8]
      }}
      transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      className="absolute -bottom-24 left-1/3 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-blue-400/30 rounded-full blur-3xl"
    />
  </div>
)

export default AnimationBackground
