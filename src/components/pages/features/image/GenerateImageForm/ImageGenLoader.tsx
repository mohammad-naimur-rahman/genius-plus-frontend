'use client'

import { Loader } from 'lucide-react'
import { useEffect, useState } from 'react'
import Typography from '~/components/ui/typography'

const loaderTexts: string[] = [
  'Hang tight, generating your image, it might take some time...',
  'Please wait, your image is being generated...',
  'Almost there, your image is almost generated...'
]

export default function ImageGenLoader({ isLoading }: { isLoading: boolean }) {
  const [loaderText, setloaderText] = useState<string>(loaderTexts[0]!)
  const [currIdx, setcurrIdx] = useState<number>(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isLoading) {
        setloaderText(loaderTexts[currIdx] || '')
        setcurrIdx(currIdx + 1 < loaderTexts.length ? currIdx + 1 : loaderTexts.length - 1)
      } else {
        clearInterval(intervalId)
      }
    }, 3000)

    return () => clearInterval(intervalId)
  }, [isLoading, currIdx])

  return (
    <div className='flex min-h-[70vh] flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center italic text-muted-foreground'>
      <Typography variant='h4' className='font-light'>
        {loaderText}
      </Typography>
      <Loader className='size-7 animate-spin' />
    </div>
  )
}
