import { HTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string
  children: React.ReactNode
}

export default function FormWrapper({ className, children, ...props }: Props) {
  return (
    <div className={cn('rounded-xl bg-foreground p-4 shadow-sm', className)} {...props}>
      {children}
    </div>
  )
}
