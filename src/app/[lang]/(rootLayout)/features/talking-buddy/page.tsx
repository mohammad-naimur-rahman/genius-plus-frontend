import TalkingBuddy from '~/components/pages/features/talkingBuddy'
import BackToFeatures from '~/components/reusable/common/BackToFeatures'
import DashboardHeading from '~/components/reusable/dashboard/dashboard-heading'
import Typography from '~/components/ui/typography'
import { genTitle } from '~/utils/misc/genTitle'

export const metadata = {
  title: genTitle('Talking Buddy')
}

export default function TalkingBuddyPage() {
  return (
    <>
      <DashboardHeading title='Talking Buddy' extra={<BackToFeatures />} />
      <Typography variant='h4' className='mb-5 font-light text-secondary-foreground'>
        Practice English with AI and get feedback
      </Typography>
      <TalkingBuddy />
    </>
  )
}
