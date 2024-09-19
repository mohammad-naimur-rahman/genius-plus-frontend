import { Img } from '~/components/ui/img'
import { type Feature } from '~/constants/contents/features'
import CardWrapper from './commonn/card-wrapper'

interface Props {
  feature: Feature
}

export default function FeatureCard({ feature }: Props) {
  return (
    <CardWrapper className='flex cursor-pointer items-center justify-center gap-x-8 gap-y-2 text-balance'>
      <Img src={feature.icon} alt={feature.title} className='w-20' />
      <div className='flex flex-col gap-x-3'>
        <p className='text-xl font-medium text-secondary-foreground'>{feature.title}</p>
        <p className='text-sm font-medium text-muted-foreground'>{feature.description}</p>
      </div>
    </CardWrapper>
  )
}
