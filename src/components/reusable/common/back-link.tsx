'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '~/components/ui/button'

interface Props {
  className?: string
  children?: string
}

export default function BackLink({ className, children }: Props) {
  const router = useRouter()
  return (
    <Button variant='outline' icon={<ChevronLeft />} onClick={() => router.back()} className={className}>
      {children || 'Go Back'}
    </Button>
  )
}
