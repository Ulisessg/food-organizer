/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
import { type MouseEvent, type RefObject, useContext, useRef } from 'react'
import {
  type InputProps
} from 'd-system/dist/types/components/atoms/Input/InputProps'
import { ModalUpdateTableContext } from 'context/ModalUpdateTableContext'
import { UpdateTableInputsContext } from 'context/UpdateTableInputsContext'
import { useInputs } from 'd-system'

const useUpdateTableInputComponent = (
  initialValue: string,
  modal: HTMLDivElement,
  inputProps: InputProps
): UseUpdateTableInputComponentRetrun => {
  const inputsContext = useContext(UpdateTableInputsContext)
  const inputValueRepeated = useRef<string>()

  const initialValueRef = useRef<string>(initialValue.toLowerCase())
  const ModalUpdateTableCtx = useContext(ModalUpdateTableContext)
  const { inputsData, onChange, restartInputs } = useInputs(
    {
      [inputProps.name]: initialValueRef.current
    },
    false
  )

  const udpateContextData = (resetInput: boolean, input: HTMLInputElement): void => {
    const currentInput = input
    let currentInputValue: string = currentInput.value.toLowerCase()

    if (resetInput) {
      currentInputValue = initialValueRef.current
    }

    const currentInputIsEmpty: boolean = currentInputValue === ''

    const currentInputAllowRepeatedValues = currentInput
      .getAttribute('data-allow-repeated-values') as TBooleanString
    const currentInputAllowEmpty = currentInput
      .getAttribute('data-allow-empty-value') as TBooleanString

    const currentInputChange: boolean = (() => {
      if (resetInput) return false

      return currentInputValue !== initialValueRef.current
    })()

    if (currentInputAllowEmpty === 'false' && currentInputIsEmpty) {
      ModalUpdateTableCtx.updateAnyInputIsEmpty(true)
    } else {
      const inputsEmpty: NodeListOf<HTMLInputElement> = modal
        .querySelectorAll(`input[value=""]:not([name="${currentInput.name}"])`)
      ModalUpdateTableCtx.updateAnyInputIsEmpty(inputsEmpty.length >= 1)
    }

    if (currentInputChange) {
      ModalUpdateTableCtx.updateAnyInputChange(true)
      inputsContext.updateAnyInputChange(true)
    } else {
      const inputsQuery = `input[data-input-change="true"]:not([name="${input.name}"])`

      const inputsForm = (currentInput.parentElement
        ?.parentElement?.parentElement?.parentElement as HTMLFormElement)

      const inputsChangedInWholeModal = modal
        .querySelectorAll(inputsQuery)

      const inputsChangedInForm =
        inputsForm.querySelectorAll(inputsQuery)

      inputsContext.updateAnyInputChange(inputsChangedInForm.length >= 1)
      ModalUpdateTableCtx.updateAnyInputChange(inputsChangedInWholeModal.length >= 1)
    }

    if (currentInputAllowRepeatedValues === 'false') {
      const inputsWithValueRepeated: NodeListOf<HTMLInputElement> = modal
        .querySelectorAll(`input[value="${currentInputValue}" i]:not([value=""])`)

      if (inputsWithValueRepeated.length >= 1) {
        inputValueRepeated.current = currentInputValue
        ModalUpdateTableCtx.addInputsRepeated(
          currentInputValue,
          [
            ...inputsWithValueRepeated,
            currentInput
          ]
        )
      } else {
        ModalUpdateTableCtx.removeInputsRepeated(
          inputValueRepeated.current as string,
          currentInput
        )
      }
    }
  }

  const handleInputOnChange: UseUpdateTableInputComponentRetrun['handleInputOnChange'] = (ev) => {
    udpateContextData(
      false,
      ev.currentTarget as HTMLInputElement
    )
    onChange(ev)
  }

  const resetInput: UseUpdateTableInputComponentRetrun['resetInput'] = (ev) => {
    const input: HTMLInputElement = ev
      .currentTarget.previousSibling?.firstChild?.nextSibling as HTMLInputElement
    udpateContextData(
      true,
      input
    )
    restartInputs('all')
  }
  return {
    handleInputOnChange,
    initialValueRef,
    inputsData,
    resetInput
  }
}

export default useUpdateTableInputComponent

interface UseUpdateTableInputComponentRetrun {
  resetInput: (ev: MouseEvent<HTMLButtonElement>) => void
  handleInputOnChange: ReturnType<typeof useInputs>['onChange']
  inputsData: Record<string, string>
  initialValueRef: RefObject<string>
}

type TBooleanString = 'true' | 'false'
