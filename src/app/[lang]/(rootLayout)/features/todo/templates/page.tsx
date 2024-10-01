import AllTemplates from '~/components/pages/features/todo/templates/AllTemplates'
import CreateTemplateModal from '~/components/pages/features/todo/templates/CreateTemplateModal'
import BackToFeatures from '~/components/reusable/common/BackToFeatures'
import DashboardHeading from '~/components/reusable/dashboard/dashboard-heading'
import { genTitle } from '~/utils/misc/genTitle'

export const metadata = {
  title: genTitle('Todo Templates')
}

export default function Templates() {
  return (
    <>
      <DashboardHeading
        title='Todo templates'
        extra={
          <>
            <BackToFeatures href='/features/todo'>Back to Todos</BackToFeatures>
            <CreateTemplateModal />
          </>
        }
      />
      <AllTemplates />
    </>
  )
}
