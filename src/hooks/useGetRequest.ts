import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { response } from 'controllers/response'

// eslint-disable-next-line max-lines-per-function
const useGetRequest = <ReturnT>(url: string): IUseRequestReturn<ReturnT> => {
  const [
    useRequest,
    setUseRequest
  ] = useState<IUseRequestReturn<ReturnT>>({
    data: '',
    error: false,
    isLoading: true
  })

  const getData = useCallback(
    async (): Promise<void> => {
      try {
        const result = await axios.get<response<ReturnT>>(
          url,
          {
            method: 'GET'
          }
        )
        setUseRequest({
          ...useRequest,
          data: result.data.data as ReturnT,
          error: result.data.error,
          isLoading: false
        })
      } catch (error) {
        const err = error as Error
        setUseRequest({
          ...useRequest,
          data: err.message,
          error: true,
          isLoading: false
        })
      }
    },
    [url]
  )
  useEffect(
    () => {
      void (async () => {
        await getData()
      })()
    },
    [getData]
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
