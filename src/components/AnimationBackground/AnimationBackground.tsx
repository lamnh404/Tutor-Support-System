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
      style={{
        background: "linear-gradient(to bottom right, #60a5fa4d, #c084fc4d)"
      }}
      className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl"
    />

    <motion.div
      animate={{
        scale: [1.2, 1, 1.2],
        rotate: [90, 0, 90],
        opacity: [0.7, 0.6, 0.8]
      }}
      transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      style={{
        background: "linear-gradient(to bottom right, #f472b64d, #818cf84d)"
      }}
      className="absolute top-1/3 -right-24 w-96 h-96 rounded-full blur-3xl"
    />

    <motion.div
      animate={{
        scale: [1, 1.3, 1],
        rotate: [0, -90, 0],
        opacity: [0.7, 0.6, 0.8]
      }}
      transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      style={{
        background: "linear-gradient(to bottom right, #c084fc4d, #60a5fa4d)"
      }}
      className="absolute -bottom-24 left-1/3 w-96 h-96 rounded-full blur-3xl"
    />
  </div>
)

export default AnimationBackground
