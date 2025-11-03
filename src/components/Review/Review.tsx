import React from 'react'
import { Avatar } from 'antd'
import RenderStar from '~/components/Review/RenderStar'
import type { Review } from './mockReviews'

const ReviewCard: React.FC<{reviews: Review []}> = ({ reviews }) => {
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-4">Nhận xét từ học viên</h3>
      <div className="space-y-4">
        {reviews.map(review => (
          <div key={review.id} className="p-5 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-100">
            <div className="flex items-start gap-4">
              <Avatar size={48} className="bg-gradient-to-br from-blue-500 to-purple-500 flex-shrink-0">
                {review.studentName[0].toUpperCase()}
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-semibold text-gray-900">{review.studentName}</div>
                    <div className="text-xs text-gray-500">{review.date}</div>
                  </div>
                  <div className="flex gap-1">
                    {<RenderStar rating={review.rating} />}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReviewCard