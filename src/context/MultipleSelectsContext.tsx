
import React, { type FC, type ReactNode, createContext } from 'react'
import
useMultipleSelectsContext,
{ type UseMultipleSelectsReturn } from 'hooks/context/useMultipleSelectsContext'

const initialState: UseMultipleSelectsReturn = {
  addSelect: () => {
    //
  },
  data: {
    selects: [],
    valuesUsed: []
  },
  deleteSelect: () => {
    //
  },
  disableButton: true,
  onChange: () => {
    //
  },
  resetMultipleSelect: () => {
    //
  }
}

export const MultipleSelectsContext = createContext(initialState)

export const MultipleSelectsContextProvider: FC<MultipleSelectsContextProps> = ({
  children,
  optionsLenght,
  idPrefix
}) => {
  const MultipleSelectsHook = useMultipleSelectsContext(
    idPrefix,
    optionsLenght
  )

  return <MultipleSelectsContext.Provider value={{
    ...MultipleSelectsHook
  }}>
    {children}
  </MultipleSelectsContext.Provider>
}

interface MultipleSelectsContextProps {
  children: ReactNode
  idPrefix?: string | undefined
  optionsLenght?: number | undefined
}
