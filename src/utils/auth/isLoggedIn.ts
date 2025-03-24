'use client'
import { getCookie } from 'cookies-next'

export const isLoggedIn = () => {
  const token = getCookie('refreshToken')
  return Boolean(token)
}
