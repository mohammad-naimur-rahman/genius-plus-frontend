import { type HTMLAttributes } from 'react'
import { Skeleton } from '~/components/ui/skeleton'
import CardGrid from '../cards/commonn/card-grid'

interface Props extends HTMLAttributes<HTMLDivElement> {
  isLoading: boolean
  className?: string
  limit?: number
}

export default function ImageSkeletons({ isLoading, className, limit, ...rest }: Props) {
  return (
    isLoading && (
      <CardGrid className={className} {...rest}>
        {Array.from({ length: limit || 10 }, (_, i) => (
          <Skeleton key={i} className='h-72 w-full' />
        ))}
      </CardGrid>
    )
  )
}
