import { getCookie } from 'cookies-next'
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
