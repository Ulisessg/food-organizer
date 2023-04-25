/* eslint-disable max-lines-per-function */
import {
  FormUpdateDataContext,
  FormUpdateDataContextProvider
} from 'context/FormUpdateDataContext'
import Modal, { ModalButtons, type TButtonProps } from '../Modal'
import React, { type FC, type MouseEvent, type ReactNode, useContext } from 'react'
import { type AppDispatch } from 'redux/store'
import { type AsyncThunk } from '@reduxjs/toolkit'
import {
  type FormProps
} from 'd-system'
import { ModalContext } from 'context/ModalContext'
import { type Props as ModalProps } from 'react-modal'
import { type TUpdateThunkArgs } from 'Types'
import safeObjectGet from 'utils/safeObjectGet'
import { useDispatch } from 'react-redux'

const ModalUpdateData: FC<ModalUpdateDataProps> = (props) => <Modal {...props.modalProps}>
  <FormUpdateDataContextProvider formProps={props.formProps}>
    <Content {...props} />
  </FormUpdateDataContextProvider>

</Modal>

const Content: FC<ModalUpdateDataProps> = ({
  children,
  cancellButtonProps,
  continueButtonProps,
  thunks
}) => {
  const dispatch: AppDispatch = useDispatch()
  const { closeModal } = useContext(ModalContext)
  const { formIsValid, groupsOfInputsWithChanges } = useContext(FormUpdateDataContext)

  const updateData = async (ev: MouseEvent<HTMLButtonElement>): Promise<void> => {
    const form = ev.currentTarget.form as HTMLFormElement
    const inputsContainersWithChanges = [
      ...form
        .querySelectorAll('div[data-any-input-change="true"]')
    ]

    await Promise.all(inputsContainersWithChanges.map(async (element) => {
      const dbTable: string = element.getAttribute('data-db-table') as string
      const elementId: string = element.getAttribute('data-element-id') as string
      const elementIndex: string = element.getAttribute('data-element-index') as string
      const groupingElementIndex = element.getAttribute('data-grouping-element-index')
      const inputs = element.querySelectorAll('input')
      const thunk = safeObjectGet(
        thunks,
        dbTable
      )

      await dispatch(thunk({
        data: [...inputs],
        elementId,
        elementIndex,
        groupingElementIndex
      }))
    }))

    closeModal()
  }

  return <>
    {/* Inputs */}
    {children}

    <ModalButtons
      cancellButtonProps={{
        ...cancellButtonProps,
        onClick: (ev) => {
          cancellButtonProps.onClick?.(ev)
          closeModal()
        }
      }}
      continueButtonProps={{
        ...continueButtonProps,
        disabled: !formIsValid || groupsOfInputsWithChanges.size === 0,
        onClick: updateData
      }}
    />
  </>
}

export default ModalUpdateData

interface ModalUpdateDataProps {
  modalProps: ModalProps
  cancellButtonProps: TButtonProps
  continueButtonProps: TButtonProps
  formProps: FormProps
  children: ReactNode
  thunks: Record<
  // Db table
  string,
  AsyncThunk<any, TUpdateThunkArgs, any>>
}
