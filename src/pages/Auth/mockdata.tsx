// src/data.tsx
interface MockUser {
  username: string;
  password: string;
  role: 'student' | 'lecturer' | 'admin' | null;
  name: string;
  avatarUrl?: string;
}

export const MOCK_USERS: MockUser[] = [
  { username: 'student1', password: 'password1', role: 'student', name: 'Nguyen Van A', avatarUrl :'https://avatar.iran.liara.run/public/5' },
  { username: 'lecturer1', password: 'password2', role: 'lecturer', name: 'Lecturer One' },
  { username: 'admin1', password: 'password3', role: 'admin', name: 'Admin One' }
]