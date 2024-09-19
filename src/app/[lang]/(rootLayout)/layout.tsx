import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { type ReactNode } from 'react'
import Logo from '~/components/common/Logo'
import ThemeSwitcher from '~/components/common/ThemeSwitcher'

interface Props {
  children: ReactNode
}

export default function layout({ children }: Props) {
  const cookiesStore = cookies()
  const accessToken = cookiesStore.get('accessToken')?.value
  const isAuth = !!accessToken
  if (!isAuth) {
    redirect('/login')
  }
  return (
    <div>
      <nav className='container flex h-20 items-center justify-between'>
        <Logo />
        <ThemeSwitcher />
      </nav>
      {children}
    </div>
  )
}
