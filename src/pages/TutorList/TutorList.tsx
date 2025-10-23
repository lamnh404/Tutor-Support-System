import React from 'react'
import { myCurrentTutors } from './MyTutorData'
import TutorListCard from './TutorListCard'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

const TutorList: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Gia sư Hiện tại của bạn
        </h1>

        {myCurrentTutors.length > 0 ? (
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myCurrentTutors.map((tutor) => (
                <TutorListCard key={tutor.id} tutor={tutor} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center bg-white p-10 rounded-xl shadow-md max-w-lg mx-auto">
            <p className="text-gray-600">Bạn hiện chưa có gia sư nào.</p>
            <Link to="/dashboard">
              <Button type="primary" className="mt-4">
                    Tìm kiếm gia sư
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default TutorList

