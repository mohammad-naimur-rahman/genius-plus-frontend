import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Lottie from 'react-lottie'
import { lottieDefaultOptions } from '~/configs/lottie'
import { cn } from '~/lib/utils'

interface Props {
  isOpen: boolean
  animationData: JSON
  text?: string
}

export default function Overlay({ isOpen, animationData, text }: Props) {
  const overlayRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    overlayRef.current = document.getElementById('modal-container')

    if (isOpen) {
      document.documentElement.classList.add('overflow-y-hidden')
    } else {
      document.documentElement.classList.remove('overflow-y-hidden')
    }

    return () => {
      document.documentElement.classList.remove('overflow-y-hidden')
      overlayRef.current = null
    }
  }, [isOpen])

  return isOpen
    ? createPortal(
        <div
          className={cn(
            'bg-foreground/5 fixed left-0 top-0 z-[100] flex min-h-screen w-full items-center justify-center backdrop-blur-md'
          )}
        >
          <div className='max-w-md'>
            <Lottie options={lottieDefaultOptions(animationData)} />
            {text ? (
              <p className='text-balance px-5 text-center text-lg font-medium text-sky-700'>{text}</p>
            ) : (
              <div className='h-7 w-full' />
            )}
          </div>
        </div>,
        overlayRef.current as HTMLElement | DocumentFragment
      )
    : null
}
