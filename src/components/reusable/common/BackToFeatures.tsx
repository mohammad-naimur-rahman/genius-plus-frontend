import { ChevronLeft } from 'lucide-react'
import { Button } from '~/components/ui/button'
import Link from '~/components/ui/llink'

interface Props {
  href?: string
  children?: string
}

export default function BackToFeatures({ href, children }: Props) {
  return (
    <Link href={href || '/features'}>
      <Button icon={<ChevronLeft />} variant='outline'>
        {children || 'Back to features'}
      </Button>
    </Link>
  )
}
