'use client'

import { type Dispatch, type SetStateAction } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '~/components/ui/sheet'
import { Skeleton } from '~/components/ui/skeleton'
import usePush from '~/hooks/usePush'
import { type WithId } from '~/types/common/Response'
import { type TalkingBuddyThread } from '~/types/TalkingBuddy'
import { getRelativeTime } from '~/utils/date/getDateStr'

interface Props {
  sheetOpen: boolean
  setsheetOpen: Dispatch<SetStateAction<boolean>>
  sessions: WithId<TalkingBuddyThread>[] | undefined
  isLoading: boolean
  isSuccess: boolean
}

export default function ChoosePreviousSession({ sheetOpen, setsheetOpen, isLoading, isSuccess, sessions }: Props) {
  const push = usePush()
  const selectSession = (id: number) => {
    push(`/features/talking-buddy/${id}`)
    setsheetOpen(false)
  }

  return (
    <Sheet open={sheetOpen} onOpenChange={setsheetOpen}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Choose session</SheetTitle>
          <SheetDescription>Choose a previous session to continue</SheetDescription>
        </SheetHeader>

        {isLoading && (
          <div className='mt-6 flex flex-col gap-y-5'>
            {Array.from({ length: 5 }, (_, i) => (
              <Skeleton key={i} className='h-12 w-full rounded-lg' />
            ))}
          </div>
        )}

        {isSuccess ? (
          sessions?.length ? (
            <ul className='mt-6 flex flex-col gap-y-3'>
              {sessions?.map(session => (
                <li
                  key={session.id}
                  onClick={() => selectSession(session.id)}
                  className='flex w-full max-w-full cursor-pointer flex-col gap-y-1 rounded-sm border-b border-secondary p-2 pb-1 hover:bg-muted/50'
                >
                  <span className='text-sm font-medium text-secondary-foreground'>{session.name}</span>
                  <span className='text-xs text-muted-foreground'>Created {getRelativeTime(session.createdAt)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className='mt-6 italic text-muted-foreground'>There&apos;re no sessions yet</p>
          )
        ) : null}
      </SheetContent>
    </Sheet>
  )
}
