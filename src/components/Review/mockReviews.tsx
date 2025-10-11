export interface Review {
  id: string
  studentName: string
  date: string
  rating: number
  comment: string
  avatar: string | null
}

export const mockReviews : Review[] = [
  {
    id: '1',
    studentName: 'beyza',
    date: 'September 19, 2025',
    rating: 5,
    comment: 'My class with Racy was both informative and fun. She made complex topics easy to understand!',
    avatar: null
  },
  {
    id: '2',
    studentName: 'Simge',
    date: 'September 18, 2025',
    rating: 5,
    comment: 'I had the pleasure of preparing for the OET with Racy and I would definitely recommend her to others.',
    avatar: null
  },
  {
    id: '3',
    studentName: 'Sarah M.',
    date: 'September 15, 2025',
    rating: 5,
    comment: 'Excellent tutor! Very patient and knowledgeable. My English has improved significantly.',
    avatar: null
  },
  {
    id: '4',
    studentName: 'John D.',
    date: 'September 10, 2025',
    rating: 4,
    comment: 'Great experience overall. Racy is very professional and her teaching methods are effective.',
    avatar: null
  }
]
