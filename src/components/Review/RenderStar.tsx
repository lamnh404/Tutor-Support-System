import { StarFilled, StarOutlined } from '@ant-design/icons'
import React from 'react'


const RenderStars: React.FC<{ rating:number }> = ({ rating }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        star <= rating ?
          <StarFilled key={star} className="text-yellow-400 text-lg" /> :
          <StarOutlined key={star} className="text-gray-300 text-lg" />
      ))}
    </div>
  )
}
export default RenderStars