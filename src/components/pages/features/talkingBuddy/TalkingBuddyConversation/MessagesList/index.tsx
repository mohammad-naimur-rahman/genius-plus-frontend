import { type TalkingBuddyMessage } from '~/types/TalkingBuddy'
import Heading from './Heading'

interface Props {
  isThreadLoading: boolean
  isThreadSuccess: boolean
  name: string
  messages: TalkingBuddyMessage[]
}

export default function MessagesList({ isThreadLoading, isThreadSuccess, name }: Props) {
  return (
    <section className='h-[calc(50vh-40px)] bg-gray-100'>
      <Heading isThreadLoading={isThreadLoading} isThreadSuccess={isThreadSuccess} name={name} />
    </section>
  )
}
