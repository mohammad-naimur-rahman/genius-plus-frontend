import { PencilLine, Trash2 } from 'lucide-react'
import { type HTMLAttributes } from 'react'
import Typography from '~/components/ui/typography'
import { type WithId } from '~/types/common/Response'
import { type TodoTemplate } from '~/types/TodoTemplate'
import CardPopover, { CardPopoverContent } from './commonn/card-popover'
import CardWrapper from './commonn/card-wrapper'

interface Props extends HTMLAttributes<HTMLDivElement> {
  template: WithId<TodoTemplate>
  hidePopover?: boolean
}

export default function TodoTemplateCard({ template, hidePopover = false }: Props) {
  return (
    <CardWrapper
      popoverComp={
        !hidePopover && (
          <CardPopover>
            <CardPopoverContent text='Edit' icon={<PencilLine className='text-sky-500' />} />
            <CardPopoverContent text='Delete' icon={<Trash2 className='text-destructive' />} />
          </CardPopover>
        )
      }
    >
      <Typography variant='h4' className='mb-3 font-normal text-primary'>
        {template.title}
      </Typography>
      {template.description && <p className='text-muted-foreground'>{template.description}</p>}

      <p className='mt-2 line-clamp-3 text-sm font-medium italic text-muted-foreground'>{template.instructions}</p>
    </CardWrapper>
  )
}
