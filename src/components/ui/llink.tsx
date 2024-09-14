'use client'

import NextLink, { type LinkProps } from 'next/link'
import { useParams } from 'next/navigation'
import { type ReactNode } from 'react'

interface Props extends LinkProps {
  children: ReactNode
  href: string
  className?: string
}

export default function Link({ children, href, ...rest }: Props) {
  const { lang } = useParams()
  return (
    <NextLink href={`/${lang as string}${href}`} {...rest}>
      {children}
    </NextLink>
  )
}
