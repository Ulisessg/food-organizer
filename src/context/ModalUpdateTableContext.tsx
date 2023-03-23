import { type FC, type ReactNode, createContext, useState } from 'react'
import safeObjectGet from 'utils/safeObjectGet'

const initialState: ModalUpdateTableContextState = {
  addInput: () => {
    //
  },
  anyInputChanged: false,
  inputs: {},
  updateInputChangedState: () => {
    //
  }
}

export const ModalUpdateTableContext = createContext(initialState)

export const ModalUpdateTableContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [
    anyInputChanged,
    setAnyInputChanged
  ] = useState<boolean>(false)
  const [
    inputsCahangedStatus,
    setInputsCahangedStatus
  ] = useState<ModalUpdateTableContextState['inputs']>({})

  const addInput: ModalUpdateTableContextState['addInput'] = (inputName) => {
    setInputsCahangedStatus((prev) => ({ ...prev, [inputName]: false }))
  }

  const updateInputChangedState:
  ModalUpdateTableContextState['updateInputChangedState'] = (inputName, isChanged) => {
    setInputsCahangedStatus((prev) => ({ ...prev, [inputName]: Boolean(isChanged) }))
    if (isChanged) {
      setAnyInputChanged(true)
    } else {
      setAnyInputChanged(Object.keys(inputsCahangedStatus).some((key) => {
        if (inputName === key) return false
        return safeObjectGet(
          inputsCahangedStatus,
          key
        )
      }))
    }
  }

  return <ModalUpdateTableContext.Provider value={{
    addInput,
    anyInputChanged,
    inputs: inputsCahangedStatus,
    updateInputChangedState
  }}>
    {
      children
    }
  </ModalUpdateTableContext.Provider>
}

interface ModalUpdateTableContextState {
  addInput: (inputName: string) => void
  updateInputChangedState: (inputName: string, isChanged: boolean) => void
  inputs: Record<string, boolean>
  anyInputChanged: boolean
}
