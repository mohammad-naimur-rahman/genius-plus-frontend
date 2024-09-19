'use client'

import { LogIn } from 'lucide-react'
import { useEffect, useState } from 'react'
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
import usePush from '~/hooks/usePush'
import { useLoginMutation } from '~/redux/features/authApi'
import { saveCookies } from '~/utils/auth/saveCookies'
import { rtkErrorMessage } from '~/utils/error/errorMessage'

export interface LoginFormValues {
  email: string
  password: string
}

export default function LoginForm() {
  const push = usePush()
  const [rememberMe, setRememberMe] = useState(false)
  const methods = useForm<LoginFormValues>()
  const { handleSubmit } = methods

  const [login, { isLoading, isSuccess, isError, error, data }] = useLoginMutation()

  useEffect(() => {
    if (isSuccess) {
      const { refreshToken, accessToken } = { ...data.tokens }
      const userData = { ...data.data }

      if (rememberMe) saveCookies(accessToken, refreshToken, userData, true)
      else saveCookies(accessToken, refreshToken, userData)

      toast.success('Login successful!')
      if (userData.role === 'user') push('/admin/dashboard')
      else push('/features')
    }

    if (isError) toast.error(rtkErrorMessage(error))
  }, [isSuccess, isError, error, data, rememberMe, push])

  return (
    <AuthWrapper heroImgSrc={loginImg}>
      <Form methods={methods} onSubmit={handleSubmit(data => login(data))} className='w-full max-w-sm'>
        <AuthHeading title='Login' description='Login with your account to get started' />
        <Input name='email' type='email' label='Email' placeholder='Enter your email' required />
        <Input name='password' type='password' label='Password' placeholder='********' required />
        <div className='mb- mb-4 flex items-center justify-between gap-x-3 gap-y-2'>
          <Checkbox
            label='Remember Me'
            id='remember-me'
            checked={rememberMe}
            onCheckedChange={e => setRememberMe(e ? true : false)}
          />
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
