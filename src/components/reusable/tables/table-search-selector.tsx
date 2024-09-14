import { type Dispatch, type HTMLAttributes, type SetStateAction } from 'react'
import { cn } from '~/lib/utils'
import { type Params } from '~/types/common/Params'
import Search from './search'
import TableSelector, { type TableMode } from './table-selector'

interface Props extends HTMLAttributes<HTMLDivElement> {
  params: Params
  setparams: Dispatch<SetStateAction<Params>>
  mode: TableMode
  setmode: Dispatch<SetStateAction<TableMode>>
  className?: string
  placeholder?: string
}

export default function TableSearchSelector({
  params,
  setparams,
  mode,
  setmode,
  className,
  placeholder,
  ...props
}: Props) {
  return (
    <div
      className={cn(
        'mb-6 flex flex-col items-end justify-between gap-x-5 gap-y-3 sm:flex-row sm:items-center',
        className
      )}
      {...props}
    >
      <Search
        searchValue={params.search}
        setsearchValue={val => setparams({ ...params, search: val })}
        className='w-full sm:w-[calc(100%-100px)]'
        placeholder={placeholder ?? 'Search'}
      />
      <TableSelector mode={mode} setmode={setmode} />
    </div>
  )
}
