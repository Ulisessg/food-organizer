import { Button, type ButtonProps } from 'd-system'
import React, { type FC, type MouseEvent, useContext } from 'react'
import { ModalContext } from 'context/ModalContext'

const ButtonOpenModal: FC<ButtonOpenModalProps> = (props) => {
  const modalContext = useContext(ModalContext)
  const onClick = (ev: MouseEvent<HTMLButtonElement>): void => {
    props.onClick?.(ev)
    modalContext.openModal()
  }
  return <Button
    {...props}
    onClick={onClick}
    colorMessage="info"
    data-element-index={props.elementIndex}
    data-grouping-element-index={props.groupingElementIndex}
    type="button"
  />
}

export default ButtonOpenModal

interface ButtonOpenModalProps extends Omit<ButtonProps, 'colorMessage' | 'type'> {
  elementIndex: number
  groupingElementIndex?: number
}
