import { CheckCircle, XCircle } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '~/components/ui/dialog'

interface Props {
  title?: string
  open: boolean
  onOpenChange: (open: boolean) => void
  cb: () => void
  isLoading?: boolean
  rejectionCb?: () => void
}

export default function ConfirmationPrompt({
  title,
  open,
  onOpenChange,
  cb,
  isLoading = false,
  rejectionCb = () => {}
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-sm rounded-lg'>
        <DialogHeader className='sm:text-center'>
          <DialogTitle>{title ?? 'Are you sure?'}</DialogTitle>
        </DialogHeader>
        <DialogFooter className='mt-10 flex-row items-center justify-center gap-5 sm:justify-center'>
          <DialogClose>
            <Button
              className='flex h-12 items-center gap-2 rounded-lg bg-emerald-500 px-8 transition-colors hover:bg-emerald-500/90'
              isLoading={isLoading}
              onClick={cb}
            >
              <CheckCircle className='h-5 w-5' /> Yes
            </Button>
          </DialogClose>
          <DialogClose>
            <Button
              className='flex h-12 items-center gap-2 rounded-lg px-8'
              variant='destructive'
              onClick={rejectionCb}
            >
              <XCircle className='h-5 w-5' /> No
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
