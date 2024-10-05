'use client'

import { Mic, Square } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { SpeechRecorder } from '~/components/reusable/common/SpeechRecorder'
import { useStream } from '~/hooks/useStream'
import { rtkErrorMessage } from '~/utils/error/errorMessage'

interface Props {
  refetch: () => void
}

export default function ConversationPassing({ refetch }: Props) {
  const { id } = useParams()
  const [prompt, setprompt] = useState<string>('')
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
    <div className='flex h-[calc(50vh-40px)] flex-col items-center justify-end gap-y-4 pb-20 pt-5'>
      <p className='max-w-lg text-lg font-light text-secondary-foreground'>{prompt || streamData}</p>
      <SpeechRecorder
        onTranscriptChange={handleTranscriptChange}
        onTranscriptSubmit={sendMsgFn}
        MicIcon={<Mic className='size-10' strokeWidth={1} />}
        StopIcon={<Square className='size-7' strokeWidth={1} />}
        className='size-14'
      />
    </div>
  )
}
