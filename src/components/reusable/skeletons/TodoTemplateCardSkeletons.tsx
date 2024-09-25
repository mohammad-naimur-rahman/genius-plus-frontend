import { Skeleton } from '~/components/ui/skeleton'
import CardGrid from '../cards/commonn/card-grid'

interface Props {
  isLoading: boolean
}

export default function TodoTemplateCardSkeletons({ isLoading }: Props) {
  if (isLoading) {
    return (
      <CardGrid total={4}>
        {Array.from({ length: 10 }, (_, i) => (
          <Skeleton key={i} className='h-48 w-full rounded-lg' />
        ))}
      </CardGrid>
    )
  }
}
