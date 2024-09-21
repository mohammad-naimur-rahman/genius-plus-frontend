'use client'

import { Sparkles, SquareDashedMousePointer } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { SpeechRecorder } from '~/components/reusable/common/SpeechRecordert'
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

export default function CreateTodoWithAIModal({ date }: Props) {
  const methods = useForm<TodoWithAIFormValues>()
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = methods

  const [open, setOpen] = useState<boolean>(false)

  const [createTodo, { isLoading, isSuccess, isError, error }] = useCreateTodoForADaywithAIMutation()

  const onSubmit = (data: TodoWithAIFormValues) => {
    if (isObjEmpty(errors)) {
      reset()
      setOpen(false)
    }
    void createTodo(data)
  }

  const handleTranscriptChange = (transcript: string) => {
    setValue('text', transcript, { shouldValidate: true })
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
            <SpeechRecorder onTranscriptChange={handleTranscriptChange} />
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
