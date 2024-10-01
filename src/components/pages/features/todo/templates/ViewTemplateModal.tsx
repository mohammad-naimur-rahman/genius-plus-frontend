'use client'

import { type ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '~/components/ui/dialog'
import { type TodoTemplate } from '~/types/TodoTemplate'

interface Props {
  children: ReactNode
  template: TodoTemplate
}

export default function ViewTemplateModal({ children, template }: Props) {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{template.title}</DialogTitle>
          {template.description && (
            <DialogDescription className='text-sm text-muted-foreground'>{template.description}</DialogDescription>
          )}
        </DialogHeader>

        <p className='text-sm italic text-muted-foreground'>{template.instructions}</p>
      </DialogContent>
    </Dialog>
  )
}
