import { Button } from '~/components/ui/button'

export default function HomePage() {
  return (
    <main className='flex h-screen items-center justify-center bg-gradient-to-r from-fuchsia-500 to-cyan-500'>
      <div>
        <h1 className='text-4xl font-bold text-white'>Welcome to Genius+</h1>
        <p className='text-white'>
          Genius+ is a full-stack TypeScript framework for Next.js.
        </p>
        <Button className='mt-4'>Get Started</Button>
      </div>
    </main>
  )
}
