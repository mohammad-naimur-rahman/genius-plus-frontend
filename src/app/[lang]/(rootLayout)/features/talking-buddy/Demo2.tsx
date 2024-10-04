'use client'

import { useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'
import { useStream } from '~/hooks/useStream'

export default function Demo2() {
  const [prompt, setprompt] = useState<string>('continue')

  const [start, { isLoading, isCompleted, data, isError, error }] = useStream(`/talkingBuddies/run/1`, {
    prompt
  })

  useEffect(() => {
    if (isError) console.log(error?.message)
  }, [isError, error])
  return (
    <div>
      <textarea
        value={prompt}
        onChange={e => setprompt(e.target.value)}
        className='rounded-md border border-gray-300 p-2'
      />
      <Button onClick={start}>Start</Button>

      {isLoading && <p>Loading...</p>}
      {isCompleted && <p>Comleted data: {data}</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  )
}
