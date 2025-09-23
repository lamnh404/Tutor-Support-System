import React from 'react'
import { features } from './data' // Change the import path and name

const Features: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Các tính năng nổi bật</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-blue-500 text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features