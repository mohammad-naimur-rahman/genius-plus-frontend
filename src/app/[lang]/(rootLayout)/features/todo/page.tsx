import { BookDashed } from 'lucide-react'
import AITodo from '~/components/pages/features/todo'
import DashboardHeading from '~/components/reusable/dashboard/dashboard-heading'
import { Button } from '~/components/ui/button'
import Link from '~/components/ui/llink'
import { genTitle } from '~/utils/misc/genTitle'

export const metadata = {
  title: genTitle('AI Todo Builder')
}
export default function TodoPage() {
  return (
    <div className='container'>
      <DashboardHeading
        title='AI Todo Builder'
        extra={
          <Link href='/features/todo/templates'>
            <Button icon={<BookDashed />}>Manage Templates</Button>
          </Link>
        }
      />
      <AITodo />
    </div>
  )
}
