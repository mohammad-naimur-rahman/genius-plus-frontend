export const convertTo12Hour = (time24: string) => {
  const [hours, minutes] = time24.split(':').map(Number)
  if (hours === undefined || minutes === undefined) {
    throw new Error('Invalid time format')
  }
  const period = hours >= 12 ? 'PM' : 'AM'
  const hours12 = hours % 12 || 12
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`
}
