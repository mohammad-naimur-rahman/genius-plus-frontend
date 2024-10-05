import { useParams } from 'next/navigation'
import BackLink from '~/components/reusable/common/back-link'
import DashboardHeading from '~/components/reusable/dashboard/dashboard-heading'
import { Skeleton } from '~/components/ui/skeleton'
import { useGetTalkingBuddyThreadQuery } from '~/redux/features/talkingBuddyApi'

export default function Heading() {
  const { id } = useParams()
  const { data, isSuccess, isLoading } = useGetTalkingBuddyThreadQuery(id as string)

  return (
    <div>
      {isLoading && <Skeleton className='mb-6 h-10 w-full max-w-lg rounded-lg' />}
      {isSuccess && <DashboardHeading title={data?.data?.name} extra={<BackLink />} />}
    </div>
  )
}
