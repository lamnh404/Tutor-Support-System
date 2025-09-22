// src/data.tsx
interface MockUser {
  username: string;
  password: string;
  role: 'student' | 'lecturer' | 'admin' | null;
  name: string;
}

export const MOCK_USERS: MockUser[] = [
  { username: 'stu', password: 'passw', role: 'student', name: 'Nguyen Van A' },
  { username: 'lecturer1', password: 'password2', role: 'lecturer', name: 'Lecturer One' },
  { username: 'admin1', password: 'password3', role: 'admin', name: 'Admin One' }
]