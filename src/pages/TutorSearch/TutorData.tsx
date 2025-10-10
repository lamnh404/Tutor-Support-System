// TutorData.tsx

// Define a specific type for the allowed faculty strings for better type safety.
export type Faculty = 'Khoa Học Và Kĩ Thuật Máy Tính' | 'Điện - Điện Tử' | 'Cơ Khí';

// Define the main Tutor interface.
export interface Tutor {
  id: string;
  name: string;
  image: string;
  faculty: Faculty;
  rating: number;
  description: string;
}

// Define the keys that can be used for sorting.
export type SortKey = 'name' | 'rating' | 'faculty';

export const initialTutors: Tutor[] = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2788&q=80',
    faculty: 'Khoa Học Và Kĩ Thuật Máy Tính',
    rating: 4.9,
    description: 'Chuyên gia về thuật toán và cấu trúc dữ liệu. Có kinh nghiệm giảng dạy cho sinh viên năm 1 và 2.'
  },
  {
    id: '2',
    name: 'Trần Thị B',
    image: 'https://images.unsplash.com/photo-1502823403499-6ccfcf20f692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80',
    faculty: 'Điện - Điện Tử',
    rating: 4.8,
    description: 'Giảng viên chuyên ngành vi mạch và hệ thống nhúng. Hướng dẫn sinh viên làm đồ án tốt nghiệp.'
  },
  {
    id: '3',
    name: 'Lê Minh C',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    faculty: 'Cơ Khí',
    rating: 4.7,
    description: 'Kỹ sư cơ khí chế tạo máy với 10 năm kinh nghiệm. Hỗ trợ các môn học về CAD/CAM và sức bền vật liệu.'
  },
  {
    id: '4',
    name: 'Phạm Thu D',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80',
    faculty: 'Khoa Học Và Kĩ Thuật Máy Tính',
    rating: 5.0,
    description: 'Chuyên gia về phát triển web full-stack với React và Node.js. Đam mê chia sẻ kiến thức thực tế.'
  },
  {
    id: '5',
    name: 'Hoàng Quốc V',
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2960&q=80',
    faculty: 'Điện - Điện Tử',
    rating: 4.6,
    description: 'Nghiên cứu sinh chuyên ngành xử lý tín hiệu số. Có thể dạy các môn toán cao cấp và lý thuyết mạch.'
  }
]

// Helper function to sort tutors based on a key and order.
export const sortTutors = (tutors: Tutor[], key: SortKey, order: 'asc' | 'desc' = 'asc'): Tutor[] => {
  return [...tutors].sort((a, b) => {
    let comparison = 0
    if (key === 'name' || key === 'faculty') {
      comparison = a[key].localeCompare(b[key])
    } else if (key === 'rating') {
      comparison = a[key] - b[key]
    }
    return order === 'asc' ? comparison : -comparison
  })
}

// Helper function to get unique faculty names for the filter dropdown.
export const getUniqueFaculties = (tutors: Tutor[]): Faculty[] => {
  const faculties = tutors.map(tutor => tutor.faculty)
  return Array.from(new Set(faculties))
}