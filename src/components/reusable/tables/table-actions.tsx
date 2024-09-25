import React, { type HTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

interface Props extends HTMLAttributes<HTMLDivElement> {
  classname?: string
  children?: React.ReactNode
}

export default function TableActions({ classname, children, ...props }: Props) {
  return (
    <div
      className={cn('flex gap-2 [&>svg]:size-5 [&>svg]:cursor-pointer [&svg]:size-5 [&svg]:cursor-pointer', classname)}
      {...props}
    >
      {children}
    </div>
  )
}
