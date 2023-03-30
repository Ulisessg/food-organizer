/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { type ModalUpdateTableProps, type TIputProps } from './types'
import React,
{
  type FC,
  Fragment
} from 'react'
import { Form } from 'd-system'
import InputComponent from './InputComponent'
import Modal from '../Modal'
import {
  ModalUpdateTableContextProvider
} from 'context/ModalUpdateTableContext'
import randomId from 'utils/randomId'

const ModalUpdateTable: FC<ModalUpdateTableProps> = ({
  modalProps,
  dataChanged,
  formProps,
  buttonCancellProps,
  buttonConfirmProps,
  onClikConfirmUpdate
}) => (
    <Modal {...modalProps}>
      <ModalUpdateTableContextProvider
        buttonCancellProps={buttonCancellProps}
        buttonConfirmProps={buttonConfirmProps}
        modalProps={modalProps}
        onClikConfirmUpdate={onClikConfirmUpdate}
      >
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
                allowRepeatedValues={field.inputProps.allowRepeatedValue}
              />
            </Fragment>)
            }
          </Form>
        </Fragment>)}

      </ModalUpdateTableContextProvider>
    </Modal>
)

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
    dbTable: string
  }>
}>

export default ModalUpdateTable
