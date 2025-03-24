'use client'
import { Button } from '~/components/ui/button'
import Link from '~/components/ui/llink'
import { isLoggedIn } from '~/utils/auth/isLoggedIn'

export default function HomepageButtons() {
  const loggedIn = isLoggedIn()
  return (
    <div className='flex items-center justify-center gap-x-3'>
      {loggedIn ? (
        <Link href='/features'>
          <Button>Features</Button>
        </Link>
      ) : (
        <Link href='/login'>
          <Button variant='secondary'>Login</Button>
        </Link>
      )}
    </div>
  )
}
