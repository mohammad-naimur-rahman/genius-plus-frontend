import { type StaticImageData } from 'next/image'
import { type HTMLAttributes, type ReactNode } from 'react'
import { Img } from '~/components/ui/img'
import { cn } from '~/lib/utils'

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  heroImgSrc: StaticImageData | string
  formPosition?: 'left' | 'right'
}

export default function AuthWrapper({ children, heroImgSrc, formPosition = 'left', ...rest }: Props) {
  return (
    <main
      className={cn(
        'container flex min-h-screen flex-col-reverse items-start justify-end gap-y-12 sm:justify-center',
        'lg:items-center lg:justify-between',
        {
          'lg:flex-row-reverse': formPosition === 'right',
          'lg:flex-row': formPosition === 'left'
        }
      )}
      {...rest}
    >
      <div className='flex w-full items-center justify-center lg:w-1/2'>{children}</div>
      <div className='mt-20 flex w-full items-center justify-center sm:mt-0 lg:w-1/2'>
        <Img src={heroImgSrc} alt='Auth Hero Image' className='max-w-52 md:max-w-72 lg:max-w-lg' />
      </div>
    </main>
  )
}
