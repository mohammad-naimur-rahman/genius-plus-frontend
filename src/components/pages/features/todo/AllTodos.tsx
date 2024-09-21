'use client'

import { HelpCircle, PencilLineIcon, Trash2 } from 'lucide-react'
import TableSkeletons from '~/components/reusable/skeletons/TableSkeletons'
import TableActions from '~/components/reusable/tables/table-actions'
import { Table, TableBody, TableCell, TableRow } from '~/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '~/components/ui/tooltip'
import { useGetAllTodosQuery } from '~/redux/features/todosApi'
import { isArrEmpty } from '~/utils/misc/isEmpty'

interface Props {
  date: string | undefined
}

export default function AllTodos({ date }: Props) {
  const { data, isLoading, isSuccess } = useGetAllTodosQuery({ date })
  return (
    <div className='mt-10'>
      <TableSkeletons isLoading={isLoading} className='mb-5' />
      {isSuccess ? (
        !isArrEmpty(data.data) ? (
          <Table className='mb-5'>
            <TableBody>
              {data.data.map(todo => (
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
                      <PencilLineIcon />
                      <Trash2 />
                    </TableActions>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className='mb-5 italic text-muted-foreground'>
            There&apos;re no plans for today yet. Let&apos;s start with creating one first or let&apos;s generate with
            AI
          </p>
        )
      ) : null}
    </div>
  )
}
