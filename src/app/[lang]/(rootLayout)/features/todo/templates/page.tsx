import AllTemplates from '~/components/pages/features/todo/templates/AllTemplates'
import CreateTemplateModal from '~/components/pages/features/todo/templates/createTemplateModal'
import DashboardHeading from '~/components/reusable/dashboard/dashboard-heading'
import { genTitle } from '~/utils/misc/genTitle'

export const metadata = {
  title: genTitle('Todo Templates')
}

export default function Templates() {
  return (
    <div className='container'>
      <DashboardHeading title='Todo templates' extra={<CreateTemplateModal />} />
      <AllTemplates />
    </div>
  )
}
