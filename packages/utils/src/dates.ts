import { format, isAfter, isBefore, startOfDay, endOfDay, addDays } from 'date-fns'

export function getTomorrowDate(): Date {
  return addDays(new Date(), 1)
}

export function isEveningTime(hour: number = 20): boolean {
  const now = new Date()
  const currentHour = now.getHours()
  return currentHour >= hour
}

export function formatDate(date: Date, formatString: string = 'PPP'): string {
  return format(date, formatString)
}

export function isPlanLocked(lockTime: Date): boolean {
  return isAfter(new Date(), lockTime)
}

export function getDefaultLockTime(): Date {
  const today = new Date()
  today.setHours(20, 0, 0, 0)
  return today
}