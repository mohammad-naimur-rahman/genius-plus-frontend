export interface Response<T> {
  data: T
  message: string
}

export interface ResponseWithMeta<T> {
  data: T
  meta: Metadata
  message: string
}

export interface ResponseWithTokens<T> {
  data: T
  tokens: Tokens
  message: string
}

export interface Tokens {
  accessToken: string
  refreshToken: string
}

export interface Metadata {
  total: number
  limit: number
  page: number
}

export type WithId<T> = T & {
  id: number
}
