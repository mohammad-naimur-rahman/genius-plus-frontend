import { type PopoverProps } from '@radix-ui/react-popover'
import { type HTMLAttributes, type ReactNode } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import ThreeDots from '~/components/ui/three-dots'
import { cn } from '~/lib/utils'

interface Props extends PopoverProps {
  children: ReactNode
  className?: string
}

export default function CardPopover({ children, className, ...props }: Props) {
  return (
    <Popover {...props}>
      <PopoverTrigger>
        <ThreeDots className='absolute right-2 top-3' />
      </PopoverTrigger>
      <PopoverContent className={cn('flex max-w-[180px] flex-col justify-center gap-y-3', className)}>
        {children}
      </PopoverContent>
    </Popover>
  )
}

interface CardPopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  text: string
  icon: ReactNode
  className?: string
  iconClassName?: string
}

export function CardPopoverContent({ text, icon, className, ...props }: CardPopoverContentProps) {
  return (
    <div
      className={cn('flex cursor-pointer items-center justify-between gap-x-2 [&>svg]:size-5', className)}
      {...props}
    >
      <p className='text-sm font-medium text-text-secondary'>{text}</p>
      {icon}
    </div>
  )
}
