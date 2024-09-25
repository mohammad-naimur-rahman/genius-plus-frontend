'use client'

import { PencilLine, Trash2 } from 'lucide-react'
import { useEffect, useState, type HTMLAttributes } from 'react'
import toast from 'react-hot-toast'
import Typography from '~/components/ui/typography'
import { useDeleteTodoTemplateMutation } from '~/redux/features/todoTemplatesApi'
import { type WithId } from '~/types/common/Response'
import { type TodoTemplate } from '~/types/TodoTemplate'
import { rtkErrorMessage } from '~/utils/error/errorMessage'
import ConfirmationPrompt from '../../dashboard/confirmation-prompt'
import CardPopover, { CardPopoverContent } from '../commonn/card-popover'
import CardWrapper from '../commonn/card-wrapper'
import UpdateTodoTemplateModal from './UpdateTodoTemplateModal'

interface Props extends HTMLAttributes<HTMLDivElement> {
  template: WithId<TodoTemplate>
  hidePopover?: boolean
}

export default function TodoTemplateCard({ template, hidePopover = false }: Props) {
  const [openPrompt, setopenPrompt] = useState<boolean>(false)
  const [deleteTemplate, { isLoading, isSuccess, isError, error }] = useDeleteTodoTemplateMutation()

  useEffect(() => {
    if (isLoading) toast.loading('Deleting template...')
    if (isSuccess) {
      toast.dismiss()
      toast.success('Template deleted successfully')
    }

    if (isError) {
      toast.dismiss()
      toast.error(rtkErrorMessage(error))
    }
  }, [isLoading, isSuccess, isError, error])

  return (
    <CardWrapper
      popoverComp={
        !hidePopover && (
          <CardPopover>
            <UpdateTodoTemplateModal template={template}>
              <CardPopoverContent text='Edit' icon={<PencilLine className='text-sky-500' />} />
            </UpdateTodoTemplateModal>
            <CardPopoverContent
              text='Delete'
              icon={<Trash2 className='text-destructive' />}
              onClick={() => setopenPrompt(true)}
            />
          </CardPopover>
        )
      }
    >
      <Typography variant='h4' className='mb-3 font-normal text-primary'>
        {template.title}
      </Typography>
      {template.description && <p className='text-muted-foreground'>{template.description}</p>}

      <p className='mt-2 line-clamp-3 text-sm font-medium italic text-muted-foreground'>{template.instructions}</p>

      <ConfirmationPrompt
        open={openPrompt}
        onOpenChange={setopenPrompt}
        title='Are you sure to delete this template?'
        cb={() => deleteTemplate(template.id)}
        isLoading={isLoading}
      />
    </CardWrapper>
  )
}
