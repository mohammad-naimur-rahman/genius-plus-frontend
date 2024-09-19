import FeatureCard from '~/components/reusable/cards/FeatureCard'
import Link from '~/components/ui/llink'
import { features } from '~/constants/contents/features'

export default function AllFeatures() {
  return (
    <div className='grid grid-cols-3 gap-5'>
      {features.map(feature => (
        <Link key={feature.id} href={feature.href}>
          <FeatureCard feature={feature} />
        </Link>
      ))}
    </div>
  )
}
