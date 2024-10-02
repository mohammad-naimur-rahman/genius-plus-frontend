'use client'

import React, { useCallback, useRef, useState, type FormEvent } from 'react'
import ReactMarkdown from 'react-markdown'
import { Button } from '~/components/ui/button'
import { API_URL } from '~/configs'
import { getToken } from '~/utils/auth/getToken'

interface ThreadRunComponentProps {
  threadId: number
}

interface Message {
  content: string
  timestamp: number
}

const ThreadRunComponent: React.FC<ThreadRunComponentProps> = ({ threadId }) => {
  const [accumulatedMessage, setAccumulatedMessage] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const abortControllerRef = useRef<AbortController | null>(null)

  const runThread = useCallback(
    async (prompt: string) => {
      setIsLoading(true)
      setError(null)
      setAccumulatedMessage('')
      setIsComplete(false)

      abortControllerRef.current = new AbortController()
      const { signal } = abortControllerRef.current

      try {
        const response = await fetch(`${API_URL}/talkingBuddies/run/${threadId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`
          },
          body: JSON.stringify({ prompt }),
          signal
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const reader = response.body?.getReader()
        if (!reader) {
          throw new Error('Response body is not readable')
        }

        const decoder = new TextDecoder()

        while (true) {
          const { value, done } = await reader.read()
          const msgs: string[] = []
          if (done) break

          const decodedChunk = decoder.decode(value, { stream: true })
          const lines = decodedChunk.split('\n\n')

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              if (done) {
                console.log('Stream ended')
                setIsComplete(true)
                setIsLoading(false)
                break
              }

              try {
                const parsedData = JSON.parse(data) as string
                setAccumulatedMessage(prev => prev + parsedData)
                msgs.push(parsedData)
                // setMessages(prevMessages => [...prevMessages, { content: parsedData, timestamp: Date.now() }])
              } catch (error) {
                console.error('Failed to parse data:', error)
              }
            }
          }
        }
      } catch (err) {
        if (err instanceof Error) {
          if (err.name === 'AbortError') {
            console.log('Fetch aborted')
          } else {
            setError(err.message)
          }
        } else {
          setError('An unknown error occurred')
        }
      } finally {
        setIsLoading(false)
      }
    },
    [threadId]
  )

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      prompt: { value: string }
    }
    const prompt = target.prompt.value
    void runThread(prompt)
  }

  const handleAbort = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
  }

  const handlePlayAudio = () => {
    // Here you would implement the logic to play the audio
    // For example, using the Web Speech API:
    const utterance = new SpeechSynthesisUtterance(accumulatedMessage)
    window.speechSynthesis.speak(utterance)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='prompt'
          required
          className='rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <Button type='submit' disabled={isLoading} className='ml-2'>
          Run Thread
        </Button>
      </form>
      <Button onClick={handleAbort} disabled={!isLoading}>
        Abort
      </Button>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div>
        <ReactMarkdown>{accumulatedMessage}</ReactMarkdown>
        {/* <p>{accumulatedMessage}</p> */}
        {/* {messages.map((message, index) => (
          <p key={index}>{message.content}</p>
        ))} */}
      </div>
      {isComplete && <Button onClick={handlePlayAudio}>Play Audio</Button>}
    </div>
  )
}

export default ThreadRunComponent
