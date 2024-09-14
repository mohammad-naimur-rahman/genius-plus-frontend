import { Img } from '~/components/ui/img'
import { cn } from '~/lib/utils'

function getAbbreviation(name: string): string {
  if (!name) return ''

  // Split the name into words
  const words = name.trim().split(/\s+/)

  // Map each word to its first letter and join them together
  const abbreviation = words.map(word => word[0]).join('')

  return abbreviation.toUpperCase()
}

interface Props {
  imgSrc?: string
  name: string
  className?: string
  wrapperClassName?: string
}

export default function CardAvatar({ imgSrc, name, className, wrapperClassName }: Props) {
  return (
    <div className={wrapperClassName}>
      <div className={cn('size-20 overflow-hidden rounded-full', className)}>
        {imgSrc ? (
          <Img src={imgSrc} alt={name} className='aspect-square size-full rounded-full object-cover' />
        ) : (
          <div className='flex size-full items-center justify-center rounded-full bg-blue-light text-xl font-semibold text-blue-dark'>
            <p>{getAbbreviation(name)}</p>
          </div>
        )}
      </div>
    </div>
  )
}
