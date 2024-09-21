'use client'

import { format } from 'date-fns'
import { HelpCircle, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import ConfirmationPrompt from '~/components/reusable/dashboard/confirmation-prompt'
import TableSkeletons from '~/components/reusable/skeletons/TableSkeletons'
import TableActions from '~/components/reusable/tables/table-actions'
import { Skeleton } from '~/components/ui/skeleton'
import { Table, TableBody, TableCell, TableRow } from '~/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip'
import Typography from '~/components/ui/typography'
import { useDeleteTodoMutation } from '~/redux/features/todosApi'
import { type Response, type WithId } from '~/types/common/Response'
import { type Todo } from '~/types/Todo'
import { getUserData } from '~/utils/auth/getUserId'
import { formatDate, oneDayAhead } from '~/utils/date/formatDate'
import { rtkErrorMessage } from '~/utils/error/errorMessage'
import { isArrEmpty } from '~/utils/misc/isEmpty'
import UpdateTodoModal from './UpdateTodoModal'

interface Props {
  date: Date | undefined
  isLoading: boolean
  isSuccess: boolean
  data: Response<WithId<Todo>[]>
}

export default function AllTodos({ date, isLoading, isSuccess, data }: Props) {
  const [deleteId, setdeleteId] = useState<number | undefined>(undefined)
  const [openPrompt, setopenPrompt] = useState<boolean>(false)

  const [deleteTodo, { isSuccess: isDeleteSuccess, isError, error }] = useDeleteTodoMutation()

  useEffect(() => {
    if (isDeleteSuccess) toast.success('Todo deleted successfully')
    if (isError) toast.error(rtkErrorMessage(error))
  }, [isDeleteSuccess, isError, error])

  return (
    <div className='mb-5'>
      {isLoading ? (
        <div className='mb-5 space-y-2'>
          <Skeleton className='mb-5 h-12 w-2/3 max-w-lg' />
          <Skeleton className='h-7 w-full max-w-2xl' />
        </div>
      ) : null}

      {isSuccess ? (
        <Typography variant='h4' className='mb-5 font-light'>
          {getUserData()?.name}&apos;s plan for{' '}
          {date && formatDate(date) === formatDate(new Date())
            ? 'today'
            : date && formatDate(new Date(Date.now() - oneDayAhead)) === (date && formatDate(date))
              ? 'yesterday'
              : date && formatDate(new Date(Date.now() + oneDayAhead)) === (date && formatDate(date))
                ? 'tomorrow'
                : date && format(new Date(date), 'MMMM d')}
        </Typography>
      ) : null}

      <TableSkeletons isLoading={isLoading} />
      {isSuccess ? (
        !isArrEmpty(data?.data) ? (
          <Table>
            <TableBody>
              {data?.data?.map(todo => (
                <TableRow key={todo.id}>
                  <TableCell className='flex items-center gap-x-1'>
                    {todo.title}
                    {todo.description && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className='size-4 text-muted-foreground' />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{todo.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </TableCell>
                  <TableCell>{todo.time_range}</TableCell>
                  <TableCell>{todo.priority}</TableCell>
                  <TableCell>
                    <TableActions>
                      <UpdateTodoModal todo={todo} />
                      <Trash2
                        className='text-destructive'
                        onClick={() => {
                          setopenPrompt(true)
                          setdeleteId(todo.id)
                        }}
                      />
                    </TableActions>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : formatDate(new Date()) === (date && formatDate(date)) ||
          formatDate(new Date(Date.now() + oneDayAhead)) === (date && formatDate(date)) ? (
          <p className='italic text-muted-foreground'>
            There&apos;re no plans for {formatDate(new Date()) === (date && formatDate(date)) ? 'today' : 'tomorrrow'}{' '}
            yet. Let&apos;s start with creatingone first or let&apos;s generate with AI
          </p>
        ) : (
          <p className='italic text-muted-foreground'>
            There&apos;re no plans for{' '}
            {formatDate(new Date(Date.now() - oneDayAhead)) === (date && formatDate(date))
              ? 'yesterday'
              : date && format(date, 'MMMM d')}
          </p>
        )
      ) : null}
      <ConfirmationPrompt open={openPrompt} onOpenChange={setopenPrompt} cb={() => deleteTodo(deleteId!)} />
    </div>
  )
}
