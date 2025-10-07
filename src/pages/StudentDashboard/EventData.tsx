export interface Event {
  id: string;
  name: string;
  tutor: string;
  time: string;
  description: string;
  image: string;
  faculty: 'Khoa Học Và Kĩ Thuật Máy Tính' | 'Kỹ Thuật Xây Dựng' | 'Điện - Điện Tử' | 'Cơ Khí' | 'Kỹ Thuật Hóa Học';
  slots: { left: number; total: number };
}

export type FacultyName = Event['faculty'];
export const FACULTIES: FacultyName[] = [
  'Khoa Học Và Kĩ Thuật Máy Tính',
  'Kỹ Thuật Xây Dựng',
  'Điện - Điện Tử',
  'Cơ Khí',
  'Kỹ Thuật Hóa Học'
]

const mockEvents: Event[] = [
  {
    id: 'e001',
    name: 'Workshop on React Hooks and State Management',
    tutor: 'Dr. Tuan Anh',
    time: '2025-10-15 14:00',
    description: 'A hands-on session exploring best practices for using useEffect, useContext, and custom hooks in large-scale applications.',
    image: 'https://placehold.co/100x100/1D4ED8/FFFFFF?text=React',
    faculty: 'Khoa Học Và Kĩ Thuật Máy Tính',
    slots: { left: 15, total: 50 }
  },
  {
    id: 'e002',
    name: 'Advanced Structural Analysis Seminar',
    tutor: 'Prof. Le Thuy',
    time: '2025-10-20 09:30',
    description: 'Deep dive into finite element methods (FEM) and non-linear analysis of complex civil structures.',
    image: 'https://placehold.co/100x100/059669/FFFFFF?text=Civil',
    faculty: 'Kỹ Thuật Xây Dựng',
    slots: { left: 5, total: 30 }
  },
  {
    id: 'e003',
    name: 'Introduction to PLC Programming',
    tutor: 'Mr. Hoang Long',
    time: '2025-10-25 16:00',
    description: 'Learn the fundamentals of Programmable Logic Controllers (PLCs) and their application in industrial automation systems.',
    image: 'https://placehold.co/100x100/DC2626/FFFFFF?text=PLC',
    faculty: 'Điện - Điện Tử',
    slots: { left: 40, total: 40 }
  },
  {
    id: 'e004',
    name: 'Green Chemistry and Sustainable Synthesis',
    tutor: 'Dr. Mai Phuong',
    time: '2025-11-01 13:30',
    description: 'Exploring environmentally friendly chemical processes and reducing hazardous waste in laboratory settings. Focus on new synthesis techniques.',
    image: 'https://placehold.co/100x100/F97316/FFFFFF?text=Chem',
    faculty: 'Kỹ Thuật Hóa Học',
    slots: { left: 10, total: 25 }
  },
  {
    id: 'e005',
    name: 'Data Science with Python',
    tutor: 'Ms. Ngoc',
    time: '2025-11-05 18:00',
    description: 'Practical introduction to data analysis, machine learning libraries (Pandas, Scikit-learn), and visualization tools.',
    image: 'https://placehold.co/100x100/1D4ED8/FFFFFF?text=Data',
    faculty: 'Khoa Học Và Kĩ Thuật Máy Tính',
    slots: { left: 2, total: 35 }
  },
  {
    id: 'e006',
    name: 'Fundamentals of Machine Design',
    tutor: 'Mr. Tran',
    time: '2025-11-10 10:00',
    description: 'A deep dive into materials, stress analysis, and safety factors for mechanical components.',
    image: 'https://placehold.co/100x100/6B7280/FFFFFF?text=Mech',
    faculty: 'Cơ Khí',
    slots: { left: 20, total: 30 }
  }
]

export const searchEvents = (searchTerm: string, facultyFilter: FacultyName | 'all'): Event[] => {
  let results = mockEvents

  if (facultyFilter !== 'all') {
    results = results.filter(event => event.faculty === facultyFilter)
  }

  if (searchTerm && searchTerm.trim() !== '') {
    const lowerCaseTerm = searchTerm.toLowerCase().trim()
    results = results.filter(event =>
      event.name.toLowerCase().includes(lowerCaseTerm) ||
      event.description.toLowerCase().includes(lowerCaseTerm)
    )
  }

  return results
}