'use client'

import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { cn } from '~/lib/utils'

interface Props {
  className?: string
}

export default function ThemeSwitcher({ className }: Props) {
  const { setTheme, theme, systemTheme } = useTheme()
  const [hasMounted, setHasMounted] = useState(false)

  const currentTheme = theme === 'system' ? systemTheme : theme

  function toggleTheme() {
    return currentTheme === 'light' ? setTheme('dark') : setTheme('light')
  }

  useEffect(() => setHasMounted(true), [])

  if (!hasMounted)
    return (
      <span className='min-h-[28px] min-w-[28px] animate-pulse rounded-full border border-zinc-300 bg-zinc-200 p-2 dark:border-zinc-700 dark:bg-zinc-800' />
    )

  return (
    <button
      type='button'
      onClick={toggleTheme}
      className={cn('group rotate-0 rounded-full transition-all duration-300', className)}
      aria-label='Toggle Theme'
    >
      {currentTheme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  )
}
