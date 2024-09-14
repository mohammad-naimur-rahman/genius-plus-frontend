import { cn } from '~/lib/utils'
import CardAvatar from '../cards/commonn/card-avatar'

type Props = {
  imgSrc?: string
  title: string
  description: string
  className?: string
}

export default function ChatUser({ imgSrc, title, description, className }: Props) {
  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      <CardAvatar imgSrc={imgSrc} name={title} className='size-10' />

      <div className='flex flex-col gap-2'>
        <h5 className='text-sm font-medium text-text-heading'>{title}</h5>
        <p className='break-all text-xs font-bold text-primary'>{description}</p>
      </div>
    </div>
  )
}
