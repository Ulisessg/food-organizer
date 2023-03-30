/* eslint-disable max-lines-per-function */
import ArrowBack, { type ArrowBackProps } from '../ArrowBack'
import { type ModalUpdateTableProps, type TIputProps } from './types'
import React, {
  type ChangeEvent,
  type FC, type MouseEvent,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { Input } from 'd-system'
import { ModalUpdateTableContext } from 'context/ModalUpdateTableContext'
import safeObjectGet from 'utils/safeObjectGet'
import styled from 'styled-components'

const InputComponent: FC<InputComponentProps> = ({ arrowBackProps, inputProps, field }) => {
  const ModalUpdateTableCtx = useContext(ModalUpdateTableContext)
  const InputRef = useRef<HTMLInputElement>(null)
  const [
    disableArrowack,
    setDisabeArrowBack
  ] = useState<boolean>(true)
  const handleInputChange = (ev: ChangeEvent<HTMLInputElement>): void => {
    ModalUpdateTableCtx.updateInputValue(
      inputProps.name,
      ev.currentTarget.value
    )
    if (ev.currentTarget.defaultValue.toLowerCase() === ev.currentTarget.value.toLowerCase()) {
      setDisabeArrowBack(true)

      /*
       * ModalUpdateTableCtx.updateInputChangedState(
       *   inputProps.name,
       *   false
       * )
       */
    } else if (
      ev.currentTarget.defaultValue.toLowerCase() !== ev.currentTarget.value.toLowerCase()) {
      setDisabeArrowBack(false)

      /*
       * ModalUpdateTableCtx.updateInputChangedState(
       *   inputProps.name,
       *   true
       * )
       */
    }
  }
  const resetInput = (ev: MouseEvent<HTMLButtonElement>): void => {
    setDisabeArrowBack(true)

    /*
     * ModalUpdateTableCtx.updateInputChangedState(
     *   inputProps.name,
     *   false
     * )
     */
    ModalUpdateTableCtx.updateInputValue(
      inputProps.name,
      field.prevValue
    )
  }

  useEffect(
    () => {
      if (typeof safeObjectGet(
        ModalUpdateTableCtx.inputsValues,
        inputProps.name
      ) === 'undefined') {
        ModalUpdateTableCtx.addInput(
          inputProps.name,
          inputProps.allowRepeatedValue,
          field.prevValue
        )
      }
    },
    [
      ModalUpdateTableCtx,
      field.dbTable,
      field.fieldName,
      field.prevValue,
      inputProps.allowRepeatedValue,
      inputProps.label,
      inputProps.name
    ]
  )

  const inputValue: string = (() => {
    if (
      typeof ModalUpdateTableCtx.inputsValues[inputProps.name] === 'undefined'
    ) return field.prevValue
    return ModalUpdateTableCtx.inputsValues[inputProps.name].value
  })()
  return <InputComponentStyles>
    <Input
      {...inputProps}
      data-field-name={field.fieldName}
      data-initial-value={field.prevValue}
      value={inputValue}
      ref={InputRef}
      onChange={handleInputChange}
      style={{ ...inputProps.style, textTransform: 'capitalize' }}
    />
      <ArrowBack
        {...arrowBackProps}
        title="Deshacer cambios"
        onClick={resetInput}
        data-input-id={inputProps.id}
        type="button"
        disabled={disableArrowack}
        elementReturnFocusId={inputProps.id}
      />
  </InputComponentStyles>
}

const InputComponentStyles = styled.div`
  display: flex;
  & button {
    align-self: center;
    /** Margin to center it, same as label and input */
    margin-top: 20px;
    margin-left: 20px;
  }
`

interface InputComponentProps {
  inputProps: TIputProps
  arrowBackProps?: Omit<ArrowBackProps, 'title'>
  allowRepeatedValues: boolean
  field:
  Omit<ModalUpdateTableProps['dataChanged'][0]['fields'][0], 'inputProps' | 'arrowbackProps'>
}

export default InputComponent
