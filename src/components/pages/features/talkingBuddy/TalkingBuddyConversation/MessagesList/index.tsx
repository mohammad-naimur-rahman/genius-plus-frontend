import { useEffect, useRef } from 'react'
import { Skeleton } from '~/components/ui/skeleton'
import { cn } from '~/lib/utils'
import { type TalkingBuddyMessage } from '~/types/TalkingBuddy'
import ChatMsg from './ChatMsg'
import Heading from './Heading'

interface Props {
  isLoading: boolean
  isSuccess: boolean
  messages: TalkingBuddyMessage[]
}

export default function MessagesList({ isLoading, isSuccess, messages }: Props) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    // Scroll to bottom when component mounts or messages change
    scrollToBottom()
  }, [messages])

  return (
    <section className='flex h-[calc(60vh-40px)] flex-col pb-5'>
      <Heading />

      {isLoading && (
        <div className='flex h-full flex-col gap-y-4 overflow-y-auto py-3'>
          {Array.from({ length: 4 }, (_, idx) => (
            <Skeleton key={idx} className={cn('h-48 w-full max-w-2xl', { 'self-end': idx % 2 === 0 })} />
          ))}
        </div>
      )}

      {isSuccess && (
        <div className='flex h-full flex-col gap-y-4 overflow-y-auto py-3'>
          {messages.map(message => (
            <ChatMsg key={message?.id} message={message} />
          ))}

          <div ref={messagesEndRef} />
        </div>
      )}
    </section>
  )
}
