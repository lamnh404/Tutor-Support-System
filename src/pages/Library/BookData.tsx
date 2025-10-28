export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  isFavorited: boolean;
  isInUse: boolean;
  description: string;
  publisher: string;
  publishYear: number;
  genre: string;
  coursesUsingBook: string[];
}

export const initialBooks: Book[] = [
  {
    id: '1',
    title: 'Cấu trúc dữ liệu và giải thuật',
    author: 'Nguyễn Trung Trực',
    coverImage: 'https://images.vnuhcmpress.edu.vn/Picture/2023/5/16/image-20230516140731083.jpg',
    isFavorited: true,
    isInUse: true,
    description: 'Quyển sách Cấu trúc dữ liệu và giải thuật là tài liệu học tập cho sinh viên chuyên ngành Công nghệ thông tin, Khoa học máy tính, Kỹ thuật máy tính, Công nghệ phần mềm của hệ đào tạo chính quy bậc đại học và bậc cao đẳng và lập trình viên.',
    publisher: 'NXB Đại học Quốc gia TP.HCM',
    publishYear: 2019,
    genre: 'Giáo trình',
    coursesUsingBook: ['Cấu trúc dữ liệu và giải thuật', 'Giải thuật nâng cao']
  },
  {
    id: '2',
    title: 'Giáo trình Mạng máy tính nâng cao',
    author: 'Huỳnh Nguyên Chính',
    coverImage: 'https://images.vnuhcmpress.edu.vn/Picture/2023/2013-10-01-03-07-03_Mang-may-tinh-nang-cao-Lon.jpg',
    isFavorited: false,
    isInUse: true,
    description: 'Tài liệu được biên soạn nhằm cung cấp những kiến thức nền tảng, giúp sinh viên nắm vững và vận dụng được các kỹ thuật phổ biến trên hạ tầng mạng. Từ đó, sinh viên có thể tự học các kiến thức chuyên sâu hơn.',
    publisher: 'NXB Đại học Quốc gia TP.HCM',
    publishYear: 2022,
    genre: 'Giáo trình',
    coursesUsingBook: ['Mạng máy tính']
  },
  {
    id: '3',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    coverImage: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1436202607i/3735293.jpg',
    isFavorited: true,
    isInUse: false,
    description: 'Even bad code can function. But if code isnt clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesnt have to be that way.',
    publisher: 'Prentice Hall',
    publishYear: 2008,
    genre: 'Sách tham khảo',
    coursesUsingBook: []
  },
  {
    id: '4',
    title: 'Thực hành Lập trình hướng đối tượng',
    author: 'Trần Anh Dũng',
    coverImage: 'https://images.vnuhcmpress.edu.vn/Picture/2023/2017-07-04-10-53-10_2017-05-18-05-10-02_2017-03-09-05-08-36_image001.jpg',
    isFavorited: false,
    isInUse: false,
    description: 'Giáo trình chi tiết về các nguyên tắc của lập trình hướng đối tượng (OOP) với các ví dụ minh họa bằng Java.',
    publisher: 'NXB Đại học Quốc gia TP.HCM',
    publishYear: 2021,
    genre: 'Giáo trình',
    coursesUsingBook: ['Lập trình hướng đối tượng']
  },
  {
    id: '5',
    title: 'Modern Operating Systems',
    author: 'Andrew S. Tanenbaum',
    coverImage: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1387702085i/166195.jpg',
    isFavorited: true,
    isInUse: true,
    description: 'For software development professionals and computer science students, Modern Operating Systems gives a solid conceptual overview of operating system design, including detailed case studies of Unix/Linux and Windows 2000.',
    publisher: 'Prentice Hall',
    publishYear: 2001,
    genre: 'Sách tham khảo',
    coursesUsingBook: ['Hệ điều hành']
  },
  {
    id: '6',
    title: 'Discrete Mathematics and its Applications',
    author: 'Kenneth H. Rosen',
    coverImage: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1387738050i/1800803.jpg',
    isFavorited: false,
    isInUse: true,
    description: 'Discrete Mathematics and its Applications is a focused introduction to the primary themes in a discrete mathematics course, as introduced through extensive applications, expansive discussion, and detailed exercise sets. These themes include mathematical reasoning, combinatorial analysis, discrete structures, algorithmic thinking, and enhanced problem-solving skills through modeling. Its intent is to demonstrate the relevance and practicality of discrete mathematics to all students. The Fifth Edition includes a more thorough and linear presentation of logic, proof types and proof writing, and mathematical reasoning. This enhanced coverage will provide students with a solid understanding of the material as it relates to their immediate field of study and other relevant subjects. The inclusion of applications and examples to key topics has been significantly addressed to add clarity to every subject.',
    publisher: 'McGraw-Hill Science/Engineering/Math',
    publishYear: 2002,
    genre: 'Sách tham khảo',
    coursesUsingBook: ['Cấu trúc rời rạc']
  },
  {
    id: '7',
    title: 'Nhi khoa - Tập 1',
    author: 'PGS.TS.BS Phạm Thị Minh Hồng',
    coverImage: 'https://images.vnuhcmpress.edu.vn/Picture/2023/z1965794606805_68cac5e4e8b612a16d11d447ea9d246f.jpg',
    isFavorited: false,
    isInUse: false,
    description: 'Sách do các giảng viên Bô môn Nhi - Đại Học Y Dược TP.HCM biên soạn nhằm cung cấp cho sinh viên và học viên kiến thức cơ bản về nhi khoa phát triển và nhi khoa bệnh lý. Nội dung sách gồm những kiến thức được cập nhật kết hợp với kinh nghiệm thực hành lâm sàng của giảng viên. Đây cũng là tài liệu rất hữu ích cho các bác sĩ chuyên khoa Nhi. Nhi Khoa I gồm 05 chương: Nhi khoa tổng quát, Hô hấp, Tiêu hóa, Huyết học và Thận - Nội tiết.',
    publisher: 'NXB Đại học Quốc gia TP.HCM',
    publishYear: 2020,
    genre: 'Sách tham khảo',
    coursesUsingBook: []
  }
]