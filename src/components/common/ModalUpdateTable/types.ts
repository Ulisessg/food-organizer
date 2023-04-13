import { type ButtonProps } from 'd-system/dist/types/components/atoms/Button'
import { type InputProps } from 'd-system/dist/types/components/atoms/Input/InputProps'
import { type Props as ModalProps } from 'react-modal'
import { type ReactNode } from 'react'
import { type TModalUpdateTableThunks } from 'context/ModalUpdateTableContext'

export interface TIputProps extends InputProps {
  allowRepeatedValue: boolean
}

export interface ModalUpdateTableProps {
  modalProps: ModalProps
  children: ReactNode
  buttonConfirmProps?: TButtonProps
  buttonCancellProps?: TButtonProps
  thunks: TModalUpdateTableThunks
}

interface TButtonProps extends Omit<ButtonProps, 'text' | 'size' | 'colorMessage'> {

}
