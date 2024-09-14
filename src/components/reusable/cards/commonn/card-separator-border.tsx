import { cn } from '~/lib/utils'

export default function CardCeparatorBorder({ className }: { className?: string }) {
  return <div className={cn('my-5 border-b border-dotted border-foreground-border', className)} />
}
