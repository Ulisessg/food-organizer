import React, { type FC, type ReactNode, createContext, useState } from 'react'
import { Form } from 'd-system'
import type FormProps from 'd-system/dist/types/components/molecules/Form/Form'
import styled from 'styled-components'

const initialState: UpdateTableInputsContextState = {
  updateAnyInputChange: () => {
    //
  }
}

export const UpdateTableInputsContext = createContext(initialState)

/**
 * Group all inputs rendered per element
 * and allows to know which element has changed and not only individual inputs
 */
export const UpdateTableInputsContextProvider: FC<UpdateTableInputsContextProps> = ({
  children,
  dbTable,
  formTitle,
  formProps,
  elementId,
  elementIndex,
  groupingElementIndex
}) => {
  const [
    anyInputChange,
    setAnyInputChange
  ] = useState<boolean>(false)
  const updateAnyInputChange:
  UpdateTableInputsContextState['updateAnyInputChange'] = (someInputChange) => {
    setAnyInputChange(someInputChange)
  }

  return <UpdateTableInputsContext.Provider value={{
    updateAnyInputChange
  }}>
    <FormStyles
      {...formProps}
      formTitle={formTitle}
      data-db-table={dbTable}
      data-any-input-change={anyInputChange}
      data-element-id={elementId}
      data-element-index={elementIndex}
      data-grouping-element-index={groupingElementIndex}
    >
      {children}
    </FormStyles>
  </UpdateTableInputsContext.Provider>
}

const FormStyles = styled(Form)`
box-shadow: 0px 1px 8px 0px #a7a3a3;
@media screen and (max-width: 800px) {
  width: 70%;
}
`

interface UpdateTableInputsContextProps {
  formTitle: string
  formProps?: Omit<typeof FormProps, 'formTitle'>

  /** Inputs */
  children: ReactNode

  dbTable: string
  elementId: string | number
  elementIndex: string | number
  groupingElementIndex: number | null
}

interface UpdateTableInputsContextState {
  updateAnyInputChange: (someInputChange: boolean) => void
}
