import { format } from 'date-fns'

export function formatDate(date: Date) {
  return date ? format(date, 'yyyy-MM-dd') : undefined
}
