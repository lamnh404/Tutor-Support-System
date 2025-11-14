import React, { useState, useEffect } from 'react'
import { Avatar, Pagination } from 'antd'
import RenderStar from '~/components/Review/RenderStar'
import type { Review } from './TypeDefinition'
import { getReviewsAPI } from '~/apis/profileAPI'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/vi.js'

dayjs.extend(relativeTime)
dayjs.locale('vi')
interface ReviewCardProps {
  id: string,
  sort: string
}

const PAGE_SIZE = 2


const ReviewCard: React.FC<ReviewCardProps> = ({ id, sort }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [reviews, setReviews] = useState<Review[]>([])
  const [totalPages, setTotalPages] = useState(0)


  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    getReviewsAPI(id, currentPage, PAGE_SIZE, sort)
      .then(data => {
        setReviews(data.reviews.data)
        setTotalPages(data.reviews.totalPages)
      })
  }, [id, currentPage, sort])

  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-4">Nhận xét từ học viên</h3>
      <div className="space-y-4">
        {reviews.map(review => (
          <div key={review.reviewID} className="p-5 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-100">
            <div className="flex items-start gap-4">
              <Link to={`/${review.reviewerID}`}>
                {review.avatarUrl ? (
                  <Avatar size={64} src={review.avatarUrl} />
                ) : (
                  <Avatar size={64} className="bg-blue-500 uppercase">
                    {review.reviewerName.charAt(0).toUpperCase()}
                  </Avatar>
                )}
              </Link>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-semibold text-gray-900">{review.reviewerName}</div>
                    <div className="text-xs text-gray-500">
                      {
                        dayjs(review.timestamp).fromNow()
                      }
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <RenderStar rating={review.rating} />
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-center mt-6">
          <Pagination
            current={currentPage}
            total={totalPages * PAGE_SIZE}
            pageSize={PAGE_SIZE}
            showSizeChanger={false}
            onChange={onPageChange}
            className="custom-pagination"
          />
        </div>
      </div>
    </div>
  )
}

export default ReviewCard
