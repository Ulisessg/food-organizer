import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { response } from 'controllers/response'
import { useState } from 'react'

// eslint-disable-next-line max-lines-per-function
const usePostRequest = <DataSend, Res>
  (
    url: string,
    axiosConfig?: AxiosRequestConfig<DataSend>
  ): UsePostRequestReturn<DataSend, Res> => {
  const [
    requestInfo,
    setRequestInfo
  ] = useState<UsePostRequestInfo<Res>>({
    error: false,
    requestEnd: false,
    requestInit: false,
    response: ''
  })

  const postData = async (data: DataSend): Promise<AxiosResponse<response<Res | string>>> => {
    setRequestInfo((prev) => ({
      ...prev,
      error: false,
      requestEnd: false,
      requestInit: true,
      response: ''
    }))
    try {
      const result = await axios.post<response<string | Res>>(
        url,
        data,
        { ...axiosConfig }
      )
      setRequestInfo((prev) => ({
        ...prev,
        error: false,
        requestEnd: true,
        requestInit: false,
        response: result.data.data as string
      }))
      return result
    } catch (error) {
      const err = error as any
      setRequestInfo((prev) => ({
        ...prev,
        error: true,
        requestEnd: true,
        requestInit: false,
        response: err.response.data.data
      }))
      return error as any
    }
  }

  return {
    ...requestInfo,
    postData
  }
}

interface UsePostRequestReturn<Data, Res> extends UsePostRequestInfo<Res> {
  postData: (data: Data) => Promise<AxiosResponse<response<Res | string>>>
}

export type CallbacksResponse<T> = response<AxiosResponse<T>>

interface UsePostRequestInfo<T> {
  requestInit: boolean
  requestEnd: boolean
  error: boolean
  response: string | T
}

export default usePostRequest
