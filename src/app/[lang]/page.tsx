import { Button } from '~/components/ui/button'
import Link from '~/components/ui/llink'

export default function HomePage() {
  return (
    <main className='flex h-screen items-center justify-center bg-gradient-to-r from-fuchsia-500 to-cyan-500'>
      <div className='container flex flex-col items-center gap-y-4 text-balance text-center'>
        <h1 className='text-4xl font-bold text-white'>Welcome to Genius+</h1>
        <p className='text-white'>Genius+ is a full-stack TypeScript framework for Next.js.</p>
        <div className='flex items-center gap-x-3'>
          <Link href='/features'>
            <Button>Features</Button>
          </Link>
          <Link href='/login'>
            <Button variant='outline'>Login</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
