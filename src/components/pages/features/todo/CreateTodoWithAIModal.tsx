'use client'

import { Mic, Sparkles, SquareDashedMousePointer } from 'lucide-react'
import { useEffect, useState } from 'react'
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
import { formatDate, oneDayAhead } from '~/utils/date/formatDate'
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
    formState: { errors }
  } = methods

  const [open, setopen] = useState<boolean>(false)

  const [createTodo, { isLoading, isSuccess, isError, error }] = useCreateTodoForADaywithAIMutation()

  const onSubmit = (data: TodoWithAIFormValues) => {
    if (isObjEmpty(errors)) {
      reset()
      setopen(false)
    }
    void createTodo(data)
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
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger>
        <Button icon={<Sparkles />}>
          {' '}
          Generate{' '}
          {date && formatDate(new Date(Date.now() + oneDayAhead)) === (date && formatDate(date)) ? 'tomorrow' : 'today'}
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
              <Button icon={<SquareDashedMousePointer />} className='mt-1 border' variant='secondary'>
                Choose Template
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>

        <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Textarea name='text' label="Today's plan" placeholder="Write about today's plan" required rows={5} />
          <div className='flex items-center justify-between gap-x-2'>
            <Button type='submit' icon={<Sparkles />}>
              Generate{' '}
              {date && formatDate(new Date(Date.now() + oneDayAhead)) === (date && formatDate(date))
                ? 'tomorrow'
                : 'today'}
              &apos;s Plan
            </Button>
            <Button size='icon' variant='outline' className='rounded-full border-muted-foreground'>
              <Mic className='size-5' />
            </Button>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
