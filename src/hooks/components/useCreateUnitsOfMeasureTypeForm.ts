import {
  type ChangeEvent,
  type FormEvent, type MouseEvent, type RefObject, useContext, useState
} from 'react'
import { type GetUOMT } from 'controllers/food_organizer_crud/unitsOfMeasureTypeCRUD'
import { UnitsOfMeasureContext } from 'context/unitsOfMeasureContext'
import transformPostData from 'utils/transformPostData'
import { useInputs } from 'd-system'
import usePostRequest from 'hooks/usePostRequest'
import useValueIsRepeated from 'hooks/useValueIsRepeated'

/* eslint-disable max-lines-per-function */
const useCreateUnitsOfMeasureTypeForm = (formRef: RefObject<HTMLFormElement>):
UseCreateUnitsOfMeasureTypeFormReturn => {
  const { inputsData, inputsErrors, onBlur, onChange, restartInputs } = useInputs(
    {
      uomt: ''
    },
    true
  )
  const uomContext = useContext(UnitsOfMeasureContext)
  const { error, postData, requestEnd, requestInit, response } =
  usePostRequest<UomtDataRequest, GetUOMT[0]>(
    '/api/uomt',
    { method: 'POST' }
  )

  const [
    hideRequestMessage,
    setHideRequestMessage
  ] = useState<boolean>(false)

  const [
    disableButton,
    setDisableButton
  ] = useState<boolean>(true)
  const { isRepeated, searchIsRepeated } = useValueIsRepeated<GetUOMT[0]>()

  const handleChange: UseCreateUnitsOfMeasureTypeFormReturn['handleChange'] = (ev): void => {
    onChange(ev)
    const { value } = ev.currentTarget
    if (ev.currentTarget.validity.valid) {
      setDisableButton(false)
    } else {
      setDisableButton(true)
      setHideRequestMessage(true)
    }
    searchIsRepeated(
      uomContext.unitsOfMeasureTypes,
      'name',
      value
    )
    ev.currentTarget.checkValidity()
    ev.currentTarget.reportValidity()
  }

  const updateUomt = (data: GetUOMT[0]): void => {
    uomContext.updateUomt(data)
  }

  const sendUomt: UseCreateUnitsOfMeasureTypeFormReturn['sendUomt'] = (ev): void => {
    ev.preventDefault()
    if (ev.currentTarget.form?.checkValidity() === true) {
      setHideRequestMessage(false)
      const data = transformPostData({
        name: inputsData.uomt
      })
      postData(data).then((res) => {
        updateUomt(res.data.data as GetUOMT[0])
      })
        .finally(() => {
          restartInputs('uomt')
          setDisableButton(true)
          const button = formRef.current?.querySelector('button') as HTMLButtonElement
          button.blur()
          const summary = formRef.current?.parentNode?.querySelector('summary')
          summary?.focus()

          setTimeout(
            () => {
              setHideRequestMessage(true)
            },
            1500
          )
        })
    }
  }
  return {
    disableButton,
    error,
    handleChange,
    hideRequestMessage,
    inputsData,
    inputsErrors,
    isRepeated,
    onBlur,
    requestEnd,
    requestInit,
    response,
    sendUomt
  }
}

interface UseCreateUnitsOfMeasureTypeFormReturn {
  inputsErrors: Record<string, boolean>
  inputsData: Record<string, any>
  onBlur: ReturnType<typeof useInputs>['onBlur']
  error: boolean
  requestEnd: boolean
  sendUomt: (ev: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>) => void
  handleChange: (ev: ChangeEvent<HTMLInputElement>) => void
  isRepeated: boolean
  disableButton: boolean
  hideRequestMessage: boolean
  requestInit: boolean
  response: string | GetUOMT[0]
}

interface UomtDataRequest {
  creation_date: string
  name: string
}

export default useCreateUnitsOfMeasureTypeForm
