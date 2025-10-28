export interface CalendarEvent {
  id: string;
  title: string;
  dateTime: Date;
  type: string;
  relatedInfo?: string;
  description?: string;
  location?: string;
}

const getMonday = (d: Date): Date => {
  d = new Date(d)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  return new Date(d.setDate(diff))
}

const today = new Date('2025-10-28T12:00:00')
const monday = getMonday(today)

export const myCalendarEvents: CalendarEvent[] = [
  {
    id: 'e1',
    title: 'Mở BTL môn Hóa học',
    dateTime: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate()),
    type: 'assignment_open',
    relatedInfo: 'Mở BTL1'
  },
  {
    id: 'e2',
    title: 'Hẹn với Lê Sang Hiếc',
    dateTime: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 1, 14, 0),
    type: 'session',
    relatedInfo: 'Trao đổi học tập'
  },
  {
    id: 'e5',
    title: 'Gặp mặt nhóm nghiên cứu',
    dateTime: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 1, 16, 30),
    type: 'session',
    relatedInfo: 'Trao đổi học tập'
  },
  {
    id: 'e5',
    title: 'Mở Bài tập quiz',
    dateTime: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 1, 18, 30),
    type: 'assignment_open',
    relatedInfo: 'Hạn 1 tuần'
  },
  {
    id: 'e3',
    title: 'Deadline BTL Mạng máy tính',
    dateTime: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 3, 23, 59),
    type: 'assignment_due', // Correct: Use the type value directly
    relatedInfo: 'Hạn nộp BTL 1'
  },
  {
    id: 'e4',
    title: 'Hẹn với TS. Giản',
    dateTime: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 2, 9, 30),
    type: 'session', // Correct: Use the type value directly
    relatedInfo: 'Trao đổi học thuật'
  },
  {
    id: 'e5',
    title: 'Deadline BTL',
    dateTime: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6, 23, 59),
    type: 'assignment_due', // Correct: Use the type value directly
    relatedInfo: 'Sửa BTL lần 1'
  }
].sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime())