import { cn } from '~/lib/utils'

interface Props {
  left: string
  right: string
  className?: string
}

export default function CardBetween({ left, right, className }: Props) {
  return (
    <div
      className={cn(
        'mb-4 flex items-center justify-between text-xs font-medium text-text-secondary last:mb-0',
        className
      )}
    >
      <p>{left}</p>
      <p>{right}</p>
    </div>
  )
}
