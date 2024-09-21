export const convertTo12Hour = (time24: string) => {
  const [hours, minutes] = time24.split(':').map(Number)
  if (hours === undefined || minutes === undefined) {
    throw new Error('Invalid time format')
  }
  const period = hours >= 12 ? 'PM' : 'AM'
  const hours12 = hours % 12 || 12
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`
}

export function convertToTimeInputFormat(time: string): string | null {
  // Match the time string with AM/PM format
  const timeMatch = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i)

  if (!timeMatch) {
    return null // return null if input doesn't match the expected format
  }

  const [, hours, minutes, period] = timeMatch

  // Convert hours to 24-hour format
  let hours24 = parseInt(hours!, 10)
  if (period?.toUpperCase() === 'PM' && hours24 !== 12) {
    hours24 += 12
  } else if (period?.toUpperCase() === 'AM' && hours24 === 12) {
    hours24 = 0
  }

  // Ensure hours and minutes are 2 digits
  const formattedHours = hours24.toString().padStart(2, '0')
  const formattedMinutes = minutes?.padStart(2, '0')

  // Return the time in 24-hour format (HH:MM) for the input type="time"
  return `${formattedHours}:${formattedMinutes}`
}
