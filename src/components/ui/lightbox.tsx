/* eslint-disable @next/next/no-img-element */
import { Maximize, Minimize, X } from 'lucide-react'
import { type Dispatch, type SetStateAction, useRef, useState } from 'react'
import { cn } from '~/lib/utils'
import styles from '~/styles/components/ui/lightbox.module.scss'

interface Props {
  open: boolean
  onOpenChange: Dispatch<SetStateAction<boolean>>
  src: string
}

const LightBox = ({ open, onOpenChange, src }: Props) => {
  const [fullScreenToggle, setfullScreenToggle] = useState(false)
  const lightboxRef = useRef<HTMLDivElement | null>(null)

  const handleFullscreen = () => {
    if (lightboxRef.current) {
      lightboxRef.current.requestFullscreen().catch(error => {
        console.error('Failed to enter fullscreen mode:', error)
      })
      setfullScreenToggle(true)
    }
  }

  const closeFullscreen = async () => {
    try {
      await document.exitFullscreen()
    } catch (error) {
      console.error('Failed to exit fullscreen mode:', error)
    }
    setfullScreenToggle(false)
  }

  const handleClose = () => {
    onOpenChange(false)
    setfullScreenToggle(false)
  }

  return (
    <>
      {open && (
        <div
          ref={lightboxRef}
          className={cn(
            { hidden: !open },
            styles.lightbox,
            'w-100 fixed inset-0 z-50 h-screen bg-background/40 bg-opacity-80 backdrop-blur-md'
          )}
        >
          <div className='absolute right-2 top-2 flex items-center justify-center lg:right-6 lg:top-6'>
            {fullScreenToggle ? (
              <Minimize className='mr-4 size-7 cursor-pointer text-foreground' onClick={closeFullscreen} />
            ) : (
              <Maximize className='mr-4 size-7 cursor-pointer text-foreground' onClick={handleFullscreen} />
            )}

            <X className={cn('size-7 cursor-pointer text-foreground')} onClick={handleClose} />
          </div>
          <div className='flex-all h-full w-full'>
            <img src={src} alt={src} className='xxl:p-12 mx-auto max-h-full max-w-full p-2 md:p-5 lg:p-8 xl:p-10' />
          </div>
        </div>
      )}
    </>
  )
}

export default LightBox
