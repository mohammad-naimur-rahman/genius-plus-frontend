import botPlacehoder from '~/assets/icons/common/botPlaceholder.png'
import userPlacehoder from '~/assets/icons/common/userPlaceholder.png'
import MarkdownRenderer from '~/components/reusable/chat/MarkdownRenderer'
import { Img } from '~/components/ui/img'
import { type TalkingBuddyMessage } from '~/types/TalkingBuddy'

interface Props {
  message: TalkingBuddyMessage
}
export default function ChatMsg({ message }: Props) {
  const { content, role } = { ...message }

  if (role === 'assistant') {
    return (
      <div className='flex w-full max-w-2xl flex-col gap-x-3 gap-y-2 pl-0 pr-10 sm:pl-4 md:flex-row'>
        <Img src={botPlacehoder} alt='Bot' className='aspect-square size-10 object-cover' />
        <div className='rounded-lg border bg-muted/60 p-1.5 sm:p-2'>
          <MarkdownRenderer className='text-sm sm:text-base'>{content}</MarkdownRenderer>
        </div>
      </div>
    )
  }

  return (
    <div className='flex w-full max-w-2xl flex-col-reverse items-end justify-end gap-x-3 gap-y-2 self-end pl-10 pr-0 sm:pr-4 md:flex-row md:items-start'>
      <div className='rounded-lg border bg-secondary p-1.5 sm:p-2'>
        <MarkdownRenderer className='text-sm sm:text-base'>{content}</MarkdownRenderer>
      </div>
      {role === 'user' && <Img src={userPlacehoder} alt='User' className='size-10' />}
    </div>
  )
}
