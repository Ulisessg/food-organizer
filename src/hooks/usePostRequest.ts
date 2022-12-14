import axios, { AxiosRequestConfig } from 'axios'
import type { response } from 'controllers/response'
import { useState } from 'react'

// eslint-disable-next-line max-lines-per-function
const usePostRequest = <DataSend>
  (
    url: string,
    axiosConfig?: AxiosRequestConfig<DataSend>
  ): UsePostRequestReturn<DataSend> => {
  const [
    requestInfo,
    setRequestInfo
  ] = useState<UsePostRequestInfo>({
    error: false,
    requestEnd: false,
    requestInit: false,
    response: ''
  })

  const postData = (data: DataSend): void => {
    setRequestInfo((prev) => ({
      ...prev,
      error: false,
      requestEnd: false,
      requestInit: true,
      response: ''
    }))
    axios.post<response<string>>(
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
    })
      .catch((err) => {
        setRequestInfo((prev) => ({
          ...prev,
          error: true,
          requestEnd: true,
          requestInit: false,
          response: err.response.data.data
        }))
      })
  }

  return {
    ...requestInfo,
    postData
  }
}

interface UsePostRequestReturn<Data> extends UsePostRequestInfo {
  postData: (data: Data) => void
}

interface UsePostRequestInfo {
  requestInit: boolean
  requestEnd: boolean
  error: boolean
  response: string
}

export default usePostRequest
