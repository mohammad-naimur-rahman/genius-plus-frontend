import { type HTMLAttributes, type ReactNode } from 'react'
import Typography, { type TypographyVariant } from '~/components/ui/typography'
import { cn } from '~/lib/utils'

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string
  extra?: ReactNode
  className?: string
  variant?: TypographyVariant
}

export default function DashboardHeading({ title, extra, className, variant = 'h2', ...props }: Props) {
  return (
    <div className={cn('mb-6 flex flex-wrap items-center justify-between gap-x-5 gap-y-3', className)} {...props}>
      <Typography variant={variant}>{title}</Typography>
      <div className='flex flex-wrap items-center gap-x-5'>{extra}</div>
    </div>
  )
}
