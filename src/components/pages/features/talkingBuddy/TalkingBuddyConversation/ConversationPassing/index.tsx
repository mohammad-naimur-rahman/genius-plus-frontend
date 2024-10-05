'use client'

import { Mic, Speech, Square } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { SpeechRecorder } from '~/components/reusable/common/SpeechRecorder'
import { Button } from '~/components/ui/button'
import { useSpeechSynthesis } from '~/hooks/useSpeechSynthesis'
import { useStream } from '~/hooks/useStream'
import { cn } from '~/lib/utils'
import { rtkErrorMessage } from '~/utils/error/errorMessage'

interface Props {
  refetch: () => void
}

export default function ConversationPassing({ refetch }: Props) {
  const { id } = useParams()
  const [prompt, setprompt] = useState<string>('')

  const { isSpeaking, startSpeaking, stopSpeaking } = useSpeechSynthesis()

  const handleTranscriptChange = (transcript: string) => {
    setprompt(transcript)
  }
  const [sendMsg, { isCompleted, isError, error, streamData }] = useStream(`/talkingBuddies/run/${id as string}`, {
    prompt
  })

  useEffect(() => {
    if (isCompleted) {
      setprompt('')
      toast.dismiss()
      console.log(streamData)
      if (streamData && typeof streamData === 'string') {
        startSpeaking(streamData)
      }
      refetch()
    }
    if (isError) toast.error(rtkErrorMessage(error!))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCompleted, isError, error, refetch])

  const sendMsgFn = () => {
    sendMsg()
    toast.loading('Sending message...')
  }

  return (
    <div className='flex h-[calc(40vh-60px)] flex-col items-center justify-end gap-y-4 rounded-lg bg-muted/50 px-3 pb-3 pt-3 sm:pb-10 md:pb-20'>
      <p
        className={cn(
          'max-w-xl text-balance text-center text-[15px] italic text-sky-600 dark:text-sky-400 sm:text-base md:text-lg',
          {
            'text-secondary-foreground': prompt
          }
        )}
      >
        {prompt || streamData || 'Start talking by clicking on the microphone...'}
      </p>
      {isSpeaking ? (
        <Button
          onClick={stopSpeaking}
          size='icon'
          variant='outline'
          className={cn('hover:text-destructiv size-14 animate-pulse rounded-full border-destructive text-destructive')}
        >
          <Speech className='size-8' strokeWidth={1.3} />
        </Button>
      ) : (
        <SpeechRecorder
          onTranscriptChange={handleTranscriptChange}
          onTranscriptSubmit={sendMsgFn}
          MicIcon={<Mic className='size-8' strokeWidth={1} />}
          StopIcon={<Square className='size-7' strokeWidth={1} />}
          className='size-14'
        />
      )}
    </div>
  )
}
