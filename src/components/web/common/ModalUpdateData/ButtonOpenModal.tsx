import { Button, type ButtonProps } from 'd-system'
import React, { type FC, type MouseEvent, useContext } from 'react'
import { ModalUpdateDataContext } from 'context/ModalUpdateDataContext'

const ButtonOpenModal: FC<ButtonOpenModalProps> = (props) => {
  const modalContext = useContext(ModalUpdateDataContext)
  const onClick = (ev: MouseEvent<HTMLButtonElement>): void => {
    props.onClick?.(ev)
    modalContext.openModal(
      props.elementIndex,
      props.groupingElementIndex
    )
  }
  return <Button
    {...props}
    onClick={onClick}
    colorMessage="info"
    type="button"
  />
}

export default ButtonOpenModal

interface ButtonOpenModalProps extends Omit<ButtonProps, 'colorMessage' | 'type'> {
  elementIndex: number
  groupingElementIndex: number | null
}
