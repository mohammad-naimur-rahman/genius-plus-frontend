export interface Response<T> {
  data: T
  message: string
}

export interface ResponseWithMeta<T> {
  data: T
  metadata: Metadata
  message: string
}

export interface Metadata {
  currentPage: number
  totalPage: number
  totalDocuments: number
}

export type WithId<T> = T & {
  _id: string
}
