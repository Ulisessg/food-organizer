/* eslint-disable max-lines */
/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import {
  type ComponentPropsWithoutRef,
  type FC,
  Fragment,
  type ReactNode,
  createContext,
  useContext,
  useState
} from 'react'
import { Button } from 'd-system'
import { type ModalUpdateTableProps } from 'components/common/ModalUpdateTable/types'
import RequestResultStyles from 'components/common/RequestResultStyles'
import randomId from 'utils/randomId'
import safeObjectGet from 'utils/safeObjectGet'
import styled from 'styled-components'

const initialState: ModalUpdateTableContextState = {
  addInput: () => {
    //
  },
  anyInputIsEmpty: false,
  inputsChanged: [],
  inputsEmpty: [],
  inputsRepeated: [],
  inputsValues: {},
  updateInputValue: () => {
    //
  }
}

export const ModalUpdateTableContext = createContext(initialState)

export const ModalUpdateTableContextProvider: FC<ProviderProps> = ({
  children,
  buttonCancellProps,
  buttonConfirmProps,
  modalProps,
  onClikConfirmUpdate

}) => {
  const [
    anyInputIsEmpty,
    setAnyInputIsEmpty
  ] = useState<boolean>(false)
  const [
    inputsChanged,
    setInputsChanged
  ] = useState<string[]>([])
  const [
    inputsEmpty,
    setInputsEmpty
  ] = useState<HTMLInputElement[]>([])
  const [
    inputsRepeated,
    setInputsRepeated
  ] = useState<HTMLInputElement[]>([])
  const [
    inputsValues,
    setInputsValues
  ] = useState<ModalUpdateTableContextState['inputsValues']>({})

  const updateInputValue:
  ModalUpdateTableContextState['updateInputValue'] = (inputName, newValue) => {
    const newValueLowerCase = newValue.toLowerCase()
    const inputStored = safeObjectGet(
      inputsValues,
      inputName
    )

    const modal: HTMLDivElement = document.getElementById('modal_update_table') as HTMLDivElement
    const inputHTMLElement: HTMLInputElement = modal
      .querySelector(`input[name="${inputName}"]`) as HTMLInputElement
    const inputStoredIndexOfChanged = inputsChanged.indexOf(inputName)
    const inputStoredIndexOfRepeated = inputsRepeated.indexOf(inputHTMLElement)

    setInputsValues((prev) => ({
      ...prev,
      [inputName]: {
        ...inputStored,
        value: newValueLowerCase
      }
    }))

    /** Is imposible the new value equals stored initial value in first change */
    /** Initial value is setted as lowercase in 'add input' */
    if (newValueLowerCase === inputStored.initialValue.toLowerCase()) {
      setInputsRepeated((prev) => ([
        ...prev.splice(
          inputStoredIndexOfRepeated,
          1
        )
      ]))
      setInputsChanged((prev) => [
        ...prev.splice(
          inputStoredIndexOfChanged,
          1
        )
      ])
    }

    if (inputStoredIndexOfChanged === -1) {
      setInputsChanged((prev) => ([
        ...prev,
        inputName
      ]))
    }

    if (newValue === '') {
      setAnyInputIsEmpty(true)
      return
    }
    const inputsEmptyResult: NodeListOf<HTMLInputElement> = modal
      .querySelectorAll(`input[value=""]:not([name="${inputName}"])`)

    setInputsEmpty([...inputsEmptyResult])

    if (inputsEmptyResult.length === 0) {
      setAnyInputIsEmpty(false)
    } else {
      setAnyInputIsEmpty(true)
    }
    if (inputStored.allowRepeatedValues) return

    const inputsWithValueRepeated: NodeListOf<HTMLInputElement> =
    modal
      // eslint-disable-next-line max-len
      .querySelectorAll(`input[value="${newValue}" i]:not([name="${inputName}"])`)

    if (inputsWithValueRepeated.length >= 1) {
      setInputsRepeated([
        ...inputsWithValueRepeated,
        inputHTMLElement
      ])
    }
  }

  const addInput:
  ModalUpdateTableContextState['addInput'] = (inputName, allowRepeatedValues, initialValue) => {
    setInputsValues((prev) => ({
      ...prev,
      [inputName]: {
        allowRepeatedValues,
        initialValue: initialValue.toLowerCase(),
        inputName,
        value: initialValue.toLowerCase()
      }
    }))
  }
  return <ModalUpdateTableContext.Provider value={{
    addInput,
    anyInputIsEmpty,
    inputsChanged,
    inputsEmpty,
    inputsRepeated,
    inputsValues,
    updateInputValue
  }}>
    {
      children
    }
    <Buttons
      modalProps={modalProps}
      onClikConfirmUpdate={onClikConfirmUpdate}
      buttonCancellProps={buttonCancellProps}
      buttonConfirmProps={buttonConfirmProps}
        />
  </ModalUpdateTableContext.Provider>
}

const Buttons: FC<ButtonsProps> = ({
  modalProps,
  onClikConfirmUpdate,
  buttonCancellProps,
  buttonConfirmProps
}) => {
  const ModalUpdateTableCtx = useContext(ModalUpdateTableContext)

  return <>
  <ValuesAreRepeated />
  <ButtonsContainer>
    <Button
      {...buttonConfirmProps}
      colorMessage="continue"
      text="Confirmar cambios"
      size="small"
      type="button"
      onClick={onClikConfirmUpdate}
      disabled={
        ModalUpdateTableCtx.anyInputIsEmpty ||
        ModalUpdateTableCtx.inputsChanged.length === 0 ||
        ModalUpdateTableCtx.inputsRepeated.length >= 1
      }
    />
    <Button
      {...buttonCancellProps}
      colorMessage="cancel"
      text="Cancelar"
      size="small"
      type="button"
      onClick={modalProps.onRequestClose}
    />
  </ButtonsContainer>
</>
}

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
`

const ValuesAreRepeated: FC = () => {
  const ModalUpdateTableCtx = useContext(ModalUpdateTableContext)
  return <InputsRepeatedContainer>
  <RequestResultStyles
      hidden={ModalUpdateTableCtx.inputsRepeated.length === 0}
      isError={true}
    >
      <p style={{ color: 'black' }}
      hidden={ModalUpdateTableCtx.inputsRepeated.length === 0}
      >Los siguientes valores están repetidos:</p>
      {ModalUpdateTableCtx.inputsRepeated.map((input) => {
        const inputLabelText = input.previousSibling?.textContent
        return <Fragment key={randomId()}>
          <p style={{ textTransform: 'capitalize' }}>
            <strong style={{ color: 'black' }}>{inputLabelText}</strong> : {input.value}
          </p>
        </Fragment>
      })}
    </RequestResultStyles>
</InputsRepeatedContainer>
}

const InputsRepeatedContainer = styled.div`
  margin-bottom: 40px;
  & span {
    display: grid;
    justify-content: center;
    align-content: space-around;
    height: 100%;
    padding: 10px;
    margin: 10px;
    & > p {
      margin-bottom: 10px;
    }
  }
`

interface ButtonsProps extends Pick<ModalUpdateTableProps,
'onClikConfirmUpdate' | 'buttonCancellProps' | 'buttonConfirmProps' | 'modalProps'> {
}

interface ModalUpdateTableContextState {
  inputsValues: Record<string, {
    value: string
    allowRepeatedValues: boolean
    initialValue: string
    inputName: string
  }>
  updateInputValue: (inputName: string, newValue: string) => void
  addInput: (inputName: string, allowRepeatedValues: boolean, initialValue: string,) => void

  /** Inputs 'name' attribute */
  inputsChanged: string[]

  /** Inputs html elements  */
  inputsRepeated: HTMLInputElement[]

  anyInputIsEmpty: boolean
  inputsEmpty: HTMLInputElement[]
}

interface ProviderProps extends ComponentPropsWithoutRef<'div'> {
  modalProps: ModalUpdateTableProps['modalProps']
  onClikConfirmUpdate: ModalUpdateTableProps['onClikConfirmUpdate']
  buttonCancellProps: ModalUpdateTableProps['buttonCancellProps']
  buttonConfirmProps: ModalUpdateTableProps['buttonConfirmProps']
  children: ReactNode
}
