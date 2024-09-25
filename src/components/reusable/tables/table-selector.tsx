'use client'

import { GridIcon, ListIcon } from 'lucide-react'
import { type Dispatch, type SetStateAction } from 'react'
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
        className={cn('cursor-pointer text-secondary-foreground', { 'text-muted-foreground': mode === 'list' })}
        onClick={() => {
          setmode('grid')
          onChange('grid')
        }}
      />
      <ListIcon
        className={cn('cursor-pointer text-secondary-foreground', {
          'text-muted-foreground': mode === 'grid'
        })}
        onClick={() => {
          setmode('list')
          onChange('list')
        }}
      />
    </div>
  )
}
