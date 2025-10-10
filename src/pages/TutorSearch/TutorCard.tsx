// TutorCard.tsx
import React from 'react'
import { type Tutor } from './TutorData'

// Define the props type for this component for type safety.
interface TutorCardProps {
  tutor: Tutor;
}

const TutorCard: React.FC<TutorCardProps> = ({ tutor }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-300 hover:-translate-y-1">
      {/* Image */}
      <img
        src={tutor.image}
        alt={tutor.name}
        className="w-full h-56 object-cover"
      />

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800">{tutor.name}</h3>
        <p className="text-sm font-semibold text-indigo-600 mb-2">{tutor.faculty}</p>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="ml-1 font-bold text-gray-700">{tutor.rating.toFixed(1)}</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm flex-grow mb-4">{tutor.description}</p>
      </div>

      {/* Action Buttons */}
      <div className="px-4 pb-4 pt-2 border-t border-gray-200">
        <div className="flex space-x-2">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors duration-200">
            View Profile
          </button>
          <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-lg text-sm transition-colors duration-200">
            Send Request
          </button>
        </div>
      </div>
    </div>
  )
}

export default TutorCard