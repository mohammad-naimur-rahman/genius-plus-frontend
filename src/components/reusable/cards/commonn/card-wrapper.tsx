import { type HTMLAttributes, type ReactNode } from 'react'
import { cn } from '~/lib/utils'

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
  popoverComp?: ReactNode
}

export default function CardWrapper({ children, className, popoverComp, ...props }: Props) {
  return (
    <div
      {...props}
      className={cn(
        'relative rounded-lg border bg-primary-foreground shadow-sm transition-all duration-300 hover:shadow-md',
        className
      )}
    >
      {popoverComp && <div className='absolute right-2 top-2 z-10'>{popoverComp}</div>}
      <div className='p-4'>{children}</div>
    </div>
  )
}
