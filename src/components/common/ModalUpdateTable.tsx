/* eslint-disable max-lines-per-function */
import ArrowBack, { type ArrowBackProps } from './ArrowBack'
import { Button, Form, Input } from 'd-system'
import React,
{ type ChangeEvent, type FC, Fragment, type MouseEvent, useRef, useState } from 'react'
import { type ButtonProps } from 'd-system/dist/types/components/atoms/Button'
import type FormProps from 'd-system/dist/types/components/molecules/Form/Form'
import { type InputProps } from 'd-system/dist/types/components/atoms/Input/InputProps'
import Modal from './Modal'
import { type Props as ModalProps } from 'react-modal'
import styled from 'styled-components'

const ModalUpdateTable: FC<ModalUpdateTableProps> = ({
  modalProps,
  dataChanged,
  formTitle,
  formProps,
  buttonCancellProps,
  buttonConfirmProps,
  onClikConfirmUpdate
}) => (
    <Modal {...modalProps}>
      <Form {...formProps} formTitle={formTitle} onSubmit={(ev) => { ev.preventDefault() }}>
        {dataChanged.map((data) => <Fragment key={data.elementId}>
          {data.fields.map((field) => <Fragment key={field.fieldName}>
            <InputComponent
              field={field}
              inputProps={field.inputProps}
            />
          </Fragment>)}
        </Fragment>)}
      </Form>
      <ButtonsContainer>
        <Button
          {...buttonConfirmProps}
          colorMessage="continue"
          text="Confirmar"
          size="small"
          type="button"
          onClick={onClikConfirmUpdate}
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
    </Modal>
)

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;

`

const InputComponent: FC<InputComponentProps> = ({ arrowBackProps, inputProps, field }) => {
  const InputRef = useRef<HTMLInputElement>(null)
  const [
    disableArrowack,
    setDisabeArrowBack
  ] = useState<boolean>(true)
  const handleInputChange = (ev: ChangeEvent<HTMLInputElement>): void => {
    if (ev.currentTarget.defaultValue === ev.currentTarget.value) {
      setDisabeArrowBack(true)
    } else if (ev.currentTarget.defaultValue !== ev.currentTarget.value) {
      setDisabeArrowBack(false)
    }
  }
  const resetInput = (_ev: MouseEvent<HTMLButtonElement>): void => {
    if (InputRef.current !== null) {
      InputRef.current.value = InputRef.current.defaultValue
    }
    setDisabeArrowBack(true)
  }
  return <>
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
  </>
}

interface InputComponentProps {
  inputProps: InputProps
  arrowBackProps?: Omit<ArrowBackProps, 'title'>
  field: Omit<ModalUpdateTableProps['dataChanged'][0]['fields'][0], 'inputProps' | 'arrowbackProps'>
}

interface ModalUpdateTableProps {
  modalProps: ModalProps
  formTitle: string
  formProps?: Omit<typeof FormProps, 'formTitle'>
  dataChanged: Array<{

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
  buttonConfirmProps?: ButtonProps
  buttonCancellProps?: ButtonProps
  onClikConfirmUpdate: (ev: MouseEvent<HTMLButtonElement>) => void
}

export default ModalUpdateTable
