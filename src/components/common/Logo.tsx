'use client'

import logoDark from '~/assets/logos/logo-dark.png'
import logo from '~/assets/logos/logo.png'
import { APP_NAME } from '~/configs'
import { useLogo } from '~/hooks/useLogo'
import { cn } from '~/lib/utils'
import { Img } from '../ui/img'
import Link from '../ui/llink'

interface Props {
  className?: string
}

export default function Logo({ className }: Props) {
  const logoSrc = useLogo(logo, logoDark)
  return (
    <Link href='/'>
      <Img src={logoSrc} alt={APP_NAME} className={cn('h-10 w-auto', className)} />
    </Link>
  )
}
