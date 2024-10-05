import { useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

export const useSpeechSynthesis = () => {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    setVoices(speechSynthesis.getVoices())
  }, [])

  const stopSpeaking = useCallback(() => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel()
    }
    setIsSpeaking(false)
  }, [])

  const startSpeaking = useCallback(
    (text: string) => {
      if ('speechSynthesis' in window) {
        stopSpeaking() // Cancel any ongoing speech

        speechSynthesisRef.current = new SpeechSynthesisUtterance(text)
        speechSynthesisRef.current.voice = voices[110] ?? null
        speechSynthesisRef.current.pitch = 1
        speechSynthesisRef.current.rate = 1
        speechSynthesisRef.current.onstart = () => setIsSpeaking(true)
        speechSynthesisRef.current.onend = () => {
          setIsSpeaking(false)
          speechSynthesisRef.current = null
        }
        speechSynthesisRef.current.onerror = event => {
          console.error('Speech synthesis error:', event)
          setIsSpeaking(false)
          speechSynthesisRef.current = null
        }
        speechSynthesis.speak(speechSynthesisRef.current)
      } else {
        console.warn('Speech synthesis not supported')
        toast.error('Speech synthesis is not supported in this browser.')
      }
    },
    [stopSpeaking, voices]
  )

  return {
    isSpeaking,
    startSpeaking,
    stopSpeaking
  }
}
