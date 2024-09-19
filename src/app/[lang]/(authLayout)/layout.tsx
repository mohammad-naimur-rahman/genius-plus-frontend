import { type ReactNode } from 'react'
import ThemeSwitcher from '~/components/common/ThemeSwitcher'

interface Props {
  children: ReactNode
}

export default function layout({ children }: Props) {
  return (
    <div className='relative'>
      <ThemeSwitcher className='absolute right-10 top-10 z-10' />
      {children}
    </div>
  )
}
