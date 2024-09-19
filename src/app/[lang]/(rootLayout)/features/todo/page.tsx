import AITodo from '~/components/pages/features/todo'
import Typography from '~/components/ui/typography'
import { genTitle } from '~/utils/misc/genTitle'

export const metadata = {
  title: genTitle('AI Todo Builder')
}
export default function TodoPage() {
  return (
    <div className='container'>
      <Typography variant='h2' className='mb-6'>
        AI Todo Builder
      </Typography>
      <AITodo />
    </div>
  )
}
