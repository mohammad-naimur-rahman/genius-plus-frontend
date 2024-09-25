import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import * as React from 'react'

import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav role='navigation' aria-label='pagination' className={cn('flex w-full justify-center', className)} {...props} />
)
Pagination.displayName = 'Pagination'

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn('flex flex-row items-center gap-1', className)} {...props} />
  )
)
PaginationContent.displayName = 'PaginationContent'

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
))
PaginationItem.displayName = 'PaginationItem'

type PaginationButtonProps = {
  isActive?: boolean
} & React.ComponentProps<'button'>

const PaginationButton = React.forwardRef<HTMLButtonElement, PaginationButtonProps>(
  ({ className, isActive, ...props }, ref) => (
    <Button
      ref={ref}
      aria-current={isActive ? 'page' : undefined}
      variant={isActive ? 'default' : 'outline'}
      size='icon'
      className={className}
      {...props}
    />
  )
)
PaginationButton.displayName = 'PaginationButton'

const PaginationPrevious = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof PaginationButton>>(
  ({ className, ...props }, ref) => (
    <PaginationButton aria-label='Go to previous page' className={cn(className)} ref={ref} {...props}>
      <ChevronLeft className='size-5' />
    </PaginationButton>
  )
)
PaginationPrevious.displayName = 'PaginationPrevious'

const PaginationNext = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof PaginationButton>>(
  ({ className, ...props }, ref) => (
    <PaginationButton aria-label='Go to next page' className={cn(className)} ref={ref} {...props}>
      <ChevronRight className='size-5' />
    </PaginationButton>
  )
)
PaginationNext.displayName = 'PaginationNext'

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span aria-hidden className={cn('flex size-9 items-center justify-center', className)} {...props}>
    <MoreHorizontal className='size-5' />
    <span className='sr-only'>More pages</span>
  </span>
)
PaginationEllipsis.displayName = 'PaginationEllipsis'

export {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
}
