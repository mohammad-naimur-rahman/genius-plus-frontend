'use client'

import { useParams } from 'next/navigation'
import { useGetTalkingBuddyConversationQuery, useGetTalkingBuddyThreadQuery } from '~/redux/features/talkingBuddyApi'
import ConversationPassing from './ConversationPassing'
import MessagesList from './MessagesList'

export default function TalkingBuddyConversation() {
  const { id } = useParams()
  // For rendering conversation name
  const {
    data: threadData,
    isSuccess: isThreadSuccess,
    isLoading: isThreadLoading
  } = useGetTalkingBuddyThreadQuery(id as string)

  // Fetching conversation messages
  const { data, refetch } = useGetTalkingBuddyConversationQuery(id as string)

  return (
    <div className=''>
      <MessagesList
        isThreadLoading={isThreadLoading}
        isThreadSuccess={isThreadSuccess}
        name={threadData?.data?.name ?? ''}
        messages={data?.data ?? []}
      />
      <ConversationPassing refetch={refetch} />
    </div>
  )
}
