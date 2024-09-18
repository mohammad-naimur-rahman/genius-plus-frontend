'use client'

import { LogIn } from 'lucide-react'
import { useForm } from 'react-hook-form'
import loginImg from '~/assets/images/pages/auth/login.jpeg'
import AuthHeading from '~/components/reusable/auth/AuthHeading'
import AuthWrapper from '~/components/reusable/auth/AuthWrapper'
import Form from '~/components/reusable/form/form'
import { Input } from '~/components/reusable/form/input'
import { Button } from '~/components/ui/button'

interface FormValues {
  email: string
  password: string
}

export default function LoginForm() {
  const methods = useForm<FormValues>()
  const { handleSubmit } = methods

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }
  return (
    <AuthWrapper heroImgSrc={loginImg} formPosition='left'>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)} className='w-full max-w-sm'>
        <AuthHeading title='Login' description='Login with your account to get started' />
        <Input name='email' type='email' label='Email' placeholder='Enter your email' required />
        <Input name='password' type='password' label='Password' placeholder='********' required />
        <Button type='submit' icon={<LogIn />} iconPosition='right'>
          Login
        </Button>
      </Form>
    </AuthWrapper>
  )
}
