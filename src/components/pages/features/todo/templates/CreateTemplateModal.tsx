'use client'

import { ListPlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import DrawerDialog from '~/components/reusable/common/DrawerDialog'
import { SpeechRecorder } from '~/components/reusable/common/SpeechRecordert'
import Form from '~/components/reusable/form/form'
import { Input } from '~/components/reusable/form/input'
import { Textarea } from '~/components/reusable/form/textarea'
import { Button } from '~/components/ui/button'
import { useCreateTodoTemplateMutation } from '~/redux/features/todoTemplatesApi'
import { type TodoTemplate } from '~/types/TodoTemplate'
import { rtkErrorMessage } from '~/utils/error/errorMessage'
import { isObjEmpty } from '~/utils/misc/isEmpty'

export default function CreateTemplateModal() {
  const methods = useForm<TodoTemplate>()
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = methods

  const [open, setopen] = useState<boolean>(false)

  const [createTodoTemplate, { isLoading, isSuccess, isError, error }] = useCreateTodoTemplateMutation()

  const onSubmit = (data: TodoTemplate) => {
    if (isObjEmpty(errors)) {
      reset()
      setopen(false)
    }

    void createTodoTemplate(data)
  }

  const handleTranscriptChange = (transcript: string) => {
    setValue('instructions', transcript, { shouldValidate: true })
  }

  useEffect(() => {
    if (isLoading) toast.loading('Creating todo template...')
    if (isSuccess) {
      toast.dismiss()
      toast.success('Todo template created successfully!')
    }

    if (isError) {
      toast.dismiss()
      toast.error(rtkErrorMessage(error))
    }
  }, [isLoading, isSuccess, isError, error])

  return (
    <>
      <Button icon={<ListPlus />} iconPosition='right' onClick={() => setopen(true)}>
        Add a Todo Template
      </Button>
      <DrawerDialog
        title='Add a todo template'
        description="It can be later used for creating a day's todo easily. You can use it for your usual/typical day"
        open={open}
        setopen={setopen}
      >
        <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <div className='my-3 flex flex-wrap gap-x-4'>
            <Input
              name='title'
              label='Title'
              placeholder='Enter title'
              required
              containerClassName='w-full max-w-full'
            />
            <Textarea
              name='description'
              label='Description'
              placeholder='Enter description (optional)'
              containerClassName='w-full max-w-full'
              rows={4}
            />
            <Textarea
              name='instructions'
              label='Instructions'
              placeholder="Instructions to create a day's todo"
              containerClassName='w-full max-w-full'
              rows={5}
              required
            />
          </div>

          <div className='flex items-center justify-between gap-x-3'>
            <Button type='submit' icon={<ListPlus />} iconPosition='right'>
              Add a Todo Template
            </Button>

            <SpeechRecorder onTranscriptChange={handleTranscriptChange} />
          </div>
        </Form>
      </DrawerDialog>
    </>
  )
}
