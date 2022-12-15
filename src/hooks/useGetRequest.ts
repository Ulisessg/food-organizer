import axios, { AxiosRequestConfig } from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { response } from 'controllers/response'

// eslint-disable-next-line max-lines-per-function
const useGetRequest = <ReturnT>(
  url: string,
  requestConfig?: AxiosRequestConfig
): IUseRequestReturn<ReturnT> => {
  const [
    useRequest,
    setUseRequest
  ] = useState<Omit<IUseRequestReturn<ReturnT>, 'getData'>>({
    data: '',
    error: false,
    isLoading: true
  })
  const gData = (): void => {
    axios.get<response<ReturnT>>(
      url,
      {
        ...requestConfig,
        method: 'GET'
      }
    ).then((res) => {
      setUseRequest((prev) => ({
        ...prev,
        data: res.data.data as ReturnT,
        error: res.data.error,
        isLoading: false
      }))
    })
      .catch((err: Error) => {
        setUseRequest((prev) => ({
          ...prev,
          data: err.message,
          error: true,
          isLoading: false
        }))
      })
  }
  const getData = useCallback(
    gData,
    []
  )
  useEffect(
    () => {
      getData()
    },
    [getData]
  )

  return {
    data: useRequest.data,
    error: useRequest.error,
    getData,
    isLoading: useRequest.isLoading
  }
}

export default useGetRequest

interface IUseRequestReturn<T> {
  data: T | string
  error: boolean
  isLoading: boolean
  getData: () => void
}
