import React from 'react'
import { type Certificate } from './TutorProfileConfig'
const Achievement: React.FC<{cert: Certificate}> = ({ cert }) => {
  return (
    <div key={cert.id} className="p-5 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl border-l-4 border-orange-400 hover:shadow-lg transition-all">
      <div className="flex items-start gap-4">
        <div className="text-4xl">
          {cert.type === 'CERTIFICATION' && '🎓'}
          {cert.type === 'AWARD' && '🏆'}
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 mb-1">{cert.title}</h4>
          <p className="text-sm text-gray-600">{cert.description}</p>
          <p className="text-xs text-gray-500 mt-1">Năm {cert.year}</p>
        </div>
      </div>
    </div>
  )
}

export default Achievement