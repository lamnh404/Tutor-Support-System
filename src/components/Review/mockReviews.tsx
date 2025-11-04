export interface Review {
  id: string
  studentName: string
  date: string
  rating: number
  comment: string
  avatarUrl: string | null
}

export const mockReviews: Review[] = [
  {
    id: '1',
    studentName: 'Minh Anh',
    date: 'September 19, 2025',
    rating: 5,
    comment: 'Thầy dạy rất tận tâm và dễ hiểu. Mình đã hiểu được nhiều khái niệm phức tạp nhờ cách giảng dạy của thầy!',
    avatarUrl: null
  },
  {
    id: '2',
    studentName: 'Hoàng Long',
    date: 'September 18, 2025',
    rating: 5,
    comment: 'Rất hài lòng với phương pháp giảng dạy của thầy. Thầy luôn kiên nhẫn giải đáp mọi thắc mắc.',
    avatarUrl: null
  },
  {
    id: '3',
    studentName: 'Thu Hương',
    date: 'September 15, 2025',
    rating: 5,
    comment: 'Thầy rất chuyên nghiệp và am hiểu. Điểm số của mình đã cải thiện đáng kể sau khi học với thầy.',
    avatarUrl: null
  },
  {
    id: '4',
    studentName: 'Đức Anh',
    date: 'September 10, 2025',
    rating: 4,
    comment: 'Trải nghiệm tốt. Thầy có phương pháp giảng dạy hiệu quả và dễ tiếp cận.',
    avatarUrl: null
  }
]
