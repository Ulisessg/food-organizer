/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import React,
{
  type FC
} from 'react'
import Modal from '../Modal'
import {
  ModalUpdateTableContextProvider
} from 'context/ModalUpdateTableContext'
import { type ModalUpdateTableProps } from './types'

const ModalUpdateTable: FC<ModalUpdateTableProps> = ({
  modalProps,
  buttonCancellProps,
  buttonConfirmProps,
  children,
  thunks
}) => (
    <Modal {...modalProps}>
      <ModalUpdateTableContextProvider
        buttonCancellProps={buttonCancellProps as any}
        buttonConfirmProps={buttonConfirmProps as any}
        thunks={thunks}
      >
        {children}
      </ModalUpdateTableContextProvider>
    </Modal>
)

export default ModalUpdateTable
