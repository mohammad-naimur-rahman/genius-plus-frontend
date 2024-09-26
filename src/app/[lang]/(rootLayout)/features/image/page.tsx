import { ImagePlus } from 'lucide-react'
import BackToFeatures from '~/components/reusable/common/BackToFeatures'
import DashboardHeading from '~/components/reusable/dashboard/dashboard-heading'
import { Button } from '~/components/ui/button'
import Link from '~/components/ui/llink'
import { genTitle } from '~/utils/misc/genTitle'

export const metadata = {
  title: genTitle('AI Image Generator')
}

export default function ImagePage() {
  return (
    <>
      <DashboardHeading
        title='AI Image Generator'
        extra={
          <>
            <BackToFeatures />
            <Link href='/features/image/generate'>
              <Button icon={<ImagePlus />} iconPosition='right'>
                Generate Image
              </Button>
            </Link>
          </>
        }
      />
    </>
  )
}
