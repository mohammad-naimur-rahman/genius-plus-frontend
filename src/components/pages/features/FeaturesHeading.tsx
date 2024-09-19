'use client'

import { getCookie } from 'cookies-next'
import Typography from '~/components/ui/typography'
import { type User } from '~/types/User'

export default function FeaturesHeading() {
  const userData = getCookie('userData')
  const userDataParsed: User | undefined = userData ? (JSON.parse(userData) as User) : undefined
  const userName = userDataParsed?.name
  return (
    <div>
      <Typography variant='h1' className='mb-10'>
        {`Welcome back, ${userName}`}
      </Typography>
    </div>
  )
}
