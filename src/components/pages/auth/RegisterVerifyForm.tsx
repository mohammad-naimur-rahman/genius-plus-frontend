'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import loginImg from '~/assets/images/pages/auth/login.jpeg'
import AuthEmailVerify from '~/components/reusable/auth/AuthEmailVerify'
import AuthWrapper from '~/components/reusable/auth/AuthWrapper'
import usePush from '~/hooks/usePush'
import { useSignupVerifyMutation } from '~/redux/features/authApi'
import { saveCookies } from '~/utils/auth/saveCookies'
import { rtkErrorMessage } from '~/utils/error/errorMessage'

export default function RegisterVerifyForm() {
  const push = usePush()
  const params = useSearchParams()
  const code = params.has('code') && params.get('code')

  const [verifyEmail, { isLoading, isSuccess, isError, error, data }] = useSignupVerifyMutation()

  useEffect(() => {
    if (code) {
      void verifyEmail({ code })
    }
  }, [code, verifyEmail])

  useEffect(() => {
    if (isSuccess) {
      toast.success('Email verified successfully!')

      const { accessToken, refreshToken } = { ...data.tokens }
      const userData = { ...data.data }
      saveCookies(accessToken, refreshToken, userData)

      setTimeout(() => {
        push('/features')
      }, 3000)
    }
    if (isError) toast.error(rtkErrorMessage(error))
  }, [isSuccess, isError, error, data, push])

  return (
    <AuthWrapper heroImgSrc={loginImg}>
      <div className='flex items-center justify-center'>
        {isLoading ? (
          <AuthEmailVerify
            title='Verifying your email...'
            description='Please wait while we verify your email address.'
            state='loading'
          />
        ) : null}

        {isSuccess ? (
          <AuthEmailVerify
            title='Email verified successfully!'
            description='Soon, you will be redirected to the features page.'
            state='verified'
          />
        ) : null}

        {isError ? (
          <AuthEmailVerify title='Email verification failed!' description={rtkErrorMessage(error)} state='failed' />
        ) : null}
      </div>
    </AuthWrapper>
  )
}
