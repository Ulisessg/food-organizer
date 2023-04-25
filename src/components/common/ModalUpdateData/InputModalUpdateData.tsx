/* eslint-disable max-lines-per-function */
import { Input, type InputProps, UseInputsContext } from 'd-system'
import React, { type FC, useContext, useEffect } from 'react'
import { FormUpdateDataContext } from 'context/FormUpdateDataContext'
import styled from 'styled-components'

const InputModalUpdateTable: FC<InputModalUpdateTableProps> = (props) => {
  const UseInputsCtx = useContext(UseInputsContext)
  const formContext = useContext(FormUpdateDataContext)
  const onChange: typeof UseInputsCtx['onChange'] = (ev) => {
    UseInputsCtx.onChange(ev)
    formContext.updateFormIsValid(ev.currentTarget.form?.checkValidity() as boolean)
  }
  useEffect(
    () => {
      if (typeof UseInputsCtx.inputsData[props.name] === 'undefined') {
        UseInputsCtx.addInput(
          props.name,
          props.initialValue
        )
      }
    },
    [
      UseInputsCtx,
      props.initialValue,
      props.name
    ]
  )

  return <InputContainer>
    <Input
      {...props}
      onChange={onChange}
      onBlur={UseInputsCtx.onBlur}
      inputInvalid={UseInputsCtx.inputsErrors[props.name]}
      value={UseInputsCtx.inputsData[props.name] ?? ''}
      style={{ textTransform: 'capitalize' }}
      data-db-field={props.field}
    />
  </InputContainer>
}

const InputContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 20px;
  align-items: center;
`

export const InputsSectionTitle = styled.p`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 10px;
`

export default InputModalUpdateTable

interface InputModalUpdateTableProps extends InputProps {
  initialValue: string
  field: string
}
