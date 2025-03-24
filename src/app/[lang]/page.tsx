import HomepageButtons from '~/components/pages/homepage/HomepageButtons'

export default function HomePage() {
  return (
    <main className='flex h-screen items-center justify-center gap-y-3 bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-center'>
      <div className='flex flex-col items-center justify-center gap-y-3'>
        <h1 className='text-4xl font-bold text-white'>Welcome to Genius+</h1>
        <p className='text-white'>Genius+ is a full-stack TypeScript framework for Next.js.</p>
        <HomepageButtons />
      </div>
    </main>
  )
}
