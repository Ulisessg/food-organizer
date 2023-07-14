import React, { type FC, type ReactNode, useContext } from 'react'
import Modal from '../Modal'
import { type Props as ModalProps } from 'react-modal'
import { ModalUpdateDataContext } from 'context/ModalUpdateDataContext'

const ModalUpdateData: FC<ModalUpdateDataProps> = (props) => {
  const modalContext = useContext(ModalUpdateDataContext)

  return <Modal
  {...props.modalProps}
  isOpen={modalContext.modalIsOpen}
  onRequestClose={modalContext.closeModal}>
    {props.children}
</Modal>
}

export default ModalUpdateData

interface ModalUpdateDataProps {
  modalProps?: Omit<ModalProps, 'isOpen' | 'onRequestClose'>
  children: ReactNode
}
