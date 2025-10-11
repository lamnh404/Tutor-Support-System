// TutorData.tsx

export type Department = 'Khoa Học Và Kĩ Thuật Máy Tính' | 'Điện - Điện Tử' | 'Cơ Khí' | 'Kỹ Thuật Hóa Học' | 'Kinh Tế';

export interface Tutor {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  department: Department;
  expertise: string;
  rating_count: number;
  rating_avg: number;
  currMentee: number;
  maxMentee: number;
  description: string;
}

// Cập nhật SortKey để chỉ bao gồm các lựa chọn mong muốn
export type SortKey = 'firstName' | 'rating_avg';

export const initialTutors: Tutor[] = [
  {
    id: '1',
    firstName: 'Si',
    lastName: 'Lê Minh',
    avatarUrl: 'https://fcb-abj-pre.s3.amazonaws.com/img/jugadors/MESSI.jpg',
    department: 'Kinh Tế',
    expertise: 'Kinh Tế Lượng',
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
    department: 'Khoa Học Và Kĩ Thuật Máy Tính',
    expertise: 'Lập Trình Game',
    rating_count: 12,
    rating_avg: 4.9,
    currMentee: 5,
    maxMentee: 10,
    description: '4 Cúp Chung Kết Thế Giới. Chuyên gia lập trình game với hơn 10 năm kinh nghiệm trong ngành công nghiệp game AAA.'
  },
  {
    id: '3',
    firstName: 'Tùng',
    lastName: 'Nguyễn Thanh',
    avatarUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7zEEISvcs1XuhHOPNI0aUElsa46Fmv5NLDg&s',
    department: 'Điện - Điện Tử',
    expertise: 'Vi mạch & Hệ thống nhúng',
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
    department: 'Cơ Khí',
    expertise: 'CAD/CAM & Sức bền vật liệu',
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
    avatarUrl: 'https://scontent.fsgn14-1.fna.fbcdn.net/v/t39.30808-6/537309535_3157162737779473_3340922358978200204_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeH5XpOoxC9QseWZpzzBcHCe_FzX0vQpx1L8XNfS9CnHUv7UssAgrSKZpyXmZd-JWkabKvsct3CsBGVIvTW6I0XN&_nc_ohc=VxidwA1IV_oQ7kNvwG0Knzj&_nc_oc=AdmrGMompROezchNn-XVDVuHUiK0oSx5n9Pbh9gcApwE3JlVL_tn6jqhvR_U498EqNM&_nc_zt=23&_nc_ht=scontent.fsgn14-1.fna&_nc_gid=ndojlwshQZaH2m1woq--KA&oh=00_AfeXLvovFoVyfSumI_F86nSyQqpFjQfACGmyH04I3QMgdw&oe=68EF8EFB',
    department: 'Điện - Điện Tử',
    expertise: 'Điện Tử Viễn Thông',
    rating_count: 36,
    rating_avg: 5.0,
    currMentee: 3,
    maxMentee: 8,
    description: 'Mùa sau là mùa của chúng ta. Nghỉ học đi làm streamer full time.'
  },
  {
    id: '6',
    firstName: 'Thịnh',
    lastName: 'Phạm Sơn',
    avatarUrl: 'https://valo2asia.com/wp-content/uploads/2023/03/DSC00001-Edit-scaled-e1679474299336-1170x918.jpg',
    department: 'Khoa Học Và Kĩ Thuật Máy Tính',
    expertise: 'Lập Trình Web',
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
    department: 'Kỹ Thuật Hóa Học',
    expertise: 'Hóa Dược',
    rating_count: 15,
    rating_avg: 4.5,
    currMentee: 6,
    maxMentee: 12,
    description: 'Chuyên gia trong lĩnh vực hóa dược với nhiều năm kinh nghiệm nghiên cứu và phát triển thuốc.'
  },
  {
    id: '8',
    firstName: 'Độ',
    lastName: 'Phùng Thanh',
    avatarUrl: 'https://image.theinfluencer.vn/files/2023/4/imgs/file-1682306109865.jpg???',
    department: 'Kinh Tế',
    expertise: 'Kinh Tế Lượng',
    rating_count: 20,
    rating_avg: 4.4,
    currMentee: 7,
    maxMentee: 14,
    description: 'Hướng dẫn cách bán khô gà trên mạng xã hội.'
  },
  {
    id: '9',
    firstName: 'Độ',
    lastName: 'Phùng Thanh',
    avatarUrl: 'https://image.theinfluencer.vn/files/2023/4/imgs/file-1682306109865.jpg???',
    department: 'Kinh Tế',
    expertise: 'Kinh Tế Lượng',
    rating_count: 20,
    rating_avg: 4.4,
    currMentee: 15,
    maxMentee: 15,
    description: 'Hướng dẫn cách bán khô gà trên mạng xã hội.'
  }
]

// Hàm sắp xếp đã được đơn giản hóa theo SortKey
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

// Lấy danh sách các khoa duy nhất
export const getUniqueDepartments = (tutors: Tutor[]): Department[] => {
  const departments = tutors.map(tutor => tutor.department)
  return Array.from(new Set(departments))
}

// === HÀM MỚI ===
// Lấy danh sách chuyên môn duy nhất, có thể lọc theo khoa đã chọn
export const getUniqueExpertise = (tutors: Tutor[], department: Department | 'All'): string[] => {
  let filteredTutors = tutors
  // Nếu một khoa cụ thể được chọn, lọc gia sư theo khoa đó trước
  if (department !== 'All') {
    filteredTutors = tutors.filter(tutor => tutor.department === department)
  }
  const expertises = filteredTutors.map(tutor => tutor.expertise)
  return Array.from(new Set(expertises))
}