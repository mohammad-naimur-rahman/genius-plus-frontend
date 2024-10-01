'use client'

import Typography from '~/components/ui/typography'
import { getUserData } from '~/utils/auth/getUserId'

export default function FeaturesHeading() {
  return (
    <div>
      <Typography variant='h1' className='mb-10'>
        {`Welcome back, ${getUserData()?.name}`}
      </Typography>
    </div>
  )
}
