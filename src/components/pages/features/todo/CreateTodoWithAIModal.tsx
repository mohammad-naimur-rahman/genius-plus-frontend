'use client'

import { Sparkles, SquareDashedMousePointer } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import DrawerDialog from '~/components/reusable/common/DrawerDialog'
import { SpeechRecorder } from '~/components/reusable/common/SpeechRecorder'
import Form from '~/components/reusable/form/form'
import { Textarea } from '~/components/reusable/form/textarea'
import { Button } from '~/components/ui/button'
import { useCreateTodoForADaywithAIMutation } from '~/redux/features/todosApi'
import { formatDate, isTomorrow } from '~/utils/date/formatDate'
import { rtkErrorMessage } from '~/utils/error/errorMessage'
import { isObjEmpty } from '~/utils/misc/isEmpty'
import ChooseTemplateForTodoSheet from './ChooseTemplateForTodoSheet'

export interface TodoWithAIFormValues {
  text: string
  date: Date
}

interface Props {
  date: Date
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
  const [sheetOpen, setsheetOpen] = useState<boolean>(false)

  const [createTodo, { isLoading, isSuccess, isError, error }] = useCreateTodoForADaywithAIMutation()

  const onSubmit = (data: TodoWithAIFormValues) => {
    if (isObjEmpty(errors)) {
      reset()
      setOpen(false)
    }
    void createTodo({ ...data, date: formatDate(date) as unknown as Date })
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
    <>
      <Button icon={<Sparkles />} onClick={() => setOpen(true)}>
        Generate {isTomorrow(date) ? 'tomorrow' : 'today'}
        &apos;s Plan
      </Button>
      <DrawerDialog
        title='Add todos for the day with AI'
        description={
          <div className='flex flex-col gap-x-10 gap-y-3 sm:flex-row'>
            <p className='text-justify text-muted-foreground'>
              Describe your day by typing, using voice or choose a template to get started
            </p>
            <ChooseTemplateForTodoSheet sheeetOpen={sheetOpen} setsheetOpen={setsheetOpen} setValue={setValue} />
            <Button
              className='mt-1 border'
              variant='secondary'
              icon={<SquareDashedMousePointer />}
              onClick={() => setsheetOpen(true)}
            >
              Choose Template
            </Button>
          </div>
        }
        open={open}
        setopen={setOpen}
      >
        <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Textarea name='text' label="Today's plan" placeholder="Write about today's plan" required rows={5} />
          <div className='flex items-center justify-between gap-x-2'>
            <Button type='submit' icon={<Sparkles />}>
              Generate {isTomorrow(date) ? 'tomorrow' : 'today'}
              &apos;s Plan
            </Button>
            <SpeechRecorder onTranscriptChange={handleTranscriptChange} />
          </div>
        </Form>
      </DrawerDialog>
    </>
  )
}
