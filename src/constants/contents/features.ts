import { type StaticImageData } from 'next/image'
import todoImg from '~/assets/images/pages/features/todo.png'

export interface Feature {
  id: number
  title: string
  description: string
  href: string
  icon: StaticImageData | string
}

export const features = [
  {
    id: 1,
    title: 'AI Todo Builder',
    description: 'Enjoy a productive day with AI Todo Builder.',
    href: '/features/todo',
    icon: todoImg
  }
]
