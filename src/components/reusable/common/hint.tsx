import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'

import { HelpCircle } from 'lucide-react'
import { type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function Hint({ children }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {' '}
        <HelpCircle className='size-4 text-text-gray' />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className='max-w-80'>
          <p className='text-sm font-medium text-text-gray'>{children}</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
