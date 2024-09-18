import { type SerializedError } from '@reduxjs/toolkit'
import { type FetchBaseQueryError } from '@reduxjs/toolkit/query'
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

export const rtkErrorMessage = (error: FetchBaseQueryError | SerializedError): string => {
  if ('data' in error && typeof error.data === 'object' && error.data !== null && 'message' in error.data) {
    console.error(error.data)
    return (error.data as { message?: string }).message ?? 'An unknown error occurred'
  }

  if ('message' in error) {
    console.error(error)
    return error.message ?? 'An unknown error occurred'
  }

  return 'An unknown error occurred'
}
