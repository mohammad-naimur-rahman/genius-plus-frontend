import { type Dispatch, type ReactNode, type SetStateAction } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '~/components/ui/dialog'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '~/components/ui/drawer'
import { useMediaQuery } from '~/hooks/useMediaQuery'
import { cn } from '~/lib/utils'

interface Props {
  open: boolean
  setopen: Dispatch<SetStateAction<boolean>>
  title: string
  description?: ReactNode | string
  titleClassName?: string
  descriptionClassName?: string
  className?: string
  children: ReactNode
}

export default function DrawerDialog({
  open,
  setopen,
  title,
  description,
  children,
  titleClassName,
  descriptionClassName,
  className
}: Props) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setopen}>
        <DialogContent className='p-3.5'>
          <DialogHeader>
            <DialogTitle className={titleClassName}>{title}</DialogTitle>
            {description && <DialogDescription className={descriptionClassName}>{description}</DialogDescription>}
          </DialogHeader>
          <div className={className}>{children}</div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setopen}>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle className={titleClassName}>{title}</DrawerTitle>
          {description && <DrawerDescription className={descriptionClassName}>{description}</DrawerDescription>}
        </DrawerHeader>
        <div className={cn('p-3', className)}>{children}</div>
      </DrawerContent>
    </Drawer>
  )
}
