/* eslint-disable max-lines-per-function */
import { FC, ReactNode, createContext, useEffect, useState } from 'react'
import type { GetUOM } from 'controllers/food_organizer_crud/unitsOfMeasureCRUD'
import type { GetUOMT } from 'controllers/food_organizer_crud/unitsOfMeasureTypeCRUD'
import useGetRequest from 'hooks/useGetRequest'

const initialValues: ContextValue = {
  errorGettingUom: {
    error: false,
    message: ''
  },
  errorGettingUomt: {
    error: false,
    message: ''
  },
  unitsOfMeasureOrderByUomt: [],
  unitsOfMeasureTypes: [],
  uomIsLoading: true,
  uomtIsLoading: true,
  updateUom: (_data) => {
    //
  },
  updateUomt: (_data) => {
    //
  }
}

export const UnitsOfMeasureContext = createContext<ContextValue>(initialValues)

export const UnitsOfMeasureContextProvider: FC<ContextProps> = ({ children }) => {
  const [
    contextValues,
    setContextValues
  ] = useState<Omit<ContextValue, 'updateUomt'>>(initialValues)

  const {
    data: uomData,
    error: uomError,
    isLoading: uomIsLoading,
    getData: oumGetData
  } = useGetRequest('/api/uom')

  const {
    data: uomtData,
    error: uomtError,
    getData: uomtGetData,
    isLoading: uomtIsLoading
  } = useGetRequest('/api/uomt')

  const updateUom = (data: GetUOM[0]): void => {
    setContextValues((prev) => ({
      ...prev,
      unitsOfMeasureOrderByUomt: [
        ...prev.unitsOfMeasureOrderByUomt,
        data
      ]
    }))
  }
  const updateUomt = (data: GetUOMT[0]): void => {
    setContextValues((prev) => ({
      ...prev,
      unitsOfMeasureTypes: [
        ...prev.unitsOfMeasureTypes,
        data
      ]
    }))
  }

  useEffect(
    () => {
      oumGetData()
    },
    []
  )

  useEffect(
    () => {
      uomtGetData()
    },
    []
  )

  useEffect(
    () => {
      if (!uomIsLoading) {
        if (uomError) {
          setContextValues((prev) => ({
            ...prev,
            errorGettingUom: {
              error: true,
              message: uomData as string
            },
            uomIsLoading: false
          }))
        } else {
          setContextValues((prev) => ({
            ...prev,
            errorGettingUom: {
              error: false,
              message: ''
            },
            unitsOfMeasureOrderByUomt: uomData as GetUOM,
            uomIsLoading: false
          }))
        }
      }
    },
    [
      uomData,
      uomError,
      uomIsLoading
    ]
  )

  useEffect(
    () => {
      if (!uomtIsLoading) {
        if (uomtError) {
          setContextValues((prev) => ({
            ...prev,
            errorGettingUomt: {
              error: true,
              message: uomtData as string
            },
            uomtIsLoading: false
          }))
        } else {
          setContextValues((prev) => ({
            ...prev,
            errorGettingUomt: {
              error: false,
              message: ''
            },
            unitsOfMeasureTypes: uomtData as GetUOMT,
            uomtIsLoading: false
          }))
        }
      }
    },
    [
      uomtData,
      uomtError,
      uomtIsLoading
    ]
  )

  return <UnitsOfMeasureContext.Provider value={{
    ...contextValues,
    updateUom,
    updateUomt
  }}>
    {children}
  </UnitsOfMeasureContext.Provider>
}

interface ContextProps {
  children: ReactNode
}

interface ContextValue {
  unitsOfMeasureTypes: GetUOMT
  unitsOfMeasureOrderByUomt: GetUOM
  errorGettingUomt: {
    error: boolean
    message: string
  }
  errorGettingUom: {
    error: boolean
    message: string
  }
  uomIsLoading: boolean
  uomtIsLoading: boolean
  updateUomt: (data: GetUOMT[0]) => void
  updateUom: (data: GetUOM[0]) => void
}
