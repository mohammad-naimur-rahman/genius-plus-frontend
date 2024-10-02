'use client'

import { Img } from '~/components/ui/img'
import { type Feature } from '~/constants/contents/features'
import { cn } from '~/lib/utils'
import CardWrapper from './commonn/card-wrapper'

interface Props {
  feature: Feature
}

export default function FeatureCard({ feature }: Props) {
  return (
    <CardWrapper
      className={cn('flex cursor-pointer items-start justify-start gap-x-8 gap-y-2 text-balance', {
        'w-full cursor-not-allowed select-none opacity-70': feature.id > 3
      })}
      onClick={e => {
        if (feature.id > 2) {
          e.preventDefault()
        }
      }}
    >
      <Img src={feature.icon} alt={feature.title} className='w-20' />
      <div className='flex flex-col gap-y-2'>
        <p className='text-xl font-medium text-secondary-foreground'>{feature.title}</p>
        <p className='text-sm font-medium text-muted-foreground'>{feature.description}</p>
      </div>
    </CardWrapper>
  )
}
