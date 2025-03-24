'use client'

import { Img } from '~/components/ui/img'
import { type Feature } from '~/constants/contents/features'
import { cn } from '~/lib/utils'
import CardWrapper from './commonn/card-wrapper'

interface Props {
  feature: Feature
}

const activeFeaturesTill = 3

export default function FeatureCard({ feature }: Props) {
  return (
    <CardWrapper
      containerClassName='h-full'
      className={cn(
        'flex cursor-pointer flex-col items-center justify-center gap-x-8 gap-y-1 text-balance p-3 sm:flex-row sm:items-start sm:justify-start sm:gap-y-2 sm:p-4',
        {
          'w-full cursor-not-allowed select-none opacity-70': feature.id > activeFeaturesTill
        }
      )}
      onClick={e => {
        if (feature.id > activeFeaturesTill) {
          e.preventDefault()
        }
      }}
    >
      <Img src={feature.icon} alt={feature.title} className='w-12 sm:w-20' />
      <div className='flex flex-col justify-center gap-y-2 text-center sm:justify-start sm:text-left'>
        <p className='text-base font-medium text-secondary-foreground sm:text-xl'>{feature.title}</p>
        <p className='text-xs font-medium text-muted-foreground sm:text-sm'>{feature.description}</p>
      </div>
    </CardWrapper>
  )
}
