'use client'

import { ListPlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import DrawerDialog from '~/components/reusable/common/DrawerDialog'
import Form from '~/components/reusable/form/form'
import { Input } from '~/components/reusable/form/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/reusable/form/select'
import { Textarea } from '~/components/reusable/form/textarea'
import { Button } from '~/components/ui/button'
import { useCreateTodoMutation } from '~/redux/features/todosApi'
import { convertTo12Hour } from '~/utils/date/convertTo12hour'
import { formatDate } from '~/utils/date/formatDate'
import { rtkErrorMessage } from '~/utils/error/errorMessage'
import { isObjEmpty } from '~/utils/misc/isEmpty'

export interface SingleTodoFormValues {
  title: string
  description?: string
  time_range_from: string
  time_range_to: string
  priority: 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Very High'
  time_range: string
  date: Date
}

interface Props {
  date: Date
}

export default function CreateSingleTodoForm({ date }: Props) {
  const methods = useForm<SingleTodoFormValues>()
  const {
    handleSubmit,
    reset,
    formState: { errors }
  } = methods

  const [open, setopen] = useState<boolean>(false)

  const [createTodo, { isLoading, isSuccess, isError, error }] = useCreateTodoMutation()

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
    void createTodo({ ...data, time_range: `${from} - ${to}`, date: formatDate(date) as unknown as Date })
  }

  useEffect(() => {
    if (isLoading) toast.loading('Creating todo...')
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
      <Button icon={<ListPlus />} iconPosition='right' onClick={() => setopen(true)}>
        Add a Todo
      </Button>
      <DrawerDialog
        title='Add a todo for the day'
        description='It will be added to the list of todos for the day at the end of all tasks. Later on you can update the
              order by dragging the task'
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

          <Button type='submit' icon={<ListPlus />} iconPosition='right'>
            Add a Todo
          </Button>
        </Form>
      </DrawerDialog>
    </>
  )
}
