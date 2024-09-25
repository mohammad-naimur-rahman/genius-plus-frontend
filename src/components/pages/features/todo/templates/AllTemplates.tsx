'use client'

import { Eye, PencilLineIcon, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import CardGrid from '~/components/reusable/cards/commonn/card-grid'
import TodoTemplateCard from '~/components/reusable/cards/TodoTemplateCard'
import UpdateTodoTemplateModal from '~/components/reusable/cards/TodoTemplateCard/UpdateTodoTemplateModal'
import ConfirmationPrompt from '~/components/reusable/dashboard/confirmation-prompt'
import TodoTemplateCardSkeletons from '~/components/reusable/skeletons/TodoTemplateCardSkeletons'
import TableActions from '~/components/reusable/tables/table-actions'
import TablePagination from '~/components/reusable/tables/table-pagination'
import TableSearchSelector from '~/components/reusable/tables/table-search-selector'
import { type TableMode } from '~/components/reusable/tables/table-selector'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { initParams } from '~/constants/form/init-params'
import { useDeleteTodoTemplateMutation, useGetAllTodoTemplatessQuery } from '~/redux/features/todoTemplatesApi'
import { type Params } from '~/types/common/Params'
import { rtkErrorMessage } from '~/utils/error/errorMessage'
import { isArrEmpty } from '~/utils/misc/isEmpty'
import ViewTemplateModal from './ViewTemplateModal'

export default function AllTemplates() {
  const [mode, setmode] = useState<TableMode>('grid')
  const [params, setparams] = useState<Params>(initParams({}))

  const { data, isSuccess, isLoading } = useGetAllTodoTemplatessQuery(params)

  // Deleting a template
  const [openPrompt, setopenPrompt] = useState<boolean>(false)
  const [deleteId, setdeleteId] = useState<number | undefined>(undefined)
  const [deleteTemplate, { isLoading: isDeleteLoading, isSuccess: isDeleteSuccess, isError, error }] =
    useDeleteTodoTemplateMutation()

  useEffect(() => {
    if (isDeleteLoading) toast.loading('Deleting template...')
    if (isDeleteSuccess) {
      toast.dismiss()
      toast.success('Template deleted successfully')
    }

    if (isError) {
      toast.dismiss()
      toast.error(rtkErrorMessage(error))
    }
  }, [isDeleteLoading, isDeleteSuccess, isError, error])

  return (
    <>
      <TableSearchSelector
        params={params}
        setparams={setparams}
        mode={mode}
        setmode={setmode}
        placeholder='Search templates by title...'
      />
      <TodoTemplateCardSkeletons isLoading={isLoading} />
      {isSuccess &&
        (isArrEmpty(data?.data) ? (
          <p>No templates found</p>
        ) : mode === 'grid' ? (
          <CardGrid total={4}>
            {data.data.map(template => (
              <TodoTemplateCard key={template.id} template={template} />
            ))}
          </CardGrid>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Instructions</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data?.map(template => (
                <TableRow key={template.id}>
                  <TableCell className='min-w-32 font-medium'>{template.title}</TableCell>
                  <TableCell className='one-liner-ellipsis max-w-20 text-muted-foreground sm:max-w-64'>
                    {template.description}
                  </TableCell>
                  <TableCell className='one-liner-ellipsis max-w-20 italic text-muted-foreground sm:max-w-64'>
                    {template.instructions}
                  </TableCell>
                  <TableCell>
                    <TableActions>
                      <ViewTemplateModal template={template}>
                        <Eye className='size-5 text-secondary-foreground' />
                      </ViewTemplateModal>
                      <UpdateTodoTemplateModal template={template}>
                        <PencilLineIcon className='size-5 text-sky-500' />
                      </UpdateTodoTemplateModal>
                      <Trash2
                        className='size-5 text-destructive'
                        onClick={() => {
                          setdeleteId(template.id)
                          setopenPrompt(true)
                        }}
                      />
                    </TableActions>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ))}
      <TablePagination params={params} setparams={setparams} meta={data?.meta} />
      <ConfirmationPrompt
        open={openPrompt}
        onOpenChange={setopenPrompt}
        title='Are you sure to delete this template?'
        cb={() => deleteTemplate(deleteId!)}
        isLoading={isLoading}
      />
    </>
  )
}
