'use client'

import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import ConfirmationPrompt from '~/components/reusable/dashboard/confirmation-prompt'
import { Button } from '~/components/ui/button'
import { Calendar } from '~/components/ui/calendar'
import { useClearMyDaysTodoMutation, useGetAllTodosQuery } from '~/redux/features/todosApi'
import { formatDate, oneDayAhead } from '~/utils/date/formatDate'
import { rtkErrorMessage } from '~/utils/error/errorMessage'
import AllTodos from './AllTodos'
import CreateSingleTodoForm from './CreateSingleTodoForm'
import CreateTodoWithAIModal from './CreateTodoWithAIModal'

export default function AITodo() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const { data, isLoading, isSuccess } = useGetAllTodosQuery({ date: date ? formatDate(date) : undefined })

  const [openPrompt, setopenPrompt] = useState<boolean>(false)
  const [clearMyDay, { isLoading: isDeleteLoading, isSuccess: isDeleteSuccess, isError, error }] =
    useClearMyDaysTodoMutation()

  useEffect(() => {
    if (isDeleteSuccess) toast.success('Cleared my day successfully!')
    if (isError) toast.error(rtkErrorMessage(error))
  }, [isDeleteLoading, isDeleteSuccess, isError, error])

  return (
    <div>
      <div className='flex items-start gap-x-20'>
        <div className='w-full'>
          <AllTodos date={date} isLoading={isLoading} isSuccess={isSuccess} data={data!} />

          <div className='flex items-center gap-x-3'>
            {isSuccess &&
            (formatDate(new Date()) === (date && formatDate(date)) ||
              formatDate(new Date(Date.now() + oneDayAhead)) === (date && formatDate(date))) ? (
              <CreateSingleTodoForm />
            ) : null}

            {isSuccess && data?.data.length && formatDate(new Date()) === (date && formatDate(date)) ? (
              <Button
                icon={<Trash2 />}
                iconPosition='right'
                onClick={() => setopenPrompt(true)}
                isLoading={isDeleteLoading}
              >
                Clear my day
              </Button>
            ) : null}

            {(isSuccess && !data?.data.length && formatDate(new Date()) === (date && formatDate(date))) ||
            formatDate(new Date(Date.now() + oneDayAhead)) === (date && formatDate(date)) ? (
              <CreateTodoWithAIModal />
            ) : null}
          </div>
        </div>
        <Calendar
          mode='single'
          selected={date}
          onSelect={setDate}
          disabled={date => date >= new Date(Date.now() + oneDayAhead)}
          className='w-auto rounded-lg border'
        />
      </div>
      <ConfirmationPrompt
        open={openPrompt}
        onOpenChange={setopenPrompt}
        title="Are you sure clear todya's plan?"
        cb={clearMyDay}
      />
    </div>
  )
}
