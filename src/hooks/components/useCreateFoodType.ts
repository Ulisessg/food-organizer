/* eslint-disable max-lines-per-function */
import { type AppDispatch, type RootState } from 'redux/store'
import { type MouseEvent, type RefObject } from 'react'
import {
  createFoodTypeThunk,
  restartPostData
} from 'redux/slices/foodsSlice'
import { useDispatch, useSelector } from 'react-redux'
import transformPostData from 'utils/transformPostData'
import { useInputs } from 'd-system'
import useValueIsRepeated from 'hooks/useValueIsRepeated'

const useCreateFoodType = (
  formRef: RefObject<HTMLFormElement>,
  detailsRef: RefObject<HTMLDetailsElement>
): UseCreateFoodTypeReturn => {
  const dispatch: AppDispatch = useDispatch()
  const foodsData = useSelector((state: RootState) => state.foods)
  const {
    inputsData,
    inputsErrors,
    onBlur,
    onChange:
        UseInputsOnChange,
    restartInputs
  } = useInputs(
    {
      food_type_name: ''
    },
    true
  )

  const {
    isRepeated:
     foodTypeIsRepeated,
    searchIsRepeated: searchFoodTypeIsRepeated,
    resetIsRepeated
  } = useValueIsRepeated<typeof foodsData['foodTypes'][0]>()
  const formIsValid = (): boolean => {
    if (formRef.current?.checkValidity() === true &&
    !foodTypeIsRepeated && !inputsErrors.food_type_name) return true
    return false
  }

  const onChange: typeof UseInputsOnChange = (ev) => {
    searchFoodTypeIsRepeated(
      foodsData.foodTypes,
      'name',
      ev.currentTarget.value
    )
    UseInputsOnChange(ev)
  }

  const createFoodType: UseCreateFoodTypeReturn['createFoodType'] = async () => {
    if (!formIsValid()) return
    const postFoodTypeResult = await dispatch(createFoodTypeThunk(transformPostData({
      name: inputsData.food_type_name
    })))
    if (typeof (postFoodTypeResult as any).error === 'undefined') {
      resetIsRepeated()
      formRef.current?.reset()
      restartInputs('all')
      formRef.current?.querySelector('button')?.focus()
      detailsRef.current?.focus()
      await dispatch(restartPostData())
    }
  }

  return {
    createFoodType,
    disableButton: !formIsValid(),
    foodTypeIsRepeated,
    inputsData,
    inputsErrors,
    onBlur,
    onChange
  }
}

export default useCreateFoodType

interface UseCreateFoodTypeReturn {
  onChange: ReturnType<typeof useInputs>['onChange']
  onBlur: ReturnType<typeof useInputs>['onBlur']
  inputsData: {
    food_type_name: string
  }
  inputsErrors: Record<keyof UseCreateFoodTypeReturn['inputsData'], boolean>
  foodTypeIsRepeated: boolean
  disableButton: boolean
  createFoodType: (ev: MouseEvent<HTMLButtonElement>) => Promise<void>
}
