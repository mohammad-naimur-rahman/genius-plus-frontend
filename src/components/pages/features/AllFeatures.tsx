import FeatureCard from '~/components/reusable/cards/FeatureCard'
import Link from '~/components/ui/llink'
import { features } from '~/constants/contents/features'

export default function AllFeatures() {
  return (
    <div className='mb-10 grid grid-cols-2 gap-2 sm:gap-5 lg:grid-cols-3'>
      {features.map(feature => (
        <Link key={feature.id} href={feature.href} className='h-full'>
          <FeatureCard feature={feature} />
        </Link>
      ))}
    </div>
  )
}
