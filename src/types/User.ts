export interface User {
  name: string
  email: string
  createdAt: string
  updatedAt: string
  role: 'user' | 'admin'
}
