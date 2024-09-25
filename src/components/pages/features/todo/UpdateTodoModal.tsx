'use client'

import { PencilLineIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import DrawerDialog from '~/components/reusable/common/DrawerDialog'
import Form from '~/components/reusable/form/form'
import { Input } from '~/components/reusable/form/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/reusable/form/select'
import { Textarea } from '~/components/reusable/form/textarea'
import { Button } from '~/components/ui/button'
import { useUpdateTodoMutation } from '~/redux/features/todosApi'
import { type WithId } from '~/types/common/Response'
import { type Todo } from '~/types/Todo'
import { convertTo12Hour, convertToTimeInputFormat } from '~/utils/date/convertTo12hour'
import { rtkErrorMessage } from '~/utils/error/errorMessage'
import { isObjEmpty } from '~/utils/misc/isEmpty'

export interface SingleTodoFormValues {
  title: string
  description?: string
  time_range_from: string
  time_range_to: string
  priority: 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Very High'
  time_range: string
}

interface Props {
  todo: WithId<Todo>
}

export default function UpdateTodoModal({ todo }: Props) {
  const methods = useForm<SingleTodoFormValues>()
  const {
    handleSubmit,
    reset,
    formState: { errors }
  } = methods

  useEffect(() => {
    reset({
      title: todo.title,
      description: todo?.description,
      time_range_from: convertToTimeInputFormat(todo.time_range.split(' - ')[0]!)!,
      time_range_to: convertToTimeInputFormat(todo.time_range.split(' - ')[1]!)!,
      priority: todo.priority
    })
  }, [todo, reset])

  const [open, setopen] = useState<boolean>(false)

  const [updateTodo, { isLoading, isSuccess, isError, error }] = useUpdateTodoMutation()

  const onSubmit = (data: SingleTodoFormValues) => {
    if (isObjEmpty(errors)) {
      const fromTime = new Date(`2000-01-01T${data.time_range_from}`)
      const toTime = new Date(`2000-01-01T${data.time_range_to}`)

      if (toTime <= fromTime) {
        toast.error('End time must be later than start time')
        return
      }
      reset()
      setopen(false)
    }

    const from = convertTo12Hour(data.time_range_from)
    const to = convertTo12Hour(data.time_range_to)
    void updateTodo({ id: todo.id, body: { ...data, time_range: `${from} - ${to}` } })
  }

  useEffect(() => {
    if (isLoading) toast.loading('Updating the todo...')
    if (isSuccess) {
      toast.dismiss()
      toast.success('Todo updated successfully!')
    }

    if (isError) {
      toast.dismiss()
      toast.error(rtkErrorMessage(error))
    }
  }, [isLoading, isSuccess, isError, error])

  return (
    <>
      <PencilLineIcon className='text-sky-500' onClick={() => setopen(true)} />
      <DrawerDialog
        title='Update a todo for the day'
        description='It will be updated to the list of todos for the day at the end of all tasks. Later on you can update the order by dragging the task'
        open={open}
        setopen={setopen}
      >
        <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <div className='my-3 flex flex-wrap gap-x-3.5'>
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
            <div className='flex items-center gap-x-2'>
              <Input name='time_range_from' type='time' label='From' placeholder='Enter time range' required />
              <Input name='time_range_to' type='time' label='To' placeholder='Enter time range' required />
            </div>
            <Select name='priority' label='Priority' required containerClassName='w-full max-w-48'>
              <SelectTrigger>
                <SelectValue placeholder='Select a priority' />
              </SelectTrigger>
              <SelectContent>
                {['Very Low', 'Low', 'Moderate', 'High', 'Very High'].map(priority => (
                  <SelectItem key={priority} value={priority}>
                    {priority}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type='submit' icon={<PencilLineIcon />} iconPosition='right'>
            Update Todo
          </Button>
        </Form>
      </DrawerDialog>
    </>
  )
}
