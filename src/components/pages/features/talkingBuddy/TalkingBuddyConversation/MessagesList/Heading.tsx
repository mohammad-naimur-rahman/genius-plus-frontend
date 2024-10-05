import BackLink from '~/components/reusable/common/back-link'
import DashboardHeading from '~/components/reusable/dashboard/dashboard-heading'
import { Skeleton } from '~/components/ui/skeleton'

interface Props {
  isThreadLoading: boolean
  isThreadSuccess: boolean
  name: string
}

export default function Heading({ isThreadLoading, isThreadSuccess, name }: Props) {
  return (
    <div>
      {isThreadLoading && <Skeleton className='mb-6 h-10 w-full max-w-lg rounded-lg' />}
      {isThreadSuccess && <DashboardHeading title={name} extra={<BackLink />} />}
    </div>
  )
}
