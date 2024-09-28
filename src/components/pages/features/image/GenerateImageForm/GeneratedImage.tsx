'use client'

import { ChevronLeft, Download, Fullscreen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Img } from '~/components/ui/img'
import LightBox from '~/components/ui/lightbox'
import { type Response, type WithId } from '~/types/common/Response'
import { type ImageInterface } from '~/types/ImageInterface'

interface Props {
  data: Response<WithId<ImageInterface>>
}
export default function GeneratedImage({ data }: Props) {
  const router = useRouter()
  const [openLightbox, setopenLightbox] = useState<boolean>(false)
  return (
    <>
      <div className='mx-auto mb-16 max-w-xl'>
        <Img src={data.data.url} alt={data.data.title} />
        <div className='mt-6 flex flex-wrap justify-center gap-x-3 gap-y-2'>
          <a href={data.data.url} target='_blank' rel='noreferrer'>
            <Button icon={<Download />} iconPosition='right'>
              Download
            </Button>
          </a>
          <Button onClick={() => setopenLightbox(true)} icon={<Fullscreen />} variant='outline' iconPosition='right'>
            View Full Image
          </Button>
          <Button onClick={() => router.back()} icon={<ChevronLeft />} variant='secondary'>
            Go to gallery
          </Button>
        </div>
      </div>
      <LightBox open={openLightbox} onOpenChange={setopenLightbox} src={data.data.url} />
    </>
  )
}
