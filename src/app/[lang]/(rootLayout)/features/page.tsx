import AllFeatures from '~/components/pages/features/AllFeatures'
import FeaturesHeading from '~/components/pages/features/FeaturesHeading'
import { genTitle } from '~/utils/misc/genTitle'

export const metadata = {
  title: genTitle('Features')
}

export default function FeaturesPage() {
  return (
    <div className='pt-10'>
      <FeaturesHeading />
      <AllFeatures />
    </div>
  )
}
