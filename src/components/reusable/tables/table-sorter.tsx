import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react'
import { type Dispatch, type HTMLAttributes, type ReactNode, type SetStateAction } from 'react'
import { type Params } from '~/types/common/Params'

interface Props extends HTMLAttributes<HTMLDivElement> {
  params: Params
  setparams: Dispatch<SetStateAction<Params>>
  sortField: string
  children: ReactNode
}

export default function TableSorter({ params, setparams, sortField, children, ...props }: Props) {
  return (
    <div className='flex items-center gap-2' {...props}>
      {children}
      {params.sortBy === sortField ? (
        <>
          {params.sortOrder === 'asc' ? (
            <ChevronUp
              className='h-4 w-4 cursor-pointer'
              onClick={() => setparams({ ...params, sortBy: sortField, sortOrder: 'desc' })}
            />
          ) : (
            <ChevronDown
              className='h-4 w-4 cursor-pointer'
              onClick={() => setparams({ ...params, sortBy: sortField, sortOrder: 'asc' })}
            />
          )}
        </>
      ) : (
        <ChevronsUpDown
          className='h-4 w-4 cursor-pointer'
          onClick={() => setparams({ ...params, sortBy: sortField, sortOrder: 'asc' })}
        />
      )}
    </div>
  )
}
