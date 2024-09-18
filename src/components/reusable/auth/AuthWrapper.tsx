import { type StaticImageData } from 'next/image'
import { type HTMLAttributes, type ReactNode } from 'react'
import { Img } from '~/components/ui/img'
import { cn } from '~/lib/utils'

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  heroImgSrc: StaticImageData
  formPosition?: 'left' | 'right'
}

export default function AuthWrapper({ children, heroImgSrc, formPosition = 'left', ...rest }: Props) {
  return (
    <main
      className={cn('container flex min-h-screen justify-center gap-y-12 lg:justify-between', {
        'flex-col-reverse lg:flex-row-reverse': formPosition === 'right',
        'flex-col-reverse lg:flex-row': formPosition === 'left'
      })}
      {...rest}
    >
      <div className='flex w-full items-center justify-center lg:w-1/2'>{children}</div>
      <div className='flex w-full items-center justify-center lg:w-1/2'>
        <Img src={heroImgSrc} alt='Auth Hero Image' className='max-w-52 lg:max-w-lg' />
      </div>
    </main>
  )
}
