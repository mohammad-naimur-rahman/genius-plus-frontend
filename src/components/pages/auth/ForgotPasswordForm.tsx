'use client'

import { Mail, Send } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import heroImg from '~/assets/images/pages/auth/forgetPassword.jpeg'
import AuthEmailVerify from '~/components/reusable/auth/AuthEmailVerify'
import AuthHeading from '~/components/reusable/auth/AuthHeading'
import AuthWrapper from '~/components/reusable/auth/AuthWrapper'
import Form from '~/components/reusable/form/form'
import { Input } from '~/components/reusable/form/input'
import { Button } from '~/components/ui/button'
import { useForgotPasswordMutation } from '~/redux/features/authApi'
import { rtkErrorMessage } from '~/utils/error/errorMessage'

export interface ForgotPasswordFormValues {
  email: string
  password: string
}

export default function ForgotPasswordForm() {
  const [emailSent, setemailSent] = useState(false)
  const methods = useForm<ForgotPasswordFormValues>()
  const { handleSubmit } = methods

  const [sendVerificationLink, { isLoading, isSuccess, isError, error }] = useForgotPasswordMutation()

  useEffect(() => {
    if (isSuccess) {
      setemailSent(true)
      toast.success('Email sent successfully!')
    }

    if (isError) toast.error(rtkErrorMessage(error))
  }, [isSuccess, isError, error])
  return (
    <AuthWrapper heroImgSrc={heroImg}>
      {emailSent ? (
        <AuthEmailVerify
          title='Check your email'
          description=" We've sent you an email with the email verification code. Click on the link in the email to verify
              your account."
          state='sent'
        />
      ) : isError ? (
        <AuthEmailVerify title='Email sending failed' description={rtkErrorMessage(error)} state='failed' />
      ) : (
        <Form methods={methods} onSubmit={handleSubmit(data => sendVerificationLink(data))} className='w-full max-w-sm'>
          <AuthHeading title='Forgot password?' description='Enter your email to reset your password.' />
          <Input name='email' type='email' label='Email' icon={<Mail />} placeholder='Enter your email' required />
          <Button type='submit' icon={<Send />} iconPosition='right' isLoading={isLoading}>
            Send verification link
          </Button>
        </Form>
      )}
    </AuthWrapper>
  )
}
