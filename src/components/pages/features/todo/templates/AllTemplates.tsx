'use client'

import { useState } from 'react'
import CardGrid from '~/components/reusable/cards/commonn/card-grid'
import TodoTemplateCard from '~/components/reusable/cards/TodoTemplateCard'
import TodoTemplateCardSkeletons from '~/components/reusable/skeletons/TodoTemplateCardSkeletons'
import TablePagination from '~/components/reusable/tables/table-pagination'
import TableSearchSelector from '~/components/reusable/tables/table-search-selector'
import { type TableMode } from '~/components/reusable/tables/table-selector'
import { initParams } from '~/constants/form/init-params'
import { useGetAllTodoTemplatessQuery } from '~/redux/features/todoTemplatesApi'
import { type Params } from '~/types/common/Params'
import { isArrEmpty } from '~/utils/misc/isEmpty'

export default function AllTemplates() {
  const [mode, setmode] = useState<TableMode>('grid')
  const [params, setparams] = useState<Params>(initParams({}))

  const { data, isSuccess, isLoading } = useGetAllTodoTemplatessQuery(params)

  console.log(data)

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
      {isSuccess ? (
        isArrEmpty(data?.data) ? (
          <p>No templates found</p>
        ) : mode === 'grid' ? (
          <CardGrid total={4}>
            {data.data.map(template => (
              <TodoTemplateCard key={template.id} template={template} />
            ))}
          </CardGrid>
        ) : null
      ) : null}
      <TablePagination params={params} setparams={setparams} meta={data?.meta} />
    </>
  )
}
