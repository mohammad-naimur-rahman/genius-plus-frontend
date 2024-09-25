'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '~/components/ui/button'

export default function BackLink({ className }: { className?: string }) {
  const router = useRouter()
  return (
    <Button variant='outline' icon={<ChevronLeft />} onClick={() => router.back()} className={className}>
      Go Back
    </Button>
  )
}
