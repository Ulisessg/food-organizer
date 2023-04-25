/* eslint-disable max-lines-per-function */
import { Input, type InputProps, Select, type SelectProps, UseInputsContext } from 'd-system'
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
      if (typeof UseInputsCtx
        .inputsData[props.inputProps?.name ?? props.selectProps?.name as any] === 'undefined') {
        UseInputsCtx.addInput(
          props.inputProps?.name ?? props.selectProps?.name as any,
          props.initialValue
        )
      }
    },
    [
      UseInputsCtx,
      props.initialValue,
      props.inputProps,
      props.selectProps
    ]
  )

  return <InputContainer>
    {props.type === 'input' && <Input
      {...props.inputProps as any}
      onChange={onChange}
      onBlur={UseInputsCtx.onBlur}
      inputInvalid={UseInputsCtx.inputsErrors[props.inputProps?.name as any]}
      value={UseInputsCtx.inputsData[props.inputProps?.name as any] ?? ''}
      style={{ textTransform: 'capitalize' }}
      data-db-field={props.field}
    />}
    {props.type === 'select' && <Select
      {...props.selectProps as any}
      onChange={onChange}
      onBlur={UseInputsCtx.onBlur}
      inputInvalid={UseInputsCtx.inputsErrors[props.selectProps?.name as any]}
      value={UseInputsCtx.inputsData[props.selectProps?.name as any] ?? ''}
      data-db-field={props.field}
    />}
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

interface InputModalUpdateTableProps {
  initialValue: string
  field: string
  inputProps?: InputProps
  selectProps?: SelectProps
  type: 'select' | 'input'
}
