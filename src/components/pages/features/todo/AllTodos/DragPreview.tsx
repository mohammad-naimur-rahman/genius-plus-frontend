import { GripVertical, PencilLineIcon, Trash2 } from 'lucide-react'
import { Checkbox } from '~/components/reusable/form/checkbox'
import TableActions from '~/components/reusable/tables/table-actions'
import { Table, TableBody, TableCell, TableRow } from '~/components/ui/table'
import { type WithId } from '~/types/common/Response'
import { type Todo } from '~/types/Todo'
import { isToday } from '~/utils/date/formatDate'

interface Props {
  date: Date | undefined
  style: React.CSSProperties
  todo: WithId<Todo>
}

const DragPreview = ({ todo, style, date }: Props) => (
  <div style={{ ...style, display: 'table', tableLayout: 'fixed', maxWidth: '100%' }}>
    <Table>
      <TableBody>
        <TableRow className='bg-background shadow-md'>
          <TableCell>
            <GripVertical className='cursor-grab text-secondary-foreground' />
          </TableCell>
          {isToday(date) && (
            <TableCell className='w-6 max-w-6'>
              <Checkbox checked={todo.is_complete} disabled />
            </TableCell>
          )}
          <TableCell>
            {todo.title} ({todo.order})
          </TableCell>
          <TableCell>{todo.time_range}</TableCell>
          <TableCell>{todo.priority}</TableCell>
          <TableCell>
            <TableActions>
              <PencilLineIcon className='text-sky-500' />
              <Trash2 className='text-destructive' />
            </TableActions>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
)

export default DragPreview
