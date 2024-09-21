import { getCookie } from 'cookies-next'
import { type User } from '~/types/User'
import { isJSONValid } from '../misc/isJSONValid'

export const getUserId = (): string | undefined => {
  const userData = getCookie('userData')
  if (!userData) return undefined
  if (isJSONValid(userData)) {
    const parsedUserData = JSON.parse(userData) as { id: string }
    return parsedUserData.id
  }
  return undefined
}

export const getUserData = (): User | undefined => {
  const userData = getCookie('userData')
  if (!userData) return undefined
  if (isJSONValid(userData)) {
    const parsedUserData = JSON.parse(userData) as User
    return parsedUserData
  }
  return undefined
}
