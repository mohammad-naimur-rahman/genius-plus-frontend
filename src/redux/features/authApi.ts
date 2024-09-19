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
        body,
        credentials: 'include'
      })
    })
  })
})

export const { useLoginMutation, useSignupMutation } = authApi
