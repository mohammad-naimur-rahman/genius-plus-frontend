import { type HTMLAttributes } from 'react'
import { Skeleton } from '~/components/ui/skeleton'
import { cn } from '~/lib/utils'

interface Props extends HTMLAttributes<HTMLDivElement> {
  isLoading: boolean
  className?: string
}

export default function TableSkeletons({ isLoading, className, ...rest }: Props) {
  return (
    isLoading && (
      <div className={cn('flex flex-col gap-y-1', className)} {...rest}>
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className='flex items-center justify-between gap-x-2'>
            <Skeleton className='h-9 w-full rounded-lg' />
          </div>
        ))}
      </div>
    )
  )
}
