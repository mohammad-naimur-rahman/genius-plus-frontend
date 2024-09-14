'use client'

import { type Dispatch, type SetStateAction } from 'react'
import GridIcon from '~/components/icons/GridIcon'
import ListIcon from '~/components/icons/ListIcon'
import { cn } from '~/lib/utils'

export type TableMode = 'list' | 'grid'

interface Props {
  onChange?: (activeTab: string) => void
  mode: TableMode
  setmode: Dispatch<SetStateAction<TableMode>>
  className?: string
}

export default function TableSelector({ onChange = () => {}, mode, setmode, className }: Props) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <GridIcon
        className={cn('cursor-pointer text-text-gray-light', { 'text-text-primary': mode === 'grid' })}
        onClick={() => {
          setmode('grid')
          onChange('grid')
        }}
      />
      <ListIcon
        className={cn('cursor-pointer text-text-gray-light', {
          'text-text-primary': mode === 'list'
        })}
        onClick={() => {
          setmode('list')
          onChange('list')
        }}
      />
    </div>
  )
}
