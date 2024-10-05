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
      <div className='ml-4 flex w-full max-w-2xl gap-x-3 gap-y-2'>
        <Img src={botPlacehoder} alt='Bot' className='aspect-square size-10 rounded-full border object-cover p-0.5' />
        <div className='rounded-lg border bg-muted/60 p-2'>
          <MarkdownRenderer className='text-base'>{content}</MarkdownRenderer>
        </div>
      </div>
    )
  }

  return (
    <div className='mr-4 flex w-full max-w-2xl justify-end gap-x-3 gap-y-2 self-end'>
      <div className='rounded-lg border bg-secondary p-2'>
        <MarkdownRenderer className='text-base'>{content}</MarkdownRenderer>
      </div>
      {role === 'user' && <Img src={userPlacehoder} alt='User' className='size-10' />}
    </div>
  )
}
