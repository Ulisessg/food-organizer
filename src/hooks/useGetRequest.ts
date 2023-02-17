import axios, { type AxiosRequestConfig } from 'axios'
import { useEffect, useRef, useState } from 'react'
import { type response } from 'controllers/response'

// eslint-disable-next-line max-lines-per-function
const useGetRequest = <ReturnT>(
  url: string,
  requestConfig?: AxiosRequestConfig
): IUseRequestReturn<ReturnT> => {
  const reqConfigRef = useRef(requestConfig)
  const urlRef = useRef(url)

  const [
    useRequest,
    setUseRequest
  ] = useState<Omit<IUseRequestReturn<ReturnT>, 'getData'>>({
    data: '',
    error: false,
    isLoading: true
  })

  useEffect(
    () => {
      const getData = async (): Promise<void> => {
        try {
          const res = await axios.get<response<ReturnT>>(
            urlRef.current,
            {
              ...reqConfigRef.current,
              method: 'GET'
            }
          )
          setUseRequest((prev) => ({
            ...prev,
            data: res.data.data,
            error: res.data.error,
            isLoading: false
          }))
        } catch (error) {
          const err = error as Error
          setUseRequest((prev) => ({
            ...prev,
            data: err.message,
            error: true,
            isLoading: false
          }))
        }
      }
      void getData()
    },
    []
  )

  return {
    data: useRequest.data,
    error: useRequest.error,
    isLoading: useRequest.isLoading
  }
}

export default useGetRequest

interface IUseRequestReturn<T> {
  data: T | string
  error: boolean
  isLoading: boolean
}
