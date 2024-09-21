import { useCallback, useRef, useState } from 'react'
import toast from 'react-hot-toast'

interface UseSpeechRecognitionProps {
  onTranscriptChange: (transcript: string) => void
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
  resultIndex: number
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start: () => void
  stop: () => void
  onstart: ((this: SpeechRecognition, ev: Event) => void) | null
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void) | null
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void) | null
  onend: ((this: SpeechRecognition, ev: Event) => void) | null
}

declare global {
  interface Window {
    webkitSpeechRecognition?: new () => SpeechRecognition
    SpeechRecognition?: new () => SpeechRecognition
  }
}

export function useSpeechRecognition({ onTranscriptChange }: UseSpeechRecognitionProps) {
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const transcriptRef = useRef<string>('')

  const removeRepetitions = (newText: string): string => {
    const fullText = transcriptRef.current + ' ' + newText
    const words = fullText.split(/\s+/)
    const deduplicatedWords: string[] = []

    for (let i = 0; i < words.length; i++) {
      const currentPhrase = words
        .slice(i, i + 3)
        .join(' ')
        .toLowerCase()
      let isDuplicate = false

      for (let j = Math.max(0, deduplicatedWords.length - 9); j < deduplicatedWords.length - 2; j++) {
        const previousPhrase = deduplicatedWords
          .slice(j, j + 3)
          .join(' ')
          .toLowerCase()
        if (currentPhrase === previousPhrase) {
          isDuplicate = true
          break
        }
      }

      if (!isDuplicate) {
        deduplicatedWords.push(words[i]!)
      }
    }

    const result = deduplicatedWords.join(' ')
    transcriptRef.current = result
    return result
  }

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      recognitionRef.current.onend = null
    }
    setIsListening(false)
    toast.success('Mic stopped listening.')
  }, [])

  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error('Speech recognition is not supported in this browser.')
      return
    }

    if (!recognitionRef.current) {
      const SpeechRecognitionConstructor = window.SpeechRecognition ?? window.webkitSpeechRecognition

      if (!SpeechRecognitionConstructor) {
        toast.error('Speech recognition API not supported in this browser.')
        return
      }

      recognitionRef.current = new SpeechRecognitionConstructor()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onstart = () => {
        setIsListening(true)
        toast.success('Mic listening...')
      }

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = ''
        let finalTranscript = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event?.results?.[i]?.[0]?.transcript ?? ''
          if (event?.results?.[i]?.isFinal) {
            finalTranscript += transcript + ' '
          } else {
            interimTranscript = transcript
          }
        }

        if (finalTranscript) {
          const deduplicatedText = removeRepetitions(finalTranscript)
          onTranscriptChange(deduplicatedText + (interimTranscript ? ' ' + interimTranscript : ''))
        } else if (interimTranscript) {
          onTranscriptChange(transcriptRef.current + ' ' + interimTranscript)
        }
      }

      recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
        if (event.error === 'not-allowed') {
          toast.error('Microphone access is blocked.')
        } else {
          toast.error('Error occurred during speech recognition.')
        }
        stopListening()
      }

      recognitionRef.current.onend = () => {
        if (isListening) {
          recognitionRef.current?.start()
        }
      }
    }

    recognitionRef.current.start()
  }, [isListening, onTranscriptChange, stopListening])

  return {
    isListening,
    startListening,
    stopListening
  }
}