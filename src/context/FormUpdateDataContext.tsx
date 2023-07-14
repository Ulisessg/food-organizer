import React, { type FC, type ReactNode, createContext, useState } from 'react'

const initialState: FormUpdateDataContextState = {
  formIsValid: false,
  groupsOfInputsWithChanges: new Map(),
  updateFormIsValid: () => {
    //
  },
  updateGroupsOfInputsWithChanges: () => {
    //
  }
}

export const FormUpdateDataContext = createContext(initialState)

export const FormUpdateDataContextProvider: FC<{ children: ReactNode }> = ({
  children
}) => {
  const [
    formIsValid,
    setFormIsValid
  ] = useState<boolean>(false)
  const [
    groupsOfInputsWithChanges,
    setGroupsOfInputsWithChanges
  ] = useState(new Map<string, boolean>())

  const updateFormIsValid: FormUpdateDataContextState['updateFormIsValid'] = (isValid) => {
    setFormIsValid(isValid)
  }

  const updateGroupsOfInputsWithChanges:
  FormUpdateDataContextState['updateGroupsOfInputsWithChanges'] = (newData) => {
    setGroupsOfInputsWithChanges(newData)
  }

  return <FormUpdateDataContext.Provider
    value={{
      formIsValid,
      groupsOfInputsWithChanges,
      updateFormIsValid,
      updateGroupsOfInputsWithChanges
    }}
  >
    {children}
  </FormUpdateDataContext.Provider>
}

interface FormUpdateDataContextState {
  formIsValid: boolean
  updateFormIsValid: (isValid: boolean) => void
  groupsOfInputsWithChanges: Map<string, boolean>

  /**
   * Inputs have an initial value who could be correct with Input patter,
   * so it's required to verify also if group of inputs has changed
   */
  updateGroupsOfInputsWithChanges: (newData: Map<string, boolean>) => void
}
