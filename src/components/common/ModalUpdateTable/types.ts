import { type ButtonProps } from 'd-system/dist/types/components/atoms/Button'
import type FormProps from 'd-system/dist/types/components/molecules/Form/Form'
import { type InputProps } from 'd-system/dist/types/components/atoms/Input/InputProps'
import { type Props as ModalProps } from 'react-modal'
import { type ModalUpdateTableDataChanged } from './ModalUpdateTable'
import { type MouseEvent } from 'react'

export interface TIputProps extends InputProps {
  allowRepeatedValue: boolean
}

export interface ModalUpdateTableProps {
  modalProps: ModalProps
  formProps?: Omit<typeof FormProps, 'formTitle'>
  dataChanged: ModalUpdateTableDataChanged
  buttonConfirmProps?: ButtonProps
  buttonCancellProps?: ButtonProps
  onClikConfirmUpdate: (ev: MouseEvent<HTMLButtonElement>) => void
}
