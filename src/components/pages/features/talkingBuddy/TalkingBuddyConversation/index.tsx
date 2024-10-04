'use client'

import { useParams } from 'next/navigation'
import DashboardHeading from '~/components/reusable/dashboard/dashboard-heading'
import { Skeleton } from '~/components/ui/skeleton'
import { useGetTalkingBuddyConversationQuery, useGetTalkingBuddyThreadQuery } from '~/redux/features/talkingBuddyApi'

export default function TalkingBuddyConversation() {
  const { id } = useParams()
  // For rendering conversation name
  const {
    data: threadData,
    isSuccess: isThreadSuccess,
    isLoading: isThreadLoading
  } = useGetTalkingBuddyThreadQuery(id as string)

  // Fetching conversation messages
  const { data } = useGetTalkingBuddyConversationQuery(id as string)
  console.log(data?.data)
  return (
    <div className='mx-auto max-w-5xl'>
      {isThreadLoading && <Skeleton className='mb-6 h-10 w-full max-w-lg rounded-lg' />}
      {isThreadSuccess && <DashboardHeading title={threadData?.data?.name} />}
    </div>
  )
}
