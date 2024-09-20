'use client'

import { Mic, Sparkles, SquareDashedMousePointer } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Form from '~/components/reusable/form/form'
import { Textarea } from '~/components/reusable/form/textarea'
import { Button } from '~/components/ui/button'
import { Calendar } from '~/components/ui/calendar'
import AllTodos from './AllTodos'
import CreateSingleTodoForm from './CreateSingleTodoForm'

interface TodoFormValues {
  text: string
}

export default function AITodo() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const methods = useForm<TodoFormValues>()
  const { handleSubmit } = methods

  const onSubmit = (data: TodoFormValues) => {
    console.log(data)
  }

  return (
    <div>
      <div className='flex items-start gap-x-20'>
        <div className='w-1/2'>
          <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <div className='flex gap-x-10'>
              <p className='mb-5 text-justify text-muted-foreground'>
                Describe your day in the textbox below or tell us what you want to do by the voice button, or use a todo
                template for easy planning.
              </p>
              <Button icon={<SquareDashedMousePointer />} className='mt-1 border' variant='secondary'>
                Choose Template
              </Button>
            </div>
            <Textarea name='text' label="Today's plan" placeholder="Write about today's plan" required rows={5} />
            <div className='flex items-center justify-between gap-x-2'>
              <Button type='submit' icon={<Sparkles />}>
                Generate Today&apos;s Plan
              </Button>
              <Button size='icon' variant='outline' className='rounded-full border-muted-foreground'>
                <Mic className='size-5' />
              </Button>
            </div>
          </Form>
        </div>
        <Calendar
          mode='single'
          selected={date}
          onSelect={setDate}
          disabled={date => date >= new Date(Date.now() + 24 * 60 * 60 * 1000)}
          className='w-auto rounded-lg border'
        />
      </div>

      <AllTodos />

      <CreateSingleTodoForm />
    </div>
  )
}
