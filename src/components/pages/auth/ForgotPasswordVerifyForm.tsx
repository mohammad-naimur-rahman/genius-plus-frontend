'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import heroImg from '~/assets/images/pages/auth/verifyForgetPassword.jpeg'
import AuthEmailVerify from '~/components/reusable/auth/AuthEmailVerify'
import AuthWrapper from '~/components/reusable/auth/AuthWrapper'
import usePush from '~/hooks/usePush'
import { useForgotPasswordVerifyMutation } from '~/redux/features/authApi'
import { rtkErrorMessage } from '~/utils/error/errorMessage'

export default function ForgotPasswordVerifyForm() {
  const push = usePush()
  const params = useSearchParams()
  const code = params.has('code') && params.get('code')

  const [verifyEmail, { isLoading, isSuccess, isError, error, data }] = useForgotPasswordVerifyMutation()

  useEffect(() => {
    if (code) {
      void verifyEmail({ code })
    }
  }, [code, verifyEmail])

  useEffect(() => {
    if (isSuccess) {
      toast.success('Email verified successfully!')

      setTimeout(() => {
        push(`/forgot-password/reset-password?token=${data.data.token}`)
      }, 3000)
    }
    if (isError) toast.error(rtkErrorMessage(error))
  }, [isSuccess, isError, error, data, push])

  return (
    <AuthWrapper heroImgSrc={heroImg}>
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
            description='Soon, you will be redirected to the reset password page.'
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
