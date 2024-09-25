'use client'

import { CircleCheck, Lock } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import heroImg from '~/assets/images/pages/auth/resetForgetPassword.jpeg'
import AuthHeading from '~/components/reusable/auth/AuthHeading'
import AuthWrapper from '~/components/reusable/auth/AuthWrapper'
import Form from '~/components/reusable/form/form'
import { Input } from '~/components/reusable/form/input'
import { Button } from '~/components/ui/button'
import { signupPasswordRegex } from '~/configs/auth'
import usePush from '~/hooks/usePush'
import { useResetForgotPasswordMutation } from '~/redux/features/authApi'
import { saveCookies } from '~/utils/auth/saveCookies'
import { rtkErrorMessage } from '~/utils/error/errorMessage'

export interface ForgotResetPasswordFormValues {
  password: string
  repeatPassword: string
}

export default function ForgotResetPasswordForm() {
  const push = usePush()
  const params = useSearchParams()
  const token = params.get('token')
  const methods = useForm<ForgotResetPasswordFormValues>()
  const {
    handleSubmit,
    formState: {
      errors: { password: passwordErrors }
    }
  } = methods

  const [resetPassword, { isLoading, isSuccess, isError, error, data }] = useResetForgotPasswordMutation()

  useEffect(() => {
    if (isSuccess) {
      toast.success('Email sent successfully!')

      const { refreshToken, accessToken } = { ...data.tokens }
      const userData = { ...data.data }
      saveCookies(accessToken, refreshToken, userData)

      if (userData.role === 'user') push('/features')
      else push('/admin/dashboard')
    }

    if (isError) toast.error(rtkErrorMessage(error))
  }, [isSuccess, isError, error, push, data])

  const onSubmit = (data: ForgotResetPasswordFormValues) => {
    if (!token) return
    const { password, repeatPassword } = data
    if (password !== repeatPassword) return toast.error('Passwords do not match')
    void resetPassword({ password, token })
  }

  return (
    <AuthWrapper heroImgSrc={heroImg}>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)} className='w-full max-w-sm'>
        <AuthHeading title='Forgot password?' description='Enter your email to reset your password.' />
        <Input
          name='password'
          type='password'
          label='Password'
          placeholder='********'
          icon={<Lock />}
          required
          hookFormConfig={{ pattern: signupPasswordRegex }}
        />
        {passwordErrors?.type === 'pattern' && (
          <p className='mb-3 text-xs text-destructive'>
            Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter,
            one number and one special character.
          </p>
        )}
        <Input name='repeatPassword' type='password' label='Repeat Password' placeholder='********' required />
        <Button type='submit' icon={<CircleCheck />} iconPosition='right' isLoading={isLoading}>
          Reset Password
        </Button>
      </Form>
    </AuthWrapper>
  )
}
