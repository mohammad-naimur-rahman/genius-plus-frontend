import { X } from 'lucide-react'
import { Img } from '~/components/ui/img'
import { cn } from '~/lib/utils'

interface Props {
  imgSrc: string
  onClick: () => void
  className?: string
  aspect?: 'video' | 'square' | 'auto'
}

export default function ImagePreviewer({ imgSrc, onClick, className, aspect = 'video' }: Props) {
  return (
    <div
      className={cn('relative mb-3 max-w-md overflow-hidden rounded-lg border', className, {
        'aspect-video': aspect === 'video',
        'aspect-square': aspect === 'square',
        'aspect-auto': aspect === 'auto'
      })}
    >
      <Img src={imgSrc} alt='img' className='h-full w-full object-cover' />
      <div className='absolute right-1 top-1 cursor-pointer rounded-full bg-red-500 p-0.5'>
        <X className='text-white' onClick={onClick} />
      </div>
    </div>
  )
}
