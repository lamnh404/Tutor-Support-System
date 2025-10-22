import type { Tutor } from '~/pages/TutorSearch/TutorData.tsx'

export const initialProfile: Tutor[] = [
  {
    id: 'tutor1',
    firstName: 'Tùng',
    lastName: 'Nguyễn Thanh',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7zEEISvcs1XuhHOPNI0aUElsa46Fmv5NLDg&s',
    department: 'EE',
    expertise: ['MACHINE_LEARNING', 'ARTIFICIAL_INTELLIGENCE'],
    rating_count: 8,
    rating_avg: 4.9,
    currMentee: 7,
    maxMentee: 8,
    description: 'Giảng viên chuyên ngành vi mạch. Có hơn 8 năm kinh nghiệm trong nghiên cứu và phát triển các hệ thống âm nhạc bằng vi mạch.'
  },
  {
    id: 'tutor011',
    firstName: 'Truong',
    lastName: 'Long',
    department: 'CS',
    expertise: [
      'CYBERSECURITY',
      'COMPUTER_NETWORKS'
    ],
    rating_count: 49,
    rating_avg: 4.9,
    currMentee: 5,
    maxMentee: 6,
    avatarUrl: 'https://thichtrangtri.com/wp-content/uploads/2025/04/hinh-nen-hieuthuhai-1.jpg',
    description: 'Giảng viên múa lửa, có hơn 10 năm kinh nghiệm biểu diễn và giảng dạy nghệ thuật múa lửa.'
  }
]
