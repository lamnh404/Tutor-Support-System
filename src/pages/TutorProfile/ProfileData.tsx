import type { Tutor } from '~/pages/TutorSearch/TutorData.tsx'

export const initialProfile: Tutor[] = [
  {
    id: '3',
    firstName: 'Tùng',
    lastName: 'Nguyễn Thanh',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7zEEISvcs1XuhHOPNI0aUElsa46Fmv5NLDg&s',
    department: 'Điện - Điện Tử',
    expertise: ['CAD/CAM', 'Điện Tử Viễn Thông'],
    rating_count: 8,
    rating_avg: 4.9,
    currMentee: 7,
    maxMentee: 8,
    description: 'Giảng viên chuyên ngành vi mạch. Có hơn 8 năm kinh nghiệm trong nghiên cứu và phát triển các hệ thống âm nhạc bằng vi mạch.'
  }
]
