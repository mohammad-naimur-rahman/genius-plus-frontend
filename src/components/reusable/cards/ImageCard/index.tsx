'use client'

import { Download, Fullscreen, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Img } from '~/components/ui/img'
import LightBox from '~/components/ui/lightbox'
import { type WithId } from '~/types/common/Response'
import { type ImageInterface } from '~/types/ImageInterface'
import UpdateImageModal from './UpdateImageModal'

interface Props {
  img: WithId<ImageInterface>
}

export default function ImageCard({ img }: Props) {
  const [openLightbox, setopenLightbox] = useState<boolean>(false)
  return (
    <>
      <div className='w-full'>
        <div className='group relative aspect-square overflow-hidden'>
          <Img
            src={img.url}
            alt={img.title}
            className='absolute inset-0 aspect-square w-full scale-105 object-cover blur-sm'
          />
          <Img src={img.url} alt={img.title} className='relative aspect-square w-full object-scale-down' />

          <p className='absolute -bottom-full left-0 right-0 bg-background/80 px-2 py-3 text-sm font-medium transition-all duration-300 group-hover:bottom-0'>
            {img.title}
          </p>
        </div>

        <div className='mt-1.5 grid grid-cols-4 gap-x-2'>
          <a href={img.url} target='_blank' rel='noreferrer' className='w-full'>
            <Button className='w-full'>
              <Download className='size-[18px]' />
            </Button>
          </a>
          <Button onClick={() => setopenLightbox(true)} variant='outline'>
            <Fullscreen className='size-[18px]' />
          </Button>
          <UpdateImageModal img={img} />
          <Button variant='destructive'>
            <Trash2 className='size-[18px]' />
          </Button>
        </div>
      </div>
      <LightBox open={openLightbox} onOpenChange={setopenLightbox} src={img.url} />
    </>
  )
}
