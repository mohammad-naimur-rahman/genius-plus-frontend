'use client'

import { useParams } from 'next/navigation'
import { useGetTalkingBuddyConversationQuery } from '~/redux/features/talkingBuddyApi'
import ConversationPassing from './ConversationPassing'
import MessagesList from './MessagesList'

export default function TalkingBuddyConversation() {
  const { id } = useParams()
  // For rendering conversation name
  const { data, refetch, isLoading, isSuccess } = useGetTalkingBuddyConversationQuery(id as string)
  return (
    <>
      <MessagesList messages={data?.data ?? []} isLoading={isLoading} isSuccess={isSuccess} />
      <ConversationPassing refetch={refetch} />
    </>
  )
}
