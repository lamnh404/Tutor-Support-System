import React from 'react'
import { StarFilled } from '@ant-design/icons'
import { Progress } from 'antd'
import type { TutorProfileData } from '~/pages/TutorProfile/TutorProfileConfig.ts'
import RenderStar from '~/components/Review/RenderStar'

interface RatingDistributionProps {
  tutorData: TutorProfileData
  distribution: Record<number, number>
}
const RatingDistribution: React.FC<RatingDistributionProps> = ({ tutorData, distribution }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6 p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl">
      <div className="flex flex-col items-center justify-center">
        <div className="text-6xl font-bold text-yellow-600 mb-2">
          {tutorData.rating_avg.toFixed(1)}
        </div>
        <div className="flex gap-1 mb-2">
          {<RenderStar rating={tutorData.rating_avg} />}
        </div>
        <div className="text-gray-600">
          Dựa trên {tutorData.rating_count} đánh giá
        </div>
      </div>

      <div className="space-y-3">
        {[5, 4, 3, 2, 1].map(stars => (
          <div key={stars} className="flex items-center gap-3">
            <div className="flex items-center gap-1 w-16">
              <span className="text-sm font-medium">{stars}</span>
              <StarFilled className="text-yellow-400 text-xs" />
            </div>
            <Progress
              percent={distribution[stars]}
              strokeColor="#fadb14"
              showInfo={false}
              className="flex-1"
            />
            <span className="text-sm text-gray-600 w-12 text-right">
              {distribution[stars]}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RatingDistribution