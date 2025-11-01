// src/pages/MyTutors/MyCalendarData.tsx

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

const getMonday = (d: Date): Date => {
  d = new Date(d)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  return new Date(d.setDate(diff))
}

const today = new Date('2025-10-28T12:00:00')
const monday = getMonday(today)

export const myCalendarEvents: CalendarEvent[] = [
  { id: 'e1', title: 'Mở BT Lớn CTDL', dateTime: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate(), 9, 0), type: 'assignment_open', relatedInfo: 'CO2003', description: 'Mở trên BKeL.' },
  { id: 'e2', title: 'Hẹn với GS. Sang', dateTime: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 1, 14, 0), type: 'session', relatedInfo: 'Lê Sang Hiếc', location: 'Phòng H1-201' },
  { id: 'e6', title: 'Deadline Quiz', dateTime: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 1, 16, 0), type: 'assignment_due', relatedInfo: 'Lê Sang Hiếc', location: 'Phòng H1-201' },
  { id: 'e3', title: 'Deadline BT Mạng', dateTime: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 3, 23, 59), type: 'assignment_due', relatedInfo: 'CO3005', description: 'Nộp file PDF.' },
  { id: 'e4', title: 'Hẹn với GS. Giản', dateTime: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 2, 9, 30), type: 'session', relatedInfo: 'Đơn Văn Giản', location: 'Google Meet' },
  { id: 'e5', title: 'Deadline BT CTDL', dateTime: new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + 6, 23, 59), type: 'assignment_due', relatedInfo: 'CO2003' }
].sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime())

export const getEventTypeColor = (type: string): string => {
  switch (type) {
  case 'assignment_open': return 'bg-blue-500'
  case 'assignment_due': return 'bg-red-500'
  case 'session': return 'bg-green-500'
  default: return 'bg-gray-400'
  }
}