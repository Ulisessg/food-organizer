/* eslint-disable max-statements */
/* eslint-disable camelcase */
/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/naming-convention */
import { type ChangeEvent, type MouseEvent, type RefObject, useContext, useState } from 'react'
import { type GetUOM } from 'controllers/food_organizer_crud/unitsOfMeasureCRUD'
import { UnitsOfMeasureContext } from 'context/unitsOfMeasureContext'
import { defaultSelectValue } from 'utils/constants'
import transformPostData from 'utils/transformPostData'
import type { units_of_measure } from '@prisma/client'
import { useInputs } from 'd-system'
import usePostRequest from 'hooks/usePostRequest'
import useValueIsRepeated from 'hooks/useValueIsRepeated'

const useCreateUnitsOfMeasure =
(formRef: RefObject<HTMLFormElement>): UseCreateUnitsOfMeasureReturn => {
  const uomContext = useContext(UnitsOfMeasureContext)
  const {
    isRepeated: uomIsRepeated,
    searchIsRepeated: seachUomIsRepeated
  } = useValueIsRepeated<GetUOM[0]['uom'][0]>()
  const {
    isRepeated: abbreviationIsRepeated,
    searchIsRepeated: searchIfAbbreviationIsRepeated
  } = useValueIsRepeated<GetUOM[0]['uom'][0]>()
  const { inputsData, onChange, onBlur, inputsErrors, restartInputs } = useInputs(
    {
      abbreviation: '',
      select_uomt: defaultSelectValue,
      uom_name: ''
    },
    true
  )
  const { postData, requestInit } =
  usePostRequest<Omit<units_of_measure, 'id' | 'creation_date'>, units_of_measure>(
    '/api/uom',
    {
      method: 'POST'
    }
  )
  const [
    disableButton,
    setDisableButton
  ] = useState<boolean>(true)
  const [
    showSuccessMessage,
    setShowSuccessMessage
  ] = useState<boolean>(false)
  const [
    showRequestErrorMessage,
    setShowRequestErrorMessage
  ] = useState<boolean>(false)

  const handleChange = (ev: TChangeEvent): void => {
    onChange(ev as ChangeEvent<HTMLInputElement>)
    const { form } = ev.currentTarget
    const select = form?.querySelector('select')

    if (form?.checkValidity() === true &&
    select?.value !== 'Selecciona una opcion') {
      setDisableButton(false)
    } else {
      setDisableButton(true)
    }
    if (ev.currentTarget.name === 'uom_name') {
      seachUomIsRepeated(
        uomContext.unitsOfMeasure,
        'name',
        ev.currentTarget.value
      )
    }
    if (ev.currentTarget.name === 'abbreviation') {
      searchIfAbbreviationIsRepeated(
        uomContext.unitsOfMeasure,
        'abbreviation',
        ev.currentTarget.value
      )
    }
  }

  const sendUom: UseCreateUnitsOfMeasureReturn['sendUom'] = (ev): void => {
    if (ev.currentTarget.form?.checkValidity() === true) {
      const uomtId =
      uomContext.unitsOfMeasureTypes.find((el) => el.name === inputsData.select_uomt)?.id as number
      const requestData = transformPostData({
        abbreviation: inputsData.abbreviation,
        name: inputsData.uom_name,
        uomt_id: uomtId
      })
      postData(requestData).then((res) => {
        setShowSuccessMessage(true)
        restartInputs('all')
        setDisableButton(true)
        uomContext.updateUom(res.data?.data as units_of_measure)
        setTimeout(
          () => {
            setShowSuccessMessage(false)
          },
          1500
        )
      })
        .catch(() => {
          setShowRequestErrorMessage(true)
          setTimeout(
            () => {
              setShowRequestErrorMessage(false)
            },
            1500
          )
        })
        .finally(() => {
          formRef.current?.parentNode?.querySelector('summary')?.focus()
        })
    }
  }
  return {
    abbreviationIsRepeated,
    disableButton,
    handleChange,
    inputsData,
    inputsErrors,
    onBlur,
    requestInit,
    sendUom,
    showRequestErrorMessage,
    showSuccessMessage,
    uomIsRepeated
  }
}

interface UseCreateUnitsOfMeasureReturn {
  handleChange: (ev: TChangeEvent) => void
  disableButton: boolean
  showSuccessMessage: boolean
  showRequestErrorMessage: boolean
  requestInit: boolean
  onBlur: ReturnType<typeof useInputs>['onBlur']
  abbreviationIsRepeated: boolean
  sendUom: (ev: MouseEvent<HTMLButtonElement>) => void
  inputsData: Record<keyof InputsValues, any>
  inputsErrors: Record<keyof InputsValues, boolean>
  uomIsRepeated: boolean
}

type TChangeEvent = ChangeEvent<HTMLInputElement | HTMLSelectElement>

interface InputsValues {
  abbreviation: string
  select_uomt: string
  uom_name: string
}

export default useCreateUnitsOfMeasure
