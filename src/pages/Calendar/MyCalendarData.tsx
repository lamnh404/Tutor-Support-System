export type EventType = 'assignment_open' | 'assignment_due' | 'session' | 'other';

export interface CalendarEvent {
  id: string;
  title: string;
  dateTime: Date;
  type: string;
  relatedInfo?: string;
  description?: string;
  location?: string;
}

export const getWeekNumber = (d: Date): number => {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
  return weekNo
}

export const myCalendarEvents: CalendarEvent[] = [
  {
    id: 'e1',
    title: 'Mở BT Lớn CTDL',
    dateTime: new Date(2025, 9, 31, 9, 0),
    type: 'assignment_open',
    relatedInfo: 'CO2003',
    description: 'Mở trên BKeL.'
  },
  {
    id: 'e2',
    title: 'Hẹn với GS. Sang',
    dateTime: new Date(2025, 9, 28, 14, 0),
    type: 'session',
    relatedInfo: 'Lê Sang Hiếc',
    location: 'Phòng H1-201'
  },
  {
    id: 'e6',
    title: 'Deadline Quiz',
    dateTime: new Date(2025, 9, 28, 16, 0),
    type: 'assignment_due',
    relatedInfo: 'Lê Sang Hiếc',
    location: 'Phòng H1-201'
  },
  {
    id: 'e3',
    title: 'Deadline BT Mạng',
    dateTime: new Date(2025, 9, 30, 23, 59),
    type: 'assignment_due',
    relatedInfo: 'CO3005',
    description: 'Nộp file PDF.'
  },
  {
    id: 'e4',
    title: 'Hẹn với GS. Giản',
    dateTime: new Date(2025, 9, 29, 9, 30),
    type: 'session',
    relatedInfo: 'Đơn Văn Giản',
    location: 'Google Meet'
  },
  {
    id: 'e5',
    title: 'Deadline BT CTDL',
    dateTime: new Date(2025, 10, 2, 23, 59),
    type: 'assignment_due',
    relatedInfo: 'CO2003'
  }
].sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime())

export const getEventTypeColor = (type: string): string => {
  switch (type) {
  case 'assignment_open': return 'bg-blue-500'
  case 'assignment_due': return 'bg-red-500'
  case 'session': return 'bg-green-500'
  default: return 'bg-gray-400'
  }
}

export const getEventTypeStyle = (type: string): { gradient: string; text: string; dot: string } => {
  switch (type) {
  case 'assignment_open':
    return { gradient: 'bg-gradient-to-r from-blue-100 to-blue-200', text: 'text-blue-800', dot: 'bg-blue-500' }
  case 'assignment_due':
    return { gradient: 'bg-gradient-to-r from-red-100 to-red-200', text: 'text-red-800', dot: 'bg-red-500' }
  case 'session':
    return { gradient: 'bg-gradient-to-r from-green-100 to-green-200', text: 'text-green-800', dot: 'bg-green-500' }
  default:
    return { gradient: 'bg-gradient-to-r from-gray-100 to-gray-200', text: 'text-gray-800', dot: 'bg-gray-500' }
  }
}