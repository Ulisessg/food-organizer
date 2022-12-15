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

  const postData = (
    data: DataSend,
    successCallback?: (res: CallbacksResponse<Res>) => void,
    errorCallback?: (res: CallbacksResponse<Res>) => void
  ): void => {
    setRequestInfo((prev) => ({
      ...prev,
      error: false,
      requestEnd: false,
      requestInit: true,
      response: ''
    }))
    axios.post<response<string | Res>>(
      url,
      data,
      { ...axiosConfig }
    ).then((resp) => {
      setRequestInfo((prev) => ({
        ...prev,
        error: false,
        requestEnd: true,
        requestInit: false,
        response: resp.data.data as string
      }))
      if (typeof successCallback !== 'undefined') successCallback(resp as any)
    })
      .catch((err) => {
        setRequestInfo((prev) => ({
          ...prev,
          error: true,
          requestEnd: true,
          requestInit: false,
          response: err.response.data.data
        }))
        if (typeof errorCallback !== 'undefined') errorCallback(err)
      })
  }

  return {
    ...requestInfo,
    postData
  }
}

interface UsePostRequestReturn<Data, Res> extends UsePostRequestInfo<Res> {
  postData: (data: Data,
    successCallback?: (rs: CallbacksResponse<Res>) => void,
    errorCallback?: (rs: CallbacksResponse<Res>) => void
  ) => void
}

export type CallbacksResponse<T> = response<AxiosResponse<T>>

interface UsePostRequestInfo<T> {
  requestInit: boolean
  requestEnd: boolean
  error: boolean
  response: string | T
}

export default usePostRequest
