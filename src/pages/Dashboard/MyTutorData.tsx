import { type Tutor } from '../TutorSearch/TutorData'

export interface MyTutor extends Omit<Tutor, 'department' | 'expertise'> {
  subject: string;
  nextSession?: {
    dateTime: Date;
    location: string;
  };
}

export const myCurrentTutors: MyTutor[] = [
  {
    id: '1',
    firstName: 'Hiếc',
    lastName: 'Lê Sang',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Faker_2020_interview.jpg',
    subject: 'Thuật toán & Kỹ thuật phần mềm',
    rating_count: 12,
    rating_avg: 4.9,
    currMentee: 5,
    maxMentee: 10,
    description: '6 Cúp Chung Kết Thế Giới...',
    nextSession: {
      dateTime: new Date('2025-10-27T14:00:00'),
      location: 'Phòng học B41'
    }
  },
  {
    id: '2',
    firstName: 'Đậu',
    lastName: 'Huỳnh Văn',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHzqaqJ1ZMMsIececYDCp3dI649BdI1ixLMA&s',
    subject: 'Học máy',
    rating_count: 12,
    rating_avg: 4.9,
    currMentee: 5,
    maxMentee: 10,
    description: '6 Cúp Chung Kết Thế Giới...',
    nextSession: {
      dateTime: new Date('2025-10-27T14:00:00'),
      location: 'Phòng học B41'
    }
  },
  {
    id: '3',
    firstName: 'Rô',
    lastName: 'Đỗ Minh',
    avatarUrl: 'https://media-cdn-v2.laodong.vn/storage/newsportal/2025/2/4/1458351/Ronaldo-1.jpg',
    subject: 'Khoa học dữ liệu',
    rating_count: 12,
    rating_avg: 4.9,
    currMentee: 5,
    maxMentee: 10,
    description: '6 Cúp Chung Kết Thế Giới...',
    nextSession: {
      dateTime: new Date('2025-10-27T14:00:00'),
      location: 'Phòng học B41'
    }
  },
  {
    id: '4',
    firstName: 'Thạch',
    lastName: 'Phạm Ngọc',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUxZYv7uAVUFCZXfaurEyzaVkQ2SRiWLgKBw&s',
    subject: 'Xử lý tín hiệu',
    rating_count: 36,
    rating_avg: 5.0,
    currMentee: 3,
    maxMentee: 8,
    description: 'Mùa sau là mùa của chúng ta...'
  },
  {
    id: '5',
    firstName: 'Giản',
    lastName: 'Đơn Văn',
    avatarUrl: 'https://gamesettings.com/wp-content/uploads/2021/12/s1mple-profile-picture.jpeg',
    subject: 'Thiết kế Cơ khí & Nhiệt động lực học',
    rating_count: 5,
    rating_avg: 4.7,
    currMentee: 2,
    maxMentee: 5,
    description: 'Giúp các môn...',
    nextSession: {
      dateTime: new Date('2025-10-29T09:30:00'),
      location: 'Google Meet ID: abc-def-ghi'
    }
  },
  {
    id: '6',
    firstName: 'Tùng',
    lastName: 'Nguyễn Thanh',
    avatarUrl: 'https://yt3.googleusercontent.com/c-Z7mIlntSpG6VyQ5ZqaPggqkZRhaySr-H5ZEazFN2iR1pP4eD1UGekwu0y--c4CSVhJJ1A4QT8=s900-c-k-c0x00ffffff-no-rj',
    subject: 'Thiết kế cơ sở dữ liệu',
    rating_count: 5,
    rating_avg: 4.7,
    currMentee: 2,
    maxMentee: 5,
    description: 'Giúp các môn...',
    nextSession: {
      dateTime: new Date('2025-10-29T09:30:00'),
      location: 'Google Meet ID: abc-def-ghi'
    }
  },
  {
    id: '7',
    firstName: 'Trung',
    lastName: 'Trần Văn',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHv6miDKQ7hd91MqcmcVvpX6ZFA-eauWIUOA&s',
    subject: 'Hệ thống nhúng',
    rating_count: 5,
    rating_avg: 4.7,
    currMentee: 2,
    maxMentee: 5,
    description: 'Giúp các môn...',
    nextSession: {
      dateTime: new Date('2025-10-29T09:30:00'),
      location: 'Google Meet ID: abc-def-ghi'
    }
  },
  {
    id: '8',
    firstName: 'Lan',
    lastName: 'Đỗ Văn',
    avatarUrl: 'https://cdn2.fptshop.com.vn/unsafe/800x0/doran_lol_4_b6a175b910.png',
    subject: 'Hệ thống điều khiển',
    rating_count: 12,
    rating_avg: 4.9,
    currMentee: 5,
    maxMentee: 10,
    description: '6 Cúp Chung Kết Thế Giới...'
  },
  {
    id: '9',
    firstName: 'Mã',
    lastName: 'Trần Văn',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQwDaK2WEpux7b-wp9LMyfBEbWvrewGmQsgA&s',
    subject: 'Thiết kế cơ khí',
    rating_count: 12,
    rating_avg: 4.9,
    currMentee: 5,
    maxMentee: 10,
    description: '6 Cúp Chung Kết Thế Giới...'
  },
  {
    id: '10',
    firstName: 'Độ',
    lastName: 'Nguyễn Văn',
    avatarUrl: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQrqZGvb9e5uldxXG2scoB4lw-PbexUaZQf9YCg-6xhwuH_sIuwLnfRX35aLZcFSSGrtUt22InF6iXL9BWyuNwN5-nA8EDOt-UopX2Sw0I',
    subject: 'Công nghệ chế biến',
    rating_count: 12,
    rating_avg: 4.9,
    currMentee: 5,
    maxMentee: 10,
    description: '6 Cúp Chung Kết Thế Giới...'
  },
  {
    id: '11',
    firstName: 'Gea',
    lastName: 'Đặng Văn',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/68/David_de_Gea_2017.jpg',
    subject: 'Phát triển web',
    rating_count: 12,
    rating_avg: 4.9,
    currMentee: 5,
    maxMentee: 10,
    description: '6 Cúp Chung Kết Thế Giới...'
  },
  {
    id: '12',
    firstName: 'Lan',
    lastName: 'Trần Hà',
    avatarUrl: 'https://img.a.transfermarkt.technology/portrait/big/418560-1709108116.png?lm=1',
    subject: 'Thuật toán & Kỹ thuật phần mềm',
    rating_count: 12,
    rating_avg: 4.9,
    currMentee: 5,
    maxMentee: 10,
    description: '6 Cúp Chung Kết Thế Giới...'
  },
  {
    id: '13',
    firstName: 'Si',
    lastName: 'Lê Minh',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGv0ZIrLidHrXmxdSY38qwW3_FyQZhJo-sFQ&s',
    subject: 'An ninh mạng',
    rating_count: 13,
    rating_avg: 4.9,
    currMentee: 5,
    maxMentee: 10,
    description: '6 Cúp Chung Kết Thế Giới...'
  }
]