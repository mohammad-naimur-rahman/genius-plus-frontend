import { format } from 'date-fns'

export function formatDate(date: Date) {
  return date ? format(date, 'yyyy-MM-dd') : undefined
}

export const oneDayAhead = 24 * 60 * 60 * 1000
