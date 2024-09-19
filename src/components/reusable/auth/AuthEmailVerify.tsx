import { MailCheck, MailSearch, MailX } from 'lucide-react'
import { type HTMLAttributes } from 'react'
import Typography from '~/components/ui/typography'
import { cn } from '~/lib/utils'

interface Props extends HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  state: 'sent' | 'verified' | 'failed' | 'loading'
  className?: string
}

export default function AuthEmailVerify({ title, description, state, className, ...rest }: Props) {
  return (
    <div className={cn('flex items-center justify-center', className)} {...rest}>
      <div className='flex flex-col items-center justify-center text-center'>
        {['sent', 'verified'].includes(state) && <MailCheck size={72} strokeWidth={1} className='text-emerald-500' />}
        {state === 'loading' && <MailSearch size={72} strokeWidth={1} className='text-sky-500' />}
        {state === 'failed' && <MailX size={72} strokeWidth={1} className='text-destructive' />}
        <Typography variant='h3' className='mt-5 text-center font-medium'>
          {title}
        </Typography>
        <p className='mt-5 max-w-md text-balance text-lg font-medium text-muted-foreground'>{description}</p>
      </div>
    </div>
  )
}
