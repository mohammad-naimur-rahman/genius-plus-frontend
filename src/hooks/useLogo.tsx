'use client'

import { useTheme } from 'next-themes'
import { type StaticImageData } from 'next/image'

export const useLogo = (
  lightLogo: StaticImageData | string,
  darkLogo: StaticImageData | string
): StaticImageData | string => {
  const { theme } = useTheme()
  return theme === 'dark' && darkLogo ? darkLogo : lightLogo
}
