/* eslint-disable max-lines-per-function */
import {
  Button,
  UseInputsContext,
  type UseInputsContextProps,
  UseInputsContextProvider
} from 'd-system'
import React, { type FC, type ReactNode, useContext, useEffect, useRef, useState } from 'react'
import { FormUpdateDataContext } from 'context/FormUpdateDataContext'
import randomId from 'utils/randomId'
import safeObjectGet from 'utils/safeObjectGet'
import styled from 'styled-components'

const InputsContainer: FC<InputsContainerProps> = ({
  children,
  dbTable,
  elementIndex,
  groupingElementIndex,
  inputsNames,
  elementId
}) => {
  const containerNameRef = useRef<string>(randomId())
  const [
    anyInputChange,
    setAnyInputChange
  ] = useState<boolean>(false)

  const inputsContext = useContext(UseInputsContext)
  const formContext = useContext(FormUpdateDataContext)

  const restartInputs = (): void => {
    inputsContext.restartInputs('all')
    const gruopsNewData = new Map(formContext.groupsOfInputsWithChanges)
    gruopsNewData.delete(containerNameRef.current)
    formContext.updateGroupsOfInputsWithChanges(gruopsNewData)
  }

  useEffect(
    () => {
      const newData = new Map(formContext.groupsOfInputsWithChanges)
      if (anyInputChange) {
        newData.set(
          containerNameRef.current,
          true
        )
        formContext.updateGroupsOfInputsWithChanges(newData)
      } else {
        newData.delete(containerNameRef.current)
        formContext.updateGroupsOfInputsWithChanges(newData)
      }
    },
    [anyInputChange]
  )
  useEffect(
    () => {
      const anyInputChangeResult: boolean = inputsNames.some((inputName) => {
        const initialValue =
        (inputsContext.inputsInitialValues.get(inputName) as string).toLowerCase()
        const currentValue = safeObjectGet(
          inputsContext.inputsData ?? {},
          inputName
        )?.toLowerCase()
        if (typeof initialValue === 'undefined' || typeof currentValue === 'undefined') return false

        if (initialValue !== currentValue) {
          return true
        }
        return false
      })
      setAnyInputChange(anyInputChangeResult)
    },
    [
      inputsContext.inputsData,
      inputsNames,
      inputsContext.inputsInitialValues
    ]
  )

  return <InputsContainerStyles
  data-any-input-change={anyInputChange}
  data-db-table={dbTable}
  data-element-index={elementIndex}
  data-grouping-element-index={groupingElementIndex}
  data-element-id={elementId}
  >

    {children}
    <ButtonUndoChangesStyle
      colorMessage="info"
      size="small"
      text="Deshacer cambios"
      type="button"
      onClick={restartInputs}
      disabled={!anyInputChange}
    />
</InputsContainerStyles>
}

const ContentWrapper: FC<ContentWrapperProps> = (props) => <UseInputsContextProvider
  {...props}
>
  <InputsContainer {...props.inputsContainerProps}>
    {props.children}
  </InputsContainer>
</UseInputsContextProvider>

const ButtonUndoChangesStyle = styled(Button)`
  margin-bottom: 8px;
  justify-self: right;
`

export const InputsContainerStyles = styled.div`
  margin-top: 50px;
  display: grid;
  grid-gap: 15px;
`

export default ContentWrapper

interface InputsContainerProps {
  children?: ReactNode
  dbTable: string
  elementIndex: number
  groupingElementIndex?: number
  inputsNames: string[]
  elementId: number
}

interface ContentWrapperProps extends UseInputsContextProps {
  inputsContainerProps: InputsContainerProps
}
