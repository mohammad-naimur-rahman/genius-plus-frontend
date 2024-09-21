import { format } from 'date-fns'

export function formatDate(date: Date) {
  return date ? format(date, 'yyyy-MM-dd') : undefined
}

export const oneDayAhead = 24 * 60 * 60 * 1000

export const isToday = (date: Date) => {
  return date && formatDate(date) === formatDate(new Date())
}

export const isTomorrow = (date: Date) => {
  return date && formatDate(date) === formatDate(new Date(Date.now() + oneDayAhead))
}

export const isYesterday = (date: Date) => {
  return date && formatDate(date) === formatDate(new Date(Date.now() - oneDayAhead))
}
