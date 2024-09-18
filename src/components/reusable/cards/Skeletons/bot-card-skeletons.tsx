import { Skeleton } from '~/components/ui/skeleton'
import CardGrid from '../commonn/card-grid'
import { type CardSkeletonsProps } from './types'

export default function BotCardSkeletons({ isLoading, className }: CardSkeletonsProps) {
  return (
    <>
      {isLoading ? (
        <CardGrid className={className}>
          {Array.from({ length: 10 }, (_, i) => (
            <Skeleton key={i} className='h-72 w-52 rounded-lg' />
          ))}
        </CardGrid>
      ) : null}
    </>
  )
}
