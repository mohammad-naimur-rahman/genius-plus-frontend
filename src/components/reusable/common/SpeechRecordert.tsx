'use client'

import { Mic, Square } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { useSpeechRecognition } from '~/hooks/useSpeechrecognition'

interface SpeechRecorderProps {
  onTranscriptChange: (transcript: string) => void
  MicIcon?: React.ReactNode
  StopIcon?: React.ReactNode
  buttonClassName?: string
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
 * <SpeechRecorder
 *   onTranscriptChange={handleTranscriptChange}
 *   MicIcon={<CustomMicIcon />}
 *   StopIcon={<CustomStopIcon />}
 *   buttonClassName="custom-button-styles"
 * />
 */
export function SpeechRecorder({
  onTranscriptChange,
  MicIcon = <Mic className='size-5' />,
  StopIcon = <Square className='size-4' />,
  buttonClassName = ''
}: SpeechRecorderProps) {
  const { isListening, startListening, stopListening } = useSpeechRecognition({ onTranscriptChange })

  const handleMicClick = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  return (
    <Button
      onClick={handleMicClick}
      size='icon'
      variant='outline'
      className={`rounded-full ${
        isListening
          ? 'animate-pulse border-destructive text-destructive hover:text-destructive'
          : 'border-muted-foreground text-secondary-foreground'
      } ${buttonClassName}`}
    >
      {isListening ? StopIcon : MicIcon}
    </Button>
  )
}
