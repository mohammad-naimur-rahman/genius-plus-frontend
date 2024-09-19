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
      className={cn(
        'relative rounded-lg border bg-primary-foreground p-4 shadow-sm transition-all duration-300 hover:shadow-md',
        className
      )}
    >
      {children}
    </div>
  )
}
