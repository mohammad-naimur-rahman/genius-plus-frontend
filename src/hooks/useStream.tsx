/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { useCallback, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { API_URL } from '~/configs'
import { getToken } from '~/utils/auth/getToken'
import { XhrSource } from '~/utils/form/eventStream'
import { isJSONValid } from '~/utils/misc/isJSONValid'

interface StreamHookResult {
  isLoading: boolean
  isCompleted: boolean
  streamData: string
  data: string
  isError: boolean
  error: Error | null
  refetch: () => void
}

interface AccessTokenResponse {
  tokens: {
    accessToken: string
  }
}

export const useStream = (url: string, reqBody: Record<string, unknown>): [() => void, StreamHookResult] => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isCompleted, setIsCompleted] = useState<boolean>(false)
  const [streamData, setStreamData] = useState<string>('')
  const [data, setData] = useState<string>('')
  const [isError, setIsError] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const xsRef = useRef<(EventTarget & { close: () => void }) | null>(null)

  const fnTrigger = useCallback(async () => {
    setIsLoading(true)
    setIsError(false)
    setError(null)
    setStreamData('')
    setData('')
    setIsCompleted(false)

    let token: string | undefined = getToken()

    try {
      if (!token) {
        const response = await axios.post<AccessTokenResponse>(`${API_URL}/auth/access-token`, {
          refreshToken: getCookie('refreshToken')
        })
        token = response.data.tokens.accessToken
      }
    } catch (error) {
      toast.error('Please login again')
      setIsLoading(false)
      setIsError(true)
      setError(new Error('Authentication failed'))
      return
    }

    try {
      xsRef.current = XhrSource(`${API_URL}${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(reqBody)
      })

      xsRef.current.addEventListener('error', (e: Event) => {
        setIsLoading(false)
        setIsError(true)
        setError(new Error((e as unknown as ErrorEvent).message))
        if (xsRef.current) xsRef.current.close()
      })

      xsRef.current.addEventListener('close', () => {
        setData(streamData) // Ensure final data is set
        setIsLoading(false)
        setIsCompleted(true)
        if (xsRef.current) xsRef.current.close()
      })

      xsRef.current.addEventListener('message', event => {
        const eventData: string = (event as unknown as { data: string }).data
        const msg: string = isJSONValid(eventData) ? (JSON.parse(eventData) as unknown as string) : ''

        if (msg) {
          setStreamData(prev => {
            const newData = prev + msg
            setData(newData) // Update data with each chunk
            return newData
          })
        }

        // Check if this is the last message (you might need to implement this check based on your API's behavior)
        if (msg.includes('STREAM_END') || msg.includes('DONE')) {
          // Adjust this condition based on your API
          setIsCompleted(true)
          setIsLoading(false)
          if (xsRef.current) xsRef.current.close()
        }
      })
    } catch (err) {
      setIsLoading(false)
      setIsError(true)
      setError(err instanceof Error ? err : new Error('An unknown error occurred'))
      if (xsRef.current) xsRef.current.close()
    }
  }, [url, reqBody])

  const refetch = useCallback(() => {
    if (xsRef.current) xsRef.current.close()
    void fnTrigger()
  }, [fnTrigger])

  return [fnTrigger, { isLoading, isCompleted, streamData, data, isError, error, refetch }]
}
