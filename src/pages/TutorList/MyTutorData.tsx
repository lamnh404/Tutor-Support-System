// src/pages/MyTutors/MyTutorData.tsx
import { type Tutor } from '../TutorSearch/TutorData'

export interface MyTutor extends Omit<Tutor, 'department' | 'expertise'> { // Omit unused fields
  subject: string; // Add a simple subject field
  nextSession?: {
    dateTime: Date;
    location: string;
  };
}

export const myCurrentTutors: MyTutor[] = [
  {
    id: '2',
    firstName: 'Hiếc',
    lastName: 'Lê Sang',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Faker_2020_interview.jpg',
    subject: 'Thuật toán & Kỹ thuật phần mềm', // Simple subject string
    rating_count: 12,
    rating_avg: 4.9,
    currMentee: 5,
    maxMentee: 10,
    description: '6 Cúp Chung Kết Thế Giới...', // Keep description for potential use later
    nextSession: {
      dateTime: new Date('2025-10-27T14:00:00'),
      location: 'Phòng học B41'
    }
  },
  {
    id: '5',
    firstName: 'Thạch',
    lastName: 'Phạm Ngọc',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUxZYv7uAVUFCZXfaurEyzaVkQ2SRiWLgKBw&s',
    subject: 'Xử lý tín hiệu', // Simple subject string
    rating_count: 36,
    rating_avg: 5.0,
    currMentee: 3,
    maxMentee: 8,
    description: 'Mùa sau là mùa của chúng ta...'
    // No next session
  },
  {
    id: '4',
    firstName: 'Giản',
    lastName: 'Đơn Văn',
    avatarUrl: 'https://gamesettings.com/wp-content/uploads/2021/12/s1mple-profile-picture.jpeg',
    subject: 'Thiết kế Cơ khí & Nhiệt động lực học', // Simple subject string
    rating_count: 5,
    rating_avg: 4.7,
    currMentee: 2,
    maxMentee: 5,
    description: 'Giúp các môn...',
    nextSession: {
      dateTime: new Date('2025-10-29T09:30:00'),
      location: 'Google Meet ID: abc-def-ghi'
    }
  }
]