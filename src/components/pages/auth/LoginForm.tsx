'use client'

import { LogIn } from 'lucide-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import loginImg from '~/assets/images/pages/auth/login.jpeg'
import AuthHeading from '~/components/reusable/auth/AuthHeading'
import AuthWrapper from '~/components/reusable/auth/AuthWrapper'
import { Checkbox } from '~/components/reusable/form/checkbox'
import Form from '~/components/reusable/form/form'
import { Input } from '~/components/reusable/form/input'
import { Button } from '~/components/ui/button'
import Link from '~/components/ui/llink'
import { useLoginMutation } from '~/redux/features/authApi'
import { rtkErrorMessage } from '~/utils/error/errorMessage'

export interface LoginFormValues {
  email: string
  password: string
}

export default function LoginForm() {
  const methods = useForm<LoginFormValues>()
  const { handleSubmit } = methods

  const [login, { isLoading, isSuccess, isError, error, data }] = useLoginMutation()

  useEffect(() => {
    if (isSuccess) {
      console.log(data)
    }

    if (isError) toast.error(rtkErrorMessage(error))
  }, [isSuccess, isError, error, data])

  return (
    <AuthWrapper heroImgSrc={loginImg} formPosition='left'>
      <Form methods={methods} onSubmit={handleSubmit(data => login(data))} className='w-full max-w-sm'>
        <AuthHeading title='Login' description='Login with your account to get started' />
        <Input name='email' type='email' label='Email' placeholder='Enter your email' required />
        <Input name='password' type='password' label='Password' placeholder='********' required />
        <div className='mb- mb-4 flex items-center justify-between gap-x-3 gap-y-2'>
          <Checkbox label='Remember Me' id='remember-me' />
          <Link href='/forgot-password' className='text-link'>
            Forgot Password?
          </Link>
        </div>
        <Button type='submit' icon={<LogIn />} iconPosition='right' isLoading={isLoading}>
          Login
        </Button>
        <p className='mt-2 text-center text-sm text-muted-foreground'>
          Don&apos;t have an account?{' '}
          <Link href='/register' className='text-link'>
            Register
          </Link>
        </p>
      </Form>
    </AuthWrapper>
  )
}
