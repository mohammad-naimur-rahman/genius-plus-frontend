'use client'

import { ListPlus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import Form from '~/components/reusable/form/form'
import { Input } from '~/components/reusable/form/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/reusable/form/select'
import { Button } from '~/components/ui/button'

export interface SingleTodoFormValues {
  title: string
  description?: string
  time_range: string
  priority: 'Very Low' | 'Low' | 'Medium' | 'High' | 'Very High'
}

export default function CreateSingleTodoForm() {
  const methods = useForm<SingleTodoFormValues>()
  const { handleSubmit } = methods

  const onSubmit = (data: SingleTodoFormValues) => {
    console.log(data)
  }
  return (
    <div>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className='flex items-start justify-between gap-x-4 [&>*]:w-1/4'>
          <Input name='title' label='Title' placeholder='Enter title' required />
          <Input name='description' label='Description' placeholder='Enter description (optional)' />
          <div className='flex items-center gap-x-2 [&>*]:w-1/2'>
            <Input name='time_range_from' type='time' label='From' placeholder='Enter time range' required />
            <Input name='time_range_to' type='time' label='To' placeholder='Enter time range' required />
          </div>
          <Select name='priority' label='Priority'>
            <SelectTrigger>
              <SelectValue placeholder='Select a priority' />
            </SelectTrigger>
            <SelectContent>
              {['Very Low', 'Low', 'Medium', 'High', 'Very High'].map(priority => (
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
    </div>
  )
}
