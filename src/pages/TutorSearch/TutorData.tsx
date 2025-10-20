// TutorData.tsx

import type { DepartmentCode, ExpertiseCode } from './TutorDefinitions'

export type Department = DepartmentCode;

export interface Tutor {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  department: DepartmentCode;
  expertise: ExpertiseCode[];
  rating_count: number;
  rating_avg: number;
  currMentee: number;
  maxMentee: number;
  description: string;
}

export type SortKey = 'firstName' | 'rating_avg';

export const initialTutors: Tutor[] = [
  {
    id: '1',
    firstName: 'Si',
    lastName: 'Lê Minh',
    avatarUrl: 'https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg',
    department: 'CE',
    expertise: ['SIGNAL_PROCESSING', 'DATA_SCIENCE'],
    rating_count: 3,
    rating_avg: 5.0,
    currMentee: 8,
    maxMentee: 15,
    description: 'Có 1 World Cup và 8 Quả Bóng Vàng. Chuyên gia kinh tế lượng và phân tích dữ liệu kinh doanh.'
  },
  {
    id: '2',
    firstName: 'Hiếc',
    lastName: 'Lê Sang',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Faker_2020_interview.jpg',
    department: 'CS',
    expertise: ['SOFTWARE_ENGINEERING', 'DATA_SCIENCE'],
    rating_count: 12,
    rating_avg: 4.9,
    currMentee: 5,
    maxMentee: 10,
    description: '6 Cúp Chung Kết Thế Giới. Chuyên gia lập trình game với hơn 10 năm kinh nghiệm trong ngành công nghiệp game AAA.'
  },
  {
    id: '3',
    firstName: 'Tùng',
    lastName: 'Nguyễn Thanh',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7zEEISvcs1XuhHOPNI0aUElsa46Fmv5NLDg&s',
    department: 'EE',
    expertise: ['EMBEDDED_SYSTEMS', 'CONTROL_SYSTEMS'],
    rating_count: 8,
    rating_avg: 4.8,
    currMentee: 3,
    maxMentee: 8,
    description: 'Giảng viên chuyên ngành vi mạch. Có hơn 8 năm kinh nghiệm trong nghiên cứu và phát triển các hệ thống âm nhạc bằng vi mạch.'
  },
  {
    id: '4',
    firstName: 'Giản',
    lastName: 'Đơn Văn',
    avatarUrl: 'https://gamesettings.com/wp-content/uploads/2021/12/s1mple-profile-picture.jpeg',
    department: 'ME',
    expertise: ['THERMODYNAMICS', 'MECHANICAL_DESIGN'],
    rating_count: 5,
    rating_avg: 4.7,
    currMentee: 2,
    maxMentee: 5,
    description: 'Giúp các môn như giải tích, xác suất, thống kê, cơ học, nhiệt động lực học trở nên dễ hiểu và thú vị hơn.'
  },
  {
    id: '5',
    firstName: 'Thạch',
    lastName: 'Phạm Ngọc',
    avatarUrl: 'https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/555580796_787846297507289_4377645927878828365_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=j52iSBqaf-AQ7kNvwE1sMaF&_nc_oc=Adk4dfvy586ym05YSjZzwLGCqlNR8WT_m3GVhKPdlbHSJh8URHxD3p1Pv_6pWRgOEpw&_nc_zt=23&_nc_ht=scontent.fsgn8-4.fna&_nc_gid=odPhOCXkcW6F6fTN3gUjUg&oh=00_AfcPy6xqHhF3jLaASoG8_6OFWFuCXjizm2InRhyU4WCMCg&oe=68FC13F9',
    department: 'EE',
    expertise: ['CYBERSECURITY', 'EMBEDDED_SYSTEMS'],
    rating_count: 36,
    rating_avg: 5.0,
    currMentee: 3,
    maxMentee: 8,
    description: 'Mùa sau là mùa của chúng ta. Streamer full time.'
  },
  {
    id: '6',
    firstName: 'Thịnh',
    lastName: 'Phạm Sơn',
    avatarUrl: 'https://valo2asia.com/wp-content/uploads/2023/03/DSC00001-Edit-scaled-e1679474299336-1170x918.jpg',
    department: 'CS',
    expertise: ['WEB_DEVELOPMENT', 'MECHANICAL_DESIGN'],
    rating_count: 10,
    rating_avg: 4.6,
    currMentee: 4,
    maxMentee: 8,
    description: 'Chuyên gia về lập trình web với nhiều năm kinh nghiệm trong ngành.'
  },
  {
    id: '7',
    firstName: 'Bạch',
    lastName: 'Trần Văn',
    avatarUrl: 'https://dailytheology.org/wp-content/uploads/2013/08/heisenberg-breaking-bad.jpg?w=590',
    department: 'CH',
    expertise: ['MATERIALS_SCIENCE', 'THERMODYNAMICS'],
    rating_count: 15,
    rating_avg: 4.5,
    currMentee: 9,
    maxMentee: 12,
    description: 'Chuyên gia trong lĩnh vực hóa dược với nhiều năm kinh nghiệm nghiên cứu và phát triển thuốc.'
  },
  {
    id: '8',
    firstName: 'Tuấn',
    lastName: 'Trịnh Trần Phương',
    avatarUrl: 'https://kenh14cdn.com/203336854389633024/2025/9/29/j97-1759158947118-17591589473691681361215.png',
    department: 'CE',
    expertise: ['COMPUTER_NETWORKS', 'DATABASE_DESIGN'],
    rating_count: 27,
    rating_avg: 4.9,
    currMentee: 13,
    maxMentee: 14,
    description: 'Hướng dẫn cách kiếm 5 triệu mỗi tháng. Chuyên gia quản lý tài chính cá nhân và đầu tư thông minh.'
  },
  {
    id: '9',
    firstName: 'Độ',
    lastName: 'Phùng Thanh',
    avatarUrl: 'https://image.theinfluencer.vn/files/2023/4/imgs/file-1682306109865.jpg???',
    department: 'CE',
    expertise: ['MACHINE_LEARNING'],
    rating_count: 20,
    rating_avg: 4.4,
    currMentee: 15,
    maxMentee: 15,
    description: 'Hướng dẫn cách bán khô gà trên mạng xã hội.'
  },
  {
    id: '10',
    firstName: 'Đỗ',
    lastName: 'Ri Văn',
    avatarUrl: 'https://mira.vn/upload/images/cristiano-ronaldo-al-nassr.jpg',
    department: 'ME',
    expertise: ['PROCESS_ENGINEERING', 'MATERIALS_SCIENCE'],
    rating_count: 7,
    rating_avg: 7.0,
    currMentee: 7,
    maxMentee: 7,
    description: 'Nghệ thuật tỉa cỏ.'
  },
  {
    id: '9',
    firstName: 'Bê',
    lastName: 'Minh Bắp',
    avatarUrl: 'https://img.a.transfermarkt.technology/portrait/big/342229-1682683695.jpg?lm=1',
    department: 'EE',
    expertise: ['SOFTWARE_ENGINEERING', 'SIGNAL_PROCESSING'],
    rating_count: 80,
    rating_avg: 3.9,
    currMentee: 17,
    maxMentee: 21,
    description: 'Chuyên gia vật lý thiên văn với nhiều năm nghiên cứu về vũ trụ và các hiện tượng thiên nhiên.'
  }
]

export const sortTutors = (tutors: Tutor[], key: SortKey, order: 'asc' | 'desc' = 'asc'): Tutor[] => {
  return [...tutors].sort((a, b) => {
    let comparison = 0
    if (key === 'firstName') {
      comparison = a.firstName.localeCompare(b.firstName)
    } else if (key === 'rating_avg') {
      comparison = a[key] - b[key]
    }
    return order === 'asc' ? comparison : -comparison
  })
}