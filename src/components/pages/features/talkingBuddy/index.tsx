'use client'

import { ListStart, Speech, StepForward } from 'lucide-react'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import Typography from '~/components/ui/typography'
import usePush from '~/hooks/usePush'
import { useGetTalkingBuddyThreadsQuery } from '~/redux/features/talkingBuddyApi'
import ChoosePreviousSession from './ChoosePreviousSession'
import CreateTalkingBuddyThreadModal from './CreateTalkingBuddyThreadModal'

export default function TalkingBuddy() {
  const push = usePush()
  const [sheetOpen, setsheetOpen] = useState<boolean>(false)
  const { data, isLoading, isError, isSuccess } = useGetTalkingBuddyThreadsQuery()
  console.log(data?.data)
  return (
    <div className='mt-32 flex flex-col items-center justify-center gap-y-5 text-balance text-center'>
      <Typography variant='h3' className='flex items-center gap-x-3 font-medium'>
        Start Practicing <Speech className='size-10' strokeWidth={1.5} />
      </Typography>
      <p className='max-w-lg font-medium text-muted-foreground'>
        Choose a session to start practicing, you will record a voice and get response in audio to mimic talking your
        with friends
      </p>

      <div className='flex flex-wrap items-center gap-x-3 gap-y-2'>
        <CreateTalkingBuddyThreadModal />
        <Button
          variant='secondary'
          icon={<StepForward />}
          iconPosition='right'
          disabled={isLoading || isError || !data?.data?.length}
          onClick={() => push(`/features/talking-buddy/${data?.data?.at(-1)?.id}`)}
        >
          Continue last session
        </Button>
        <Button variant='outline' icon={<ListStart />} iconPosition='right' onClick={() => setsheetOpen(true)}>
          Choose from saved sessions
        </Button>
      </div>
      <ChoosePreviousSession
        sheetOpen={sheetOpen}
        setsheetOpen={setsheetOpen}
        isLoading={isLoading}
        isSuccess={isSuccess}
        sessions={data?.data}
      />
    </div>
  )
}
