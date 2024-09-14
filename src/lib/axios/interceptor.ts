import axios, { type AxiosError, type AxiosRequestConfig } from 'axios'
import { getCookie, setCookie } from 'cookies-next'
import { API_URL } from '~/configs'
import { calculateTokenExpiration } from '~/utils/auth/calculateTokenExpiration'
import { getToken } from '~/utils/auth/getToken'

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`
  }
})

axiosInstance.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean }
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const refreshToken = getCookie('refreshToken')!
        const response: { data: { token: { accessToken: string } } } = await axios.post(`${API_URL}/auth/login`, {
          type: 'refresh',
          refreshToken
        })
        const accessToken = response?.data?.token?.accessToken
        setCookie('accessToken', accessToken, {
          maxAge: calculateTokenExpiration(accessToken)
        })
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)
