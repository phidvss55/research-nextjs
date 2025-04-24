import axios, { type AxiosRequestConfig } from 'axios'

export const createHttp = (baseURL: string | undefined) => {
  const options: AxiosRequestConfig = {
    baseURL
  }

  const http = axios.create(options)

  const attachCookieToHeaders = (): string => {
    return ''
  }

  // Add a request interceptor
  http.interceptors.request.use(
    async (config: any) => {
      if (config.url != '/login' && config.baseURL != null) {
        try {
          const accessToken = attachCookieToHeaders()

          config.headers.Authorization = accessToken || ''
          config.headers = config.headers || {}
        } catch (e) {
          console.log(e)
        }
      }

      // Do something before request is sent
      return config
    },
    async (error: any) => {
      // Do something with request error
      return await Promise.reject(error)
    }
  )

  // Add a response interceptor
  http.interceptors.response.use(
    (response: any) => {
      // Do something with response data
      return response.data
    },
    async (error: any) => {
      // Do something with response error
      return await Promise.reject(error)
    }
  )

  return http
}
