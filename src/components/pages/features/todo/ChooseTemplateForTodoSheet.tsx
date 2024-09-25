'use client'

import { type Dispatch, type SetStateAction, useState } from 'react'
import { type UseFormSetValue } from 'react-hook-form'
import TodoTemplateCard from '~/components/reusable/cards/TodoTemplateCard'
import Search from '~/components/reusable/tables/search'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '~/components/ui/sheet'
import { Skeleton } from '~/components/ui/skeleton'
import { initParams } from '~/constants/form/init-params'
import { useGetAllTodoTemplatessQuery } from '~/redux/features/todoTemplatesApi'
import { type Params } from '~/types/common/Params'
import { type TodoWithAIFormValues } from './CreateTodoWithAIModal'

interface Props {
  sheeetOpen: boolean
  setsheetOpen: Dispatch<SetStateAction<boolean>>
  setValue: UseFormSetValue<TodoWithAIFormValues>
}

export default function ChooseTemplateForTodoSheet({ sheeetOpen, setsheetOpen, setValue }: Props) {
  const [search, setsearch] = useState<string>('')
  const params: Params = { ...initParams({}), search }

  const { data, isSuccess, isLoading } = useGetAllTodoTemplatessQuery(params)

  const selectTemplate = (instructions: string) => {
    setValue('text', instructions)
    setsheetOpen(false)
  }

  return (
    <Sheet open={sheeetOpen} onOpenChange={setsheetOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Choose template</SheetTitle>
          <SheetDescription>Choose a tempalte to save time for creating todo list for your day</SheetDescription>
        </SheetHeader>

        <Search
          searchValue={search}
          setsearchValue={setsearch}
          placeholder='Search templates by search'
          className='mt-5'
        />

        {isLoading && (
          <div className='mt-6 flex flex-col gap-y-5'>
            {Array.from({ length: 5 }, (_, i) => (
              <Skeleton key={i} className='h-48 w-full rounded-lg' />
            ))}
          </div>
        )}

        {isSuccess && (
          <div className='mt06 mt-6 flex flex-col gap-y-5'>
            {data.data.map(template => (
              <TodoTemplateCard
                key={template.id}
                template={template}
                hidePopover
                className='cursor-pointer hover:shadow-lg'
                onClick={() => selectTemplate(template.instructions)}
              />
            ))}
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
