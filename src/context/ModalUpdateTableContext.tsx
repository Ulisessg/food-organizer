/* eslint-disable max-lines-per-function */
import { type FC, type ReactNode, createContext, useState } from 'react'
import safeObjectGet from 'utils/safeObjectGet'

const initialState: ModalUpdateTableContextState = {
  addInput: () => {
    //
  },
  anyInputChanged: false,
  anyInputIsEmpty: false,
  inputs: {},
  inputsValues: {},
  inputsValuesRepeated: [],
  updateInputChangedState: () => {
    //
  },
  updateInputValue: () => {
    //
  }
}

export const ModalUpdateTableContext = createContext(initialState)

export const ModalUpdateTableContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [
    anyInputIsEmpty,
    setAnyInputIsEmpty
  ] = useState<boolean>(false)
  const [
    anyInputChanged,
    setAnyInputChanged
  ] = useState<boolean>(false)
  const [
    inputsValues,
    setInputsValues
  ] = useState<Record<string, string>>({})

  const [
    inputsValuesRepeated,
    setInputsValuesRepeated
  ] = useState<string[]>([])

  const [
    inputsCahangedStatus,
    setInputsCahangedStatus
  ] = useState<ModalUpdateTableContextState['inputs']>({})

  const addInput: ModalUpdateTableContextState['addInput'] = (inputName, inputValue) => {
    setInputsCahangedStatus((prev) => ({ ...prev, [inputName]: false }))
    setInputsValues((prev) => ({ ...prev, [inputName]: inputValue }))
  }

  const updateInputValue:
  ModalUpdateTableContextState['updateInputValue'] =
  (inputName, value, allowRepeatedValue = true) => {
    const inputsValuesKeys = Object.keys(inputsValues)
    setInputsValues((prev) => ({ ...prev, [inputName]: String(value) }))
    if (value === '') {
      setAnyInputIsEmpty(true)
    } else {
      setAnyInputIsEmpty(inputsValuesKeys.some((key) => {
        if (key === inputName) return false

        /** Stored value from changed input could give a false positive  */

        return safeObjectGet(
          inputsValues,
          key
        ) === ''
      }))
    }

    if (allowRepeatedValue === true) return
    const inputsRepeated: string[] = []

    inputsValuesKeys.forEach((key) => {
      const inputValueStored: string = safeObjectGet(
        inputsValues,
        key
      ).toLowerCase()
      const valueToCompare = value.toLowerCase()

      if (valueToCompare === '') return

      if (inputValueStored === valueToCompare) {
        inputsRepeated.push(key)
        inputsRepeated.push(inputName)
      }
    })
    setInputsValuesRepeated(inputsRepeated)
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
    anyInputIsEmpty,
    inputs: inputsCahangedStatus,
    inputsValues,
    inputsValuesRepeated,
    updateInputChangedState,
    updateInputValue
  }}>
    {
      children
    }
  </ModalUpdateTableContext.Provider>
}

interface ModalUpdateTableContextState {
  addInput: (inputName: string, inputValue: string) => void
  updateInputChangedState: (inputName: string, isChanged: boolean) => void
  inputs: Record<string, boolean>
  anyInputChanged: boolean
  anyInputIsEmpty: boolean
  inputsValues: Record<string, string>
  updateInputValue: (inputName: string, value: string, allowRepeatedValue: boolean | null) => void
  inputsValuesRepeated: string[]
}
