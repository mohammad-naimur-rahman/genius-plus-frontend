import { type Dispatch, type ThunkDispatch, type UnknownAction } from '@reduxjs/toolkit'
import { type CombinedState } from '@reduxjs/toolkit/query'
import { deleteCookie } from 'cookies-next'
import api from '~/redux/api'

export const logoutActions = (
  dispatch: ThunkDispatch<
    {
      api: CombinedState<NonNullable<unknown>, 'users', 'api'>
    },
    undefined,
    UnknownAction
  > &
    Dispatch<UnknownAction>,
  cb = () => {}
) => {
  deleteCookie('accessToken')
  deleteCookie('refreshToken')
  deleteCookie('userData')
  dispatch(api.util.resetApiState())
  cb()
}
