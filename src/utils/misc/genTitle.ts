import { APP_NAME } from '~/configs'

export function genTitle(title: string) {
  return `${title} | ${APP_NAME}`
}
