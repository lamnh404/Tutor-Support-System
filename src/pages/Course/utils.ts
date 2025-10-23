import type { User } from '~/context/userContext.tsx'

export const getInitials = (user: User): string => {
  return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
}

export const getFullName = (user: User): string => {
  return `${user.lastName} ${user.firstName}`
}

export const isTutor = (user: User): boolean => {
  return user.roles.includes('TUTOR')
}