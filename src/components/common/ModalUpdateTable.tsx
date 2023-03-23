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

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;

`

const InputComponent: FC<InputComponentProps> = ({ arrowBackProps, inputProps, field }) => {
  const ModalUpdateTableCtx = useContext(ModalUpdateTableContext)
  const InputRef = useRef<HTMLInputElement>(null)
  const [
    disableArrowack,
    setDisabeArrowBack
  ] = useState<boolean>(true)
  const handleInputChange = (ev: ChangeEvent<HTMLInputElement>): void => {
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
  const resetInput = (_ev: MouseEvent<HTMLButtonElement>): void => {
    if (InputRef.current !== null) {
      InputRef.current.value = InputRef.current.defaultValue
    }
    setDisabeArrowBack(true)

    ModalUpdateTableCtx.updateInputChangedState(
      inputProps.name,
      false
    )
  }

  useEffect(
    () => {
      if (typeof safeObjectGet(
        ModalUpdateTableCtx.inputs,
        inputProps.name
      ) === 'undefined') {
        ModalUpdateTableCtx.addInput(inputProps.name)
      }
    },
    [
      ModalUpdateTableCtx,
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

  return <ButtonsContainer>
  <Button
    {...buttonConfirmProps}
    colorMessage="continue"
    text="Confirmar cambios"
    size="small"
    type="button"
    onClick={onClikConfirmUpdate}
    disabled={!ModalUpdateTableCtx.anyInputChanged}
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
  inputProps: InputProps
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
    inputProps: InputProps
  }>
}>
interface ButtonsProps extends Pick<ModalUpdateTableProps,
'onClikConfirmUpdate' | 'buttonCancellProps' | 'buttonConfirmProps' | 'modalProps'> {

}

export default ModalUpdateTable
