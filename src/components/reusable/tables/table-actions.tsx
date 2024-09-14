import React, { HTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

interface Props extends HTMLAttributes<HTMLDivElement> {
  classname?: string
  children?: React.ReactNode
}

export default function TableActions({ classname, children, ...props }: Props) {
  return (
    <div className={cn('flex gap-2 [&svg]:size-[18px] [&svg]:cursor-pointer', classname)} {...props}>
      {children}
    </div>
  )
}
