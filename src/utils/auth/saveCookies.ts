import { setCookie } from 'cookies-next'
import { type User } from '~/types/User'
import { calculateTokenExpiration } from './calculateTokenExpiration'

export const saveCookies = (accessToken: string, refreshToken: string, userData: User, rememberMe = false) => {
  if (rememberMe) {
    setCookie('refreshToken', refreshToken, { maxAge: calculateTokenExpiration(refreshToken) })
    setCookie('accessToken', accessToken, { maxAge: calculateTokenExpiration(accessToken) })

    setCookie('userData', JSON.stringify(userData), {
      maxAge: calculateTokenExpiration(refreshToken)
    })
  } else {
    setCookie('refreshToken', refreshToken)
    setCookie('accessToken', accessToken)

    setCookie('userData', JSON.stringify(userData))
  }
}
