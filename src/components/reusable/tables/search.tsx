'use client'

import { SearchIcon } from 'lucide-react'
import { type Dispatch, type InputHTMLAttributes, type SetStateAction, useEffect, useState } from 'react'
import useDebounce from '~/hooks/useDebounce'
import { cn } from '~/lib/utils'
import { type Params } from '~/types/common/Params'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  params: Params
  setparams: Dispatch<SetStateAction<Params>>
  inputClassName?: string
}

export default function Search({ params, setparams, inputClassName, className, ...props }: Props) {
  const [value, setValue] = useState(params.search || '')
  const debouncedSearch = useDebounce(value, 750)

  useEffect(() => {
    setparams(prev => ({ ...prev, search: debouncedSearch }))
  }, [debouncedSearch, setparams])

  return (
    <div className={cn('relative h-9 w-full max-w-2xl', className)}>
      <input
        className={cn(
          'flex h-9 w-full rounded-full border border-input bg-transparent py-1 pl-10 pr-3 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          inputClassName
        )}
        value={value}
        onChange={e => setValue(e.target.value)}
        {...props}
      />
      <SearchIcon className='absolute left-2.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground' />
    </div>
  )
}
