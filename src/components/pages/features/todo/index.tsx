'use client'

import { format } from 'date-fns'
import { useState } from 'react'
import { Calendar } from '~/components/ui/calendar'
import AllTodos from './AllTodos'
import CreateSingleTodoForm from './CreateSingleTodoForm'
import CreateTodoWithAIModal from './CreateTodoWithAIModal'

export default function AITodo() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div>
      <div className='flex items-start gap-x-20'>
        <div className='w-full'>
          <AllTodos date={date ? format(date, 'yyyy-MM-dd') : undefined} />

          <div className='flex items-center gap-x-3'>
            <CreateSingleTodoForm />
            <CreateTodoWithAIModal />
          </div>
        </div>
        <Calendar
          mode='single'
          selected={date}
          onSelect={setDate}
          disabled={date => date >= new Date(Date.now() + 24 * 60 * 60 * 1000)}
          className='w-auto rounded-lg border'
        />
      </div>
    </div>
  )
}
