import { ModalContext, type ModalContextState } from 'context/ModalContext'
import { type MouseEvent, useContext } from 'react'
import { useInputs } from 'd-system'

const useDisplayUOMRows = (
  uomAbbreviation: string,
  uomName: string,
  uomtName: string
): UseDisplayUOMRows => {
  const modalContext = useContext(ModalContext)

  /** Block update button if no changes */

  const {
    inputsData,
    onChange: UseInputsOnChange,
    inputsErrors,
    onBlur,
    restartInputs
  } = useInputs(
    {
      [uomAbbreviation]: uomAbbreviation,
      [uomName]: uomName,
      [uomtName]: uomtName
    },
    true
  )

  const onClickUpdate: UseDisplayUOMRows['onClickUpdate'] = (ev) => {
    modalContext.openModal()
  }
  return {
    disableUpdateButton: true,
    inputsData,
    inputsErrors,
    onClickUpdate,
    ...modalContext,
    onBlurInputs: onBlur,
    onChangeInputs: UseInputsOnChange,
    restartInputs
  }
}

interface UseDisplayUOMRows extends ModalContextState {
  onClickUpdate: (ev: MouseEvent<HTMLButtonElement>) => void
  disableUpdateButton: boolean
  inputsData: Record<string, string>
  inputsErrors: Record<string, boolean>
  onChangeInputs: ReturnType<typeof useInputs>['onChange']
  onBlurInputs: ReturnType<typeof useInputs>['onBlur']
  restartInputs: ReturnType<typeof useInputs>['restartInputs']
}

export default useDisplayUOMRows
