'use client'

import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import ConfirmationPrompt from '~/components/reusable/dashboard/confirmation-prompt'
import { Button } from '~/components/ui/button'
import { Calendar } from '~/components/ui/calendar'
import { useClearMyDaysTodoMutation, useGetAllTodosQuery } from '~/redux/features/todosApi'
import { formatDate, isToday, isTomorrow, oneDayAhead } from '~/utils/date/formatDate'
import { rtkErrorMessage } from '~/utils/error/errorMessage'
import AllTodos from './AllTodos'
import CreateSingleTodoForm from './CreateSingleTodoForm'
import CreateTodoWithAIModal from './CreateTodoWithAIModal'

export default function AITodo() {
  const [date, setDate] = useState<Date>(new Date())
  const { data, isLoading, isSuccess } = useGetAllTodosQuery({ date: formatDate(date) })

  const [openPrompt, setopenPrompt] = useState<boolean>(false)
  const [clearMyDay, { isLoading: isDeleteLoading, isSuccess: isDeleteSuccess, isError, error }] =
    useClearMyDaysTodoMutation()

  useEffect(() => {
    if (isDeleteLoading) toast.loading('Clearing my day...')
    if (isDeleteSuccess) {
      toast.dismiss()
      toast.success('Cleared my day successfully!')
    }
    if (isError) {
      toast.dismiss()
      toast.error(rtkErrorMessage(error))
    }
  }, [isDeleteLoading, isDeleteSuccess, isError, error])

  return (
    <div>
      <div className='flex items-start gap-x-20'>
        <div className='w-full'>
          <AllTodos date={date} isLoading={isLoading} isSuccess={isSuccess} data={data!} />

          <div className='flex items-center gap-x-3'>
            {isSuccess && ((isToday(date) ?? isTomorrow(date)) ? <CreateSingleTodoForm date={date} /> : null)}

            {(isToday(date) ?? isTomorrow(date)) && isSuccess && data?.data.length ? (
              <Button
                variant='destructive'
                icon={<Trash2 />}
                iconPosition='right'
                onClick={() => setopenPrompt(true)}
                isLoading={isDeleteLoading}
              >
                {isToday(date) ? 'Clear my day' : "Clear tomorrow's plan"}
              </Button>
            ) : null}

            {(isToday(date) ?? isTomorrow(date)) && isSuccess && !data?.data.length ? (
              <CreateTodoWithAIModal date={date} />
            ) : null}
          </div>
        </div>
        <Calendar
          mode='single'
          selected={date}
          onSelect={newDate => newDate && setDate(newDate)}
          disabled={date => date >= new Date(Date.now() + oneDayAhead)}
          className='w-auto rounded-lg border'
        />
      </div>
      <ConfirmationPrompt
        open={openPrompt}
        onOpenChange={setopenPrompt}
        title="Are you sure clear todya's plan?"
        cb={() => clearMyDay(formatDate(date) ?? '')}
      />
    </div>
  )
}
