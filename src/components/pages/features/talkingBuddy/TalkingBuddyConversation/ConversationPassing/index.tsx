'use client'

import { Mic, Square } from 'lucide-react'
import { useState } from 'react'
import { SpeechRecorder } from '~/components/reusable/common/SpeechRecorder'

interface Props {
  refetch: () => void
}

export default function ConversationPassing({ refetch }: Props) {
  const [prompt, setprompt] = useState<string>('')
  const handleTranscriptChange = (transcript: string) => {
    setprompt(transcript)
  }
  return (
    <div className='flex h-[calc(50vh-40px)] flex-col items-center justify-end gap-y-4 bg-cyan-50 py-5 pb-20'>
      <p className='max-w-lg'>{prompt}</p>
      <SpeechRecorder
        onTranscriptChange={handleTranscriptChange}
        onTranscriptSubmit={() => console.log('Stopped listening')}
        MicIcon={<Mic className='size-10' strokeWidth={1} />}
        StopIcon={<Square className='size-7' strokeWidth={1} />}
        className='size-14'
      />
    </div>
  )
}
