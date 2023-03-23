/* eslint-disable max-lines-per-function */
import ArrowBack, { type ArrowBackProps } from './ArrowBack'
import { Button, Form, Input } from 'd-system'
import {
  ModalUpdateTableContext,
  ModalUpdateTableContextProvider
} from 'context/ModalUpdateTableContext'
import React,
{
  type ChangeEvent,
  type FC, Fragment,
  type MouseEvent,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { type ButtonProps } from 'd-system/dist/types/components/atoms/Button'
import type FormProps from 'd-system/dist/types/components/molecules/Form/Form'
import { type InputProps } from 'd-system/dist/types/components/atoms/Input/InputProps'
import Modal from './Modal'
import { type Props as ModalProps } from 'react-modal'
import RequestResultStyles from './RequestResultStyles'
import randomId from 'utils/randomId'
import safeObjectGet from 'utils/safeObjectGet'
import styled from 'styled-components'

const ModalUpdateTable: FC<ModalUpdateTableProps> = ({
  modalProps,
  dataChanged,
  formProps,
  buttonCancellProps,
  buttonConfirmProps,
  onClikConfirmUpdate
}) => (
    <Modal {...modalProps}>
      <ModalUpdateTableContextProvider>
        {dataChanged.map((data) => <Fragment key={randomId()}>
          <Form
            {...formProps}
            formTitle={data.formTitle}
            onSubmit={(ev) => { ev.preventDefault() }}
          >
            {data.fields.map((field) => <Fragment key={field.fieldName}>
              <InputComponent
                field={field}
                inputProps={field.inputProps}
              />
            </Fragment>)
            }
          </Form>
        </Fragment>)}
        <Buttons
          modalProps={modalProps}
          onClikConfirmUpdate={onClikConfirmUpdate}
          buttonCancellProps={buttonCancellProps}
          buttonConfirmProps={buttonConfirmProps}
        />
      </ModalUpdateTableContextProvider>
    </Modal>
)

const InputComponent: FC<InputComponentProps> = ({ arrowBackProps, inputProps, field }) => {
  const ModalUpdateTableCtx = useContext(ModalUpdateTableContext)
  const InputRef = useRef<HTMLInputElement>(null)
  const getAllowRepeatedValue = (input: HTMLInputElement): boolean => {
    const attribute = input.getAttribute('data-allow-repeated-value')
    if (attribute === null || attribute === 'false') return false
    return true
  }
  const [
    disableArrowack,
    setDisabeArrowBack
  ] = useState<boolean>(true)
  const handleInputChange = (ev: ChangeEvent<HTMLInputElement>): void => {
    ModalUpdateTableCtx.updateInputValue(
      inputProps.name,
      ev.currentTarget.value,
      getAllowRepeatedValue(ev.currentTarget)
    )
    if (ev.currentTarget.defaultValue.toLowerCase() === ev.currentTarget.value.toLowerCase()) {
      setDisabeArrowBack(true)
      ModalUpdateTableCtx.updateInputChangedState(
        inputProps.name,
        false
      )
    } else if (
      ev.currentTarget.defaultValue.toLowerCase() !== ev.currentTarget.value.toLowerCase()) {
      setDisabeArrowBack(false)

      ModalUpdateTableCtx.updateInputChangedState(
        inputProps.name,
        true
      )
    }
  }
  const resetInput = (ev: MouseEvent<HTMLButtonElement>): void => {
    if (InputRef.current !== null) {
      InputRef.current.value = InputRef.current.defaultValue
    }
    setDisabeArrowBack(true)

    ModalUpdateTableCtx.updateInputChangedState(
      inputProps.name,
      false
    )
    ModalUpdateTableCtx.updateInputValue(
      inputProps.name,
      field.prevValue,

      getAllowRepeatedValue(ev
        .currentTarget.parentElement?.querySelector('input') as HTMLInputElement)
    )
  }

  useEffect(
    () => {
      if (typeof safeObjectGet(
        ModalUpdateTableCtx.inputs,
        inputProps.name
      ) === 'undefined') {
        ModalUpdateTableCtx.addInput(
          inputProps.name,
          field.prevValue
        )
      }
    },
    [
      ModalUpdateTableCtx,
      field.prevValue,
      inputProps.name
    ]
  )
  return <InputComponentStyles>
    <Input
      {...inputProps}
      data-field-name={field.fieldName}
      data-initial-value={field.prevValue}
      defaultValue={field.prevValue}
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

const Buttons: FC<ButtonsProps> = ({
  modalProps,
  onClikConfirmUpdate,
  buttonCancellProps,
  buttonConfirmProps
}) => {
  const ModalUpdateTableCtx = useContext(ModalUpdateTableContext)

  return <>
  <ValuesAreRepeated />
  <ButtonsContainer>
    <Button
      {...buttonConfirmProps}
      colorMessage="continue"
      text="Confirmar cambios"
      size="small"
      type="button"
      onClick={onClikConfirmUpdate}
      disabled={
        !ModalUpdateTableCtx.anyInputChanged ||

        /** If all inputs can repeat values the length will never change */
        ModalUpdateTableCtx.inputsValuesRepeated.length >= 1 ||
        ModalUpdateTableCtx.anyInputIsEmpty
      }
    />
    <Button
      {...buttonCancellProps}
      colorMessage="cancel"
      text="Cancelar"
      size="small"
      type="button"
      onClick={modalProps.onRequestClose}
    />
  </ButtonsContainer>
</>
}

const ValuesAreRepeated: FC = () => {
  const ModalUpdateTableCtx = useContext(ModalUpdateTableContext)
  return <InputsRepeatedContainer>
  <RequestResultStyles
      hidden={ModalUpdateTableCtx.inputsValuesRepeated.length === 0}
      isError={true}
    >
      <p style={{ color: 'black' }}
      hidden={ModalUpdateTableCtx.inputsValuesRepeated.length === 0}
      >Los siguientes valores están repetidos:</p>
      {ModalUpdateTableCtx.inputsValuesRepeated.map((inputNameAttibute) => {
        const input: HTMLInputElement = document
          .querySelector(`input[name="${inputNameAttibute}"]`) as HTMLInputElement
        const inputLabelText = input.previousSibling?.textContent
        return <Fragment key={randomId()}>
          <p style={{ textTransform: 'capitalize' }}>
            <strong style={{ color: 'black' }}>{inputLabelText}</strong> : {input.value}
          </p>
        </Fragment>
      })}
    </RequestResultStyles>
</InputsRepeatedContainer>
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

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
`

const InputsRepeatedContainer = styled.div`
  margin-bottom: 40px;
  & span {
    display: grid;
    justify-content: center;
    align-content: space-around;
    height: 100%;
    padding: 10px;
    margin: 10px;
    & > p {
      margin-bottom: 10px;
    }
  }
`

interface InputComponentProps {
  inputProps: TIputProps
  arrowBackProps?: Omit<ArrowBackProps, 'title'>
  field: Omit<ModalUpdateTableProps['dataChanged'][0]['fields'][0], 'inputProps' | 'arrowbackProps'>
}

interface ModalUpdateTableProps {
  modalProps: ModalProps
  formProps?: Omit<typeof FormProps, 'formTitle'>
  dataChanged: ModalUpdateTableDataChanged
  buttonConfirmProps?: ButtonProps
  buttonCancellProps?: ButtonProps
  onClikConfirmUpdate: (ev: MouseEvent<HTMLButtonElement>) => void
}

export type ModalUpdateTableDataChanged = Array<{
  formTitle: string

  /** Table name in database */
  dbTable: string
  tableNameToDisplay: string
  elementId: number

  /** For each field an input is displayed */
  fields: Array<{
    prevValue: string
    fieldName: string
    inputProps: TIputProps
  }>
}>

interface TIputProps extends InputProps {

  /**
   * If the value is unique in database indicates when user type a repeated value,
   *  if true this consider all inputs in modal
   */
  allowRepeatedValue: boolean
}

interface ButtonsProps extends Pick<ModalUpdateTableProps,
'onClikConfirmUpdate' | 'buttonCancellProps' | 'buttonConfirmProps' | 'modalProps'> {

}

export default ModalUpdateTable
