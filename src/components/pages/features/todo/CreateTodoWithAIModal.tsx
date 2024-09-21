'use client'

import { Mic, Sparkles, Square, SquareDashedMousePointer } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Form from '~/components/reusable/form/form'
import { Textarea } from '~/components/reusable/form/textarea'
import { Button } from '~/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '~/components/ui/dialog'
import { useCreateTodoForADaywithAIMutation } from '~/redux/features/todosApi'
import { isTomorrow } from '~/utils/date/formatDate'
import { rtkErrorMessage } from '~/utils/error/errorMessage'
import { isObjEmpty } from '~/utils/misc/isEmpty'

export interface TodoWithAIFormValues {
  text: string
}

interface Props {
  date: Date | undefined
}

// Define SpeechRecognition types
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

export default function CreateTodoWithAIModal({ date }: Props) {
  const methods = useForm<TodoWithAIFormValues>()
  const {
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors }
  } = methods

  const [open, setOpen] = useState<boolean>(false)
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const transcriptRef = useRef<string>('')

  const [createTodo, { isLoading, isSuccess, isError, error }] = useCreateTodoForADaywithAIMutation()

  const onSubmit = (data: TodoWithAIFormValues) => {
    if (isObjEmpty(errors)) {
      reset()
      setOpen(false)
    }
    void createTodo(data)
  }

  // Function to remove repetitions from the transcript
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

  // Handle mic and speech recognition
  const handleMicClick = () => {
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
          const transcript = event.results[i]?.[0]?.transcript ?? ''
          if (event.results[i]?.isFinal) {
            finalTranscript += transcript + ' '
          } else {
            interimTranscript = transcript
          }
        }

        if (finalTranscript) {
          const deduplicatedText = removeRepetitions(finalTranscript)
          setValue('text', deduplicatedText + (interimTranscript ? ' ' + interimTranscript : ''), {
            shouldValidate: true
          })
        } else if (interimTranscript) {
          setValue('text', transcriptRef.current + ' ' + interimTranscript, { shouldValidate: true })
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

    if (isListening) {
      stopListening()
    } else {
      transcriptRef.current = getValues('text') || ''
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      recognitionRef.current.onend = null
    }
    setIsListening(false)
    toast.success('Mic stopped listening.')
  }

  useEffect(() => {
    if (isLoading) toast.loading("Creating today's todos for you...")
    if (isSuccess) {
      toast.dismiss()
      toast.success('Todo created successfully!')
    }

    if (isError) {
      toast.dismiss()
      toast.error(rtkErrorMessage(error))
    }
  }, [isLoading, isSuccess, isError, error])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Sparkles className='mr-2 h-4 w-4' />
          Generate {isTomorrow(date) ? 'tomorrow' : 'today'}
          &apos;s Plan
        </Button>
      </DialogTrigger>
      <DialogContent className='p-3.5'>
        <DialogHeader>
          <DialogTitle>Add todos for the day with AI</DialogTitle>
          <DialogDescription>
            <div className='flex gap-x-10'>
              <p className='text-justify text-muted-foreground'>
                Describe your day by typing, using voice or choose a template to get started
              </p>
              <Button className='mt-1 border' variant='secondary'>
                <SquareDashedMousePointer className='mr-2 h-4 w-4' />
                Choose Template
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>

        <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Textarea name='text' label="Today's plan" placeholder="Write about today's plan" required rows={5} />
          <div className='flex items-center justify-between gap-x-2'>
            <Button type='submit'>
              <Sparkles className='mr-2 h-4 w-4' />
              Generate {isTomorrow(date) ? 'tomorrow' : 'today'}
              &apos;s Plan
            </Button>

            {isListening ? (
              <Button
                onClick={stopListening}
                size='icon'
                variant='outline'
                className='animate-pulse rounded-full border-destructive text-destructive hover:text-destructive'
              >
                <Square className='size-4' />
              </Button>
            ) : (
              <Button
                size='icon'
                variant='outline'
                className='rounded-full border-muted-foreground text-secondary-foreground'
                onClick={handleMicClick}
              >
                <Mic className='size-5' />
              </Button>
            )}
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
