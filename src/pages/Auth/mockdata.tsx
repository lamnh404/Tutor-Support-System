interface MockUser {
  username: string;
  password: string;
  role: 'client' | 'admin';
  name: string;
}

export const MOCK_USERS: MockUser[] = [
  { username: 'student1', password: 'password1', role: 'client', name: 'Nguyen Van A' },
  { username: 'lecturer1', password: 'password2', role: 'client', name: 'Lecturer One' },
  { username: 'admin1', password: 'password3', role: 'admin', name: 'Admin One' }
]