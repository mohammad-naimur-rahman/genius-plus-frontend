import TalkingBuddyConversation from '~/components/pages/features/talkingBuddy/TalkingBuddyConversation'
import { genTitle } from '~/utils/misc/genTitle'

export const metadata = {
  title: genTitle('Conversation')
}
export default function TalkingBuddyConversationPage() {
  return <TalkingBuddyConversation />
}
