import { type LucideProps } from 'lucide-react'
import { type ForwardRefExoticComponent, type RefAttributes } from 'react'
import { cn } from '~/lib/utils'

interface Props {
  iconGradientClassName?: string
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
}

export default function CardIcon({ iconGradientClassName = 'from-blue-dark to-cyan-dark', icon: Icon }: Props) {
  return (
    <div
      className={cn('flex size-10 items-center justify-center rounded-full bg-gradient-to-b', iconGradientClassName)}
    >
      <Icon className='size-5 text-white' strokeWidth={2} />
    </div>
  )
}
