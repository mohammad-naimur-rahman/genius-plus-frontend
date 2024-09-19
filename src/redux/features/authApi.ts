import { type ForgotPasswordFormValues } from '~/components/pages/auth/ForgotPasswordForm'
import { type LoginFormValues } from '~/components/pages/auth/LoginForm'
import { type RegisterFormValues } from '~/components/pages/auth/RegisterForm'
import { type Response, type ResponseWithTokens, type WithId } from '~/types/common/Response'
import { type User } from '~/types/User'
import api from '../api'

const rootApi = '/auth'

const authApi = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<ResponseWithTokens<WithId<User>>, LoginFormValues>({
      query: body => ({
        url: `${rootApi}/login`,
        method: 'POST',
        body,
        credentials: 'include'
      })
    }),
    signup: builder.mutation<Response<{ verificationLink: string }>, RegisterFormValues>({
      query: body => ({
        url: `${rootApi}/signup`,
        method: 'POST',
        body
      })
    }),
    signupVerify: builder.mutation<ResponseWithTokens<WithId<User>>, { code: string }>({
      query: body => ({
        url: `${rootApi}/signup-verify`,
        method: 'POST',
        body,
        credentials: 'include'
      })
    }),
    forgotPassword: builder.mutation<Response<{ verificationLink: string }>, ForgotPasswordFormValues>({
      query: body => ({
        url: `${rootApi}/forget-password`,
        method: 'POST',
        body
      })
    }),
    forgotPasswordVerify: builder.mutation<Response<{ token: string }>, { code: string }>({
      query: body => ({
        url: `${rootApi}/verify-forget-password`,
        method: 'POST',
        body
      })
    }),
    resetForgotPassword: builder.mutation<ResponseWithTokens<WithId<User>>, { password: string; token: string }>({
      query: body => ({
        url: `${rootApi}/reset-forget-password`,
        method: 'POST',
        body
      })
    })
  })
})

export const {
  useLoginMutation,
  useSignupMutation,
  useSignupVerifyMutation,
  useForgotPasswordMutation,
  useForgotPasswordVerifyMutation,
  useResetForgotPasswordMutation
} = authApi
