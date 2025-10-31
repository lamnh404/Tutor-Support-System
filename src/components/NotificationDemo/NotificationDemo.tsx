import React from 'react'
import { Button } from 'antd'
import { useNotifications } from '~/context/NotificationContext/NotificationContext'

const NotificationDemo: React.FC = () => {
  const { addNotification } = useNotifications()

  const demoNotifications = [
    {
      type: 'booking' as const,
      title: 'Lịch học mới',
      message: 'Bạn có buổi học mới vào 15:00 ngày mai với gia sư Nguyễn Văn A',
      actionUrl: '/course/1',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      senderName: 'Nguyễn Văn A'
    },
    {
      type: 'assignment' as const,
      title: 'Bài tập mới',
      message: 'Gia sư đã giao bài tập mới về Toán cao cấp',
      actionUrl: '/course/1/assignments'
    },
    {
      type: 'review' as const,
      title: 'Đánh giá mới',
      message: 'Học sinh Trần Thị B đã đánh giá bạn 5 sao',
      actionUrl: '/reviews'
    },
    {
      type: 'payment' as const,
      title: 'Thanh toán thành công',
      message: 'Bạn đã thanh toán thành công 500.000đ cho khóa học React.js',
      actionUrl: '/payments'
    },
    {
      type: 'info' as const,
      title: 'Thông báo hệ thống',
      message: 'Hệ thống sẽ bảo trì vào 2:00 AM ngày mai'
    },
    {
      type: 'success' as const,
      title: 'Hoàn thành khóa học',
      message: 'Chúc mừng! Bạn đã hoàn thành khóa học Lập trình Java',
      actionUrl: '/library'
    }
  ]

  const handleAddRandomNotification = () => {
    const randomNotif = demoNotifications[Math.floor(Math.random() * demoNotifications.length)]
    addNotification(randomNotif)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        type="primary"
        onClick={handleAddRandomNotification}
        className="shadow-lg"
      >
        ➕ Thêm thông báo test
      </Button>
    </div>
  )
}

export default NotificationDemo