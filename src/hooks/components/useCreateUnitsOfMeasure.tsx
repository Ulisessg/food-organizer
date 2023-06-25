/* eslint-disable max-statements */
/* eslint-disable camelcase */
/* eslint-disable max-lines-per-function */
/* eslint-disable @typescript-eslint/naming-convention */
import { type AppDispatch, type RootState } from 'redux/store'
import { type ChangeEvent, type MouseEvent, type RefObject, useState } from 'react'
import {
  createUnitOfMeasureThunk,
  restartCreateUomPostStatusThunk
} from 'redux/slices/unitsOfMeasureSlice/thunks'
import { useDispatch, useSelector } from 'react-redux'
import {
  type GetUnitsOfMeasureData
} from 'controllers/food_organizer_crud/nextjs/unitsOfMeasureCRUD'
import
createUomElectronCallback
  from 'redux/slices/unitsOfMeasureSlice/callbacks/electron/createUomElectronCallback'
import { defaultSelectValue } from 'utils/constants'
import { useInputs } from 'd-system'
import useValueIsRepeated from 'hooks/useValueIsRepeated'

const useCreateUnitsOfMeasure =
(
  formRef: RefObject<HTMLFormElement>,
  detailsRef: RefObject<HTMLDetailsElement>
): UseCreateUnitsOfMeasureReturn => {
  const unitsOfMeasureData = useSelector((state: RootState) => state.unitsOfMeasure)
  const dispatch: AppDispatch = useDispatch()
  const {
    isRepeated: uomIsRepeated,
    searchIsRepeated: seachUomIsRepeated
  } = useValueIsRepeated<GetUnitsOfMeasureData['unitsOfMeasureGroupedByType'][0]['uom'][0]>()
  const {
    isRepeated: abbreviationIsRepeated,
    searchIsRepeated: searchIfAbbreviationIsRepeated
  } = useValueIsRepeated<GetUnitsOfMeasureData['unitsOfMeasureGroupedByType'][0]['uom'][0]>()
  const { inputsData, onChange, onBlur, inputsErrors, restartInputs } = useInputs(
    {
      abbreviation: '',
      select_uomt: defaultSelectValue,
      uom_name: ''
    },
    true
  )

  const [
    disableButton,
    setDisableButton
  ] = useState<boolean>(true)

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
        unitsOfMeasureData.uom,
        'name',
        ev.currentTarget.value
      )
    }
    if (ev.currentTarget.name === 'abbreviation') {
      searchIfAbbreviationIsRepeated(
        unitsOfMeasureData.uom,
        'abbreviation',
        ev.currentTarget.value
      )
    }
  }

  const formIsValid = (): boolean => {
    if (formRef.current?.checkValidity() === true) return true
    return false
  }

  const createUom: UseCreateUnitsOfMeasureReturn['createUom'] = async (ev) => {
    if (ev.currentTarget.form?.checkValidity() === true) {
      const uomtId =
      unitsOfMeasureData.unitsOfMeasureType
        .find((el) => el.name === inputsData.select_uomt)?.id as number

      const res = await dispatch(createUnitOfMeasureThunk(createUomElectronCallback({
        abbreviation: inputsData.abbreviation,
        name: inputsData.uom_name,
        uomt_id: uomtId
      })))

      if (typeof (res as any).error === 'undefined') {
        restartInputs('all')
        detailsRef.current?.focus()
        setDisableButton(true)
        await dispatch(restartCreateUomPostStatusThunk())
      }
    }
  }
  return {
    abbreviationIsRepeated,
    createUom,
    disableButton: !formIsValid() || unitsOfMeasureData.postUomIsLoading || disableButton,
    handleChange,
    inputsData,
    inputsErrors,
    onBlur,
    uomIsRepeated
  }
}

interface UseCreateUnitsOfMeasureReturn {
  handleChange: (ev: TChangeEvent) => void
  onBlur: ReturnType<typeof useInputs>['onBlur']
  createUom: (ev: MouseEvent<HTMLButtonElement>) => Promise<void>
  disableButton: boolean
  abbreviationIsRepeated: boolean
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
