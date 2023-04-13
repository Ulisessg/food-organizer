import { type AppDispatch, type RootState } from 'redux/store'
import {
  type ChangeEvent,
  type FormEvent, type MouseEvent, type RefObject
} from 'react'
import {
  createUnitOfMeasureTypeThunk,
  restartCreateUomtPostStatusThunk
} from 'redux/slices/unitsOfMeasureSlice/thunks'
import { useDispatch, useSelector } from 'react-redux'
import { type GetUOM } from 'controllers/food_organizer_crud/unitsOfMeasureCRUD'
import transformPostData from 'utils/transformPostData'
import { useInputs } from 'd-system'
import useValueIsRepeated from 'hooks/useValueIsRepeated'

/* eslint-disable max-lines-per-function */
const useCreateUnitsOfMeasureTypeForm = (
  formElementRef: RefObject<HTMLFormElement>,
  detailsElementRef: RefObject<HTMLDetailsElement>
):
UseCreateUnitsOfMeasureTypeFormReturn => {
  const unitsOfMeasureData = useSelector((state: RootState) => state.unitsOfMeasure)
  const dispatch: AppDispatch = useDispatch()
  const { isRepeated, searchIsRepeated } = useValueIsRepeated<GetUOM['unitsOfMeasureType'][0]>()
  const { inputsData, inputsErrors, onBlur, onChange, restartInputs } = useInputs(
    {
      uomt: ''
    },
    true
  )

  const formIsValid = (): boolean => {
    if (formElementRef.current?.checkValidity() === true && inputsData.uomt.length > 0) return true
    return false
  }

  const handleChange: UseCreateUnitsOfMeasureTypeFormReturn['handleChange'] = (ev): void => {
    onChange(ev)

    const { value } = ev.currentTarget

    searchIsRepeated(
      unitsOfMeasureData.unitsOfMeasureType,
      'name',
      value
    )
    ev.currentTarget.checkValidity()
    ev.currentTarget.reportValidity()
  }

  const createUomt: UseCreateUnitsOfMeasureTypeFormReturn['createUomt'] = async (ev) => {
    ev.preventDefault()
    if (ev.currentTarget.form?.checkValidity() === true) {
      const result = await dispatch(createUnitOfMeasureTypeThunk(transformPostData({
        name: inputsData.uomt
      })))

      if (typeof (result as any).error === 'undefined') {
        restartInputs('all')
        detailsElementRef.current?.focus()
        await dispatch(restartCreateUomtPostStatusThunk())
      }
    }
  }
  return {
    createUomt,
    disableButton: !formIsValid() || unitsOfMeasureData.postUomIsLoading || isRepeated,
    handleChange,
    inputsData,
    inputsErrors,
    isRepeated,
    onBlur
  }
}

interface UseCreateUnitsOfMeasureTypeFormReturn {
  inputsErrors: Record<string, boolean>
  inputsData: Record<string, any>
  onBlur: ReturnType<typeof useInputs>['onBlur']
  createUomt: (ev: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>) => Promise<void>
  handleChange: (ev: ChangeEvent<HTMLInputElement>) => void
  isRepeated: boolean
  disableButton: boolean
}

export default useCreateUnitsOfMeasureTypeForm
