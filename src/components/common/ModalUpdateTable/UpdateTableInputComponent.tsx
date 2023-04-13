/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import ArrowBack, { type ArrowBackProps } from '../ArrowBack'
import React, {
  type FC
} from 'react'
import { Input } from 'd-system'
import { type TIputProps } from './types'
import styled from 'styled-components'
import useUpdateTableInputComponent from 'hooks/components/useUpdateTableInputComponent'

/** Allows to update an element field */
const UpdateTableInputComponent: FC<UpdateTableInputComponentProps> = ({
  arrowBackProps,
  inputProps,
  initialValue,
  modal,
  field
}) => {
  const {
    handleInputOnChange,
    inputsData,
    resetInput,
    initialValueRef
  } = useUpdateTableInputComponent(
    initialValue,
    modal,
    inputProps
  )
  return <UpdateTableInputComponentStyles>
    <Input
      {...inputProps}
      onChange={handleInputOnChange}
      style={{ ...inputProps.style, textTransform: 'capitalize' }}
      value={inputsData[inputProps.name]}
      data-input-change={inputsData[inputProps.name] !== initialValueRef.current}
      data-allow-empty-value={inputProps.allowRepeatedValue}
      data-allow-repeated-values={inputProps.allowRepeatedValue}
      data-db-field={field}
    />
    <ArrowBack
      {...arrowBackProps}
      title="Deshacer cambios"
      onClick={resetInput}
      data-input-id={inputProps.id}
      type="button"
      disabled={inputsData[inputProps.name] === initialValueRef.current}
      elementReturnFocusId={inputProps.id}
    />
  </UpdateTableInputComponentStyles>
}

const UpdateTableInputComponentStyles = styled.div`
  display: flex;
  & button {
    align-self: center;
    /** Margin to center it, same as label and input */
    margin-top: 20px;
    margin-left: 20px;
  }
`

interface UpdateTableInputComponentProps {
  inputProps: TIputProps
  arrowBackProps?: Omit<ArrowBackProps, 'title'>
  initialValue: string
  modal: HTMLDivElement
  field: string
}

export default UpdateTableInputComponent
