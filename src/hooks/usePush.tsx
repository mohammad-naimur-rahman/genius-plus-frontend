import { type NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useParams, useRouter } from 'next/navigation'
import { useCallback } from 'react'

export default function usePush() {
  const { lang } = useParams()
  const router = useRouter()

  const localizedPush = useCallback(
    (path: string, options?: NavigateOptions) => {
      const localizedPath = `/${lang as string}${path}`
      router.push(localizedPath, options)
    },
    [lang, router]
  )

  return localizedPush
}
