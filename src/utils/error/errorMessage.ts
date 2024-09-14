import { AxiosError } from 'axios'

export const errorMessage = (error: Error): string => {
  if (error instanceof AxiosError) {
    const message = (error.response?.data as { message?: string })?.message
    console.error(message)
    return message ?? 'An unknown error occurred'
  } else {
    console.error(error.message)
    return error.message
  }
}

export const rtkErrorMessage = (error: { data?: { message?: string }; message?: string }): string => {
  const message = error.data?.message ?? error.message
  console.error(message)
  return message ?? 'An unknown error occurred'
}
