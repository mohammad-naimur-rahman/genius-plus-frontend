import GenerateImageForm from '~/components/pages/features/image/GenerateImageForm'
import BackLink from '~/components/reusable/common/back-link'
import DashboardHeading from '~/components/reusable/dashboard/dashboard-heading'
import { genTitle } from '~/utils/misc/genTitle'

export const metadata = {
  title: genTitle('Generate Image')
}
export default function GenerateImagePage() {
  return (
    <>
      <DashboardHeading title='Generate Image with AI' extra={<BackLink>Back to Images</BackLink>} />
      <GenerateImageForm />
    </>
  )
}
