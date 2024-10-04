'use client'

import { Mic, Square } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { useSpeechRecognition } from '~/hooks/useSpeechrecognition'
import { cn } from '~/lib/utils'

interface SpeechRecorderProps {
  onTranscriptChange: (transcript: string) => void
  MicIcon?: React.ReactNode
  StopIcon?: React.ReactNode
  onStop?: () => void
  className?: string
}

/**
 * Renders a customizable speech recorder component that allows the user to record speech and listen to the transcript.
 *
 * @param {SpeechRecorderProps} props - The component props.
 * @param {function} props.onTranscriptChange - A callback function that will be called with the transcript when it changes.
 * @param {React.ReactNode} [props.MicIcon] - Custom icon for the mic button (optional).
 * @param {React.ReactNode} [props.StopIcon] - Custom icon for the stop button (optional).
 * @param {string} [props.buttonClassName] - Custom styles for the buttons (optional).
 * @return {JSX.Element} The speech recorder component.
 *
 * @example
 * const handleTranscriptChange = (transcript: string) => {
 *   setValue('text', transcript, { shouldValidate: true })
 * }
 *
 * <SpeechRecorder
 *   onTranscriptChange={handleTranscriptChange}
 *   MicIcon={<CustomMicIcon />}
 *   StopIcon={<CustomStopIcon />}
 *   className="custom-button-styles"
 *   onStop={() => console.log('Stopped listening')}
 * />
 */
export function SpeechRecorder({
  onTranscriptChange,
  MicIcon = <Mic className='size-5' />,
  StopIcon = <Square className='size-4' />,
  className,
  onStop
}: SpeechRecorderProps) {
  const { isListening, startListening, stopListening } = useSpeechRecognition({ onTranscriptChange })

  const handleMicClick = () => {
    if (isListening) {
      if (onStop) onStop()
      stopListening()
    } else {
      startListening()
    }
  }

  if (isListening) {
    return (
      <Button
        onClick={handleMicClick}
        size='icon'
        variant='outline'
        className={cn(
          'animate-pulse rounded-full border-destructive text-destructive hover:text-destructive',
          className
        )}
      >
        {StopIcon}
      </Button>
    )
  }

  return (
    <Button
      onClick={handleMicClick}
      size='icon'
      variant='outline'
      className={cn('rounded-full border-muted-foreground text-secondary-foreground', className)}
    >
      {MicIcon}
    </Button>
  )
}
