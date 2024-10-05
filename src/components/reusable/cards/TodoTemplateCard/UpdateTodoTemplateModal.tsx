'use client'

import { PencilLine } from 'lucide-react'
import { type ReactNode, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Form from '~/components/reusable/form/form'
import { Input } from '~/components/reusable/form/input'
import { Textarea } from '~/components/reusable/form/textarea'
import { Button } from '~/components/ui/button'
import { useUpdateTodoTemplateMutation } from '~/redux/features/todoTemplatesApi'
import { type WithId } from '~/types/common/Response'
import { type TodoTemplate } from '~/types/TodoTemplate'
import { rtkErrorMessage } from '~/utils/error/errorMessage'
import { isObjEmpty } from '~/utils/misc/isEmpty'
import DrawerDialog from '../../common/DrawerDialog'
import { SpeechRecorder } from '../../common/SpeechRecorder'

interface Props {
  template: WithId<TodoTemplate>
  children: ReactNode
}
export default function UpdateTodoTemplateModal({ template, children }: Props) {
  // Updating template

  const methods = useForm<TodoTemplate>()
  const {
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = methods

  useEffect(() => {
    reset(template)
  }, [reset, template])

  const [open, setopen] = useState<boolean>(false)

  const [updateTodoTemplate, { isLoading, isSuccess, isError, error }] = useUpdateTodoTemplateMutation()

  const onSubmit = (data: TodoTemplate) => {
    if (isObjEmpty(errors)) {
      reset()
      setopen(false)
    }

    void updateTodoTemplate({
      id: template.id,
      body: data
    })
  }

  const handleTranscriptChange = (transcript: string) => {
    setValue('instructions', transcript, { shouldValidate: true })
  }

  useEffect(() => {
    if (isLoading) toast.loading('Updating todo template...')
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
      <span onClick={() => setopen(true)} className='cursor-pointer'>
        {children}
      </span>
      <DrawerDialog
        title='Update todo template'
        description="Update your todo template. It can be later used for creating a day's todo easily. You can use it for your usual/typical day"
        open={open}
        setopen={setopen}
      >
        {' '}
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
            <Button type='submit' icon={<PencilLine />}>
              Update todo template
            </Button>

            <SpeechRecorder onTranscriptChange={handleTranscriptChange} />
          </div>
        </Form>
      </DrawerDialog>
    </>
  )
}
