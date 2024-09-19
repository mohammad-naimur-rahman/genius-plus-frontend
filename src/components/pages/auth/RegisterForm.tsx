'use client'

import { ChevronRight, MailCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import loginImg from '~/assets/images/pages/auth/login.jpeg'
import AuthHeading from '~/components/reusable/auth/AuthHeading'
import AuthWrapper from '~/components/reusable/auth/AuthWrapper'
import Form from '~/components/reusable/form/form'
import { Input } from '~/components/reusable/form/input'
import { Button } from '~/components/ui/button'
import Link from '~/components/ui/llink'
import Typography from '~/components/ui/typography'
import { signupPasswordRegex } from '~/configs/auth'
import usePush from '~/hooks/usePush'
import { useSignupMutation } from '~/redux/features/authApi'
import { rtkErrorMessage } from '~/utils/error/errorMessage'

export interface RegisterFormValues {
  name: string
  email: string
  password: string
}

export default function RegisterForm() {
  const push = usePush()
  const methods = useForm<RegisterFormValues>()
  const [emailSent, setemailSent] = useState(false)
  const {
    handleSubmit,
    formState: {
      errors: { password: passwordErrors }
    }
  } = methods

  const [signup, { isLoading, isSuccess, isError, error, data }] = useSignupMutation()

  useEffect(() => {
    if (isSuccess) {
      setemailSent(true)
      toast.success('Email sent successfully!')
    }

    if (isError) toast.error(rtkErrorMessage(error))
  }, [isSuccess, isError, error, data, push])

  return (
    <AuthWrapper heroImgSrc={loginImg} formPosition='right'>
      {emailSent ? (
        <div className='mt-10 flex items-center justify-center'>
          <div className='flex flex-col items-center justify-center text-center'>
            <MailCheck size={72} strokeWidth={1} className='text-emerald-500' />
            <Typography variant='h3' className='mt-5 text-center font-medium'>
              Check your email
            </Typography>
            <p className='mt-5 max-w-md text-balance text-lg font-medium text-muted-foreground'>
              We&apos;ve sent you an email with the email verification code. Click on the link in the email to verify
              your account.
            </p>
          </div>
        </div>
      ) : (
        <Form methods={methods} onSubmit={handleSubmit(data => signup(data))} className='w-full max-w-sm'>
          <AuthHeading title='Signup' description='Get started with us for free.' />
          <Input name='name' type='text' label='Full Name' placeholder='Enter your name' required />
          <Input name='email' type='email' label='Email' placeholder='Enter your email' required />
          <Input
            name='password'
            type='password'
            label='Password'
            placeholder='********'
            required
            hookFormConfig={{ pattern: signupPasswordRegex }}
          />
          {passwordErrors?.type === 'pattern' && (
            <p className='mb-3 text-xs text-destructive'>
              Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase
              letter, one number and one special character.
            </p>
          )}

          <Button type='submit' icon={<ChevronRight />} iconPosition='right' isLoading={isLoading}>
            Register
          </Button>
          <p className='mt-2 text-center text-sm text-muted-foreground'>
            Already have an account?{' '}
            <Link href='/login' className='text-link'>
              Login
            </Link>
          </p>
        </Form>
      )}
    </AuthWrapper>
  )
}
