import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '~/lib/utils'

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
}

export default function CardWrapper({ children, className, ...props }: Props) {
  return (
    <div
      {...props}
      className={cn('relative rounded-lg border border-foreground-border bg-foreground p-4 shadow-sm', className)}
    >
      {children}
    </div>
  )
}
