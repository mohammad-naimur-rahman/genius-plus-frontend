'use client'

import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Calendar } from '~/components/ui/calendar'
import { useGetAllTodosQuery } from '~/redux/features/todosApi'
import { formatDate } from '~/utils/date/formatDate'
import AllTodos from './AllTodos'
import CreateSingleTodoForm from './CreateSingleTodoForm'
import CreateTodoWithAIModal from './CreateTodoWithAIModal'

export default function AITodo() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const { data, isLoading, isSuccess } = useGetAllTodosQuery({ date: date ? formatDate(date) : undefined })

  return (
    <div>
      <div className='flex items-start gap-x-20'>
        <div className='w-full'>
          <AllTodos date={date} isLoading={isLoading} isSuccess={isSuccess} data={data!} />

          <div className='flex items-center gap-x-3'>
            {isSuccess && formatDate(new Date()) === (date && formatDate(date)) ? <CreateSingleTodoForm /> : null}

            {isSuccess && data?.data.length && formatDate(new Date()) === (date && formatDate(date)) ? (
              <Button icon={<Trash2 />} iconPosition='right'>
                Clear my day
              </Button>
            ) : null}
          </div>

          {isSuccess && !data?.data.length && formatDate(new Date()) === (date && formatDate(date)) ? (
            <CreateTodoWithAIModal />
          ) : null}
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
