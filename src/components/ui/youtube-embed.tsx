import { type HTMLAttributes } from 'react'
import { cn } from '~/lib/utils'

interface Props extends HTMLAttributes<HTMLDivElement> {
  videoId: string
  className?: string
}

export default function YoutubeEmbed({ videoId, className, ...props }: Props) {
  return (
    <div
      className={cn(
        'relative h-0 overflow-hidden pb-[56.25%] [&>iframe]:absolute [&>iframe]:left-0 [&>iframe]:top-0 [&>iframe]:h-full [&>iframe]:w-full',
        className
      )}
      {...props}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        title='Embedded Youtube'
      />
    </div>
  )
}
