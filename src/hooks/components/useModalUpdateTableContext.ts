/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import { type MouseEvent, useContext, useState } from 'react'
import { type AppDispatch } from 'redux/store'
import { type ButtonProps } from 'd-system/dist/types/components/atoms/Button'
import { ModalContext } from '../../context/ModalContext'
import { type TModalUpdateTableThunks } from 'context/ModalUpdateTableContext'
import safeObjectGet from 'utils/safeObjectGet'
import { useDispatch } from 'react-redux'

const useModalUpdateTableContext = (
  thunks: TModalUpdateTableThunks,
  buttonConfirmProps?: ButtonProps
): UseModalUpdateTableContextReturn => {
  const modalCtx = useContext(ModalContext)
  const dispatch: AppDispatch = useDispatch()

  /** States */

  const [
    anyInputChange,
    setAnyInputChange
  ] = useState<boolean>(false)
  const [
    anyInputIsEmpty,
    setAnyInputIsEmpty
  ] = useState<boolean>(false)
  const [
    inputsRepeated,
    setInputsRepeated
  ] = useState<ModalUpdateTableContextState['inputsRepeated']>(new Map())

  /** Methods */

  const updateAnyInputChange: ModalUpdateTableContextState['updateAnyInputChange'] =
   (anyChange) => {
     setAnyInputChange(anyChange)
   }

  const updateAnyInputIsEmpty: ModalUpdateTableContextState['updateAnyInputIsEmpty'] =
   (anyIsEmpty) => {
     setAnyInputIsEmpty(anyIsEmpty)
   }

  const removeInputsRepeated: ModalUpdateTableContextState['removeInputsRepeated'] =
  (value, inputNoLongerRepeated) => {
    setInputsRepeated((prev) => {
      const newInputsRepeatedData = new Map(prev)
      const currentListOfInputsrepeated = newInputsRepeatedData.get(value)

      if (typeof currentListOfInputsrepeated === 'undefined') return prev
      // Last input repeated
      if (currentListOfInputsrepeated.length === 2) {
        newInputsRepeatedData.delete(value)
      } else {
        newInputsRepeatedData.set(
          value,
          currentListOfInputsrepeated
            .filter((input) => input !== inputNoLongerRepeated)
        )
      }
      return newInputsRepeatedData
    })
  }
  const addInputsRepeated: ModalUpdateTableContextState['addInputsRepeated'] =
   (value, listOfInputsRepeated) => {
     setInputsRepeated((prev) => {
       const newInputsRepeatedData = new Map(prev)
       newInputsRepeatedData.set(
         value,
         listOfInputsRepeated
       )
       return newInputsRepeatedData
     })
   }

  const updateData: UseModalUpdateTableContextReturn['updateData'] = async (ev) => {
    buttonConfirmProps?.onClick?.(ev)
    const modal = ev.currentTarget.parentElement?.parentElement as HTMLDivElement

    const changedForms = [...modal.querySelectorAll('form[data-any-input-change="true"]')]
    await Promise.all(changedForms.map(async (form) => {
      const dbTable = form.getAttribute('data-db-table') as string
      const elementId = form.getAttribute('data-element-id') as string
      const elementIndex = form.getAttribute('data-element-index') as string
      const groupingElementIndex = form.getAttribute('data-grouping-element-index')

      const thunkTodispatch = safeObjectGet(
        thunks,
        dbTable
      )
      const inputs = form.querySelectorAll('input')
      await dispatch(thunkTodispatch({
        data: [...inputs],
        elementId,
        elementIndex,
        groupingElementIndex
      }))
    }))
    modalCtx.closeModal()
  }

  return {
    addInputsRepeated,
    anyInputChange,
    anyInputIsEmpty,
    inputsRepeated,
    removeInputsRepeated,
    updateAnyInputChange,
    updateAnyInputIsEmpty,
    updateData

  }
}

export default useModalUpdateTableContext

interface UseModalUpdateTableContextReturn extends ModalUpdateTableContextState {
  updateData: (ev: MouseEvent<HTMLButtonElement>) => Promise<void>

}

export interface ModalUpdateTableContextState {
  anyInputChange: boolean
  anyInputIsEmpty: boolean
  updateAnyInputChange: (anyChange: boolean) => void
  updateAnyInputIsEmpty: (anyIsEmpty: boolean) => void
  inputsRepeated: Map<

  /** Value repeated */
  string,
  HTMLInputElement[]
  >
  addInputsRepeated:
  (value: string, inputsRepeated: HTMLInputElement[]) => void
  removeInputsRepeated: (value: string, inputNoLognerRepeated: HTMLInputElement) => void
}
