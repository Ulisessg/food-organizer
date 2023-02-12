/* eslint-disable max-lines-per-function */
import { type AppDispatch, type RootState } from 'redux/store'
import { type MouseEvent, type RefObject } from 'react'
import { createFoodThunk, restartPostData } from 'redux/slices/foodSlice'
import { useDispatch, useSelector } from 'react-redux'
import { defaultSelectValue } from 'utils/constants'
import getInputNumberData from 'utils/getInputNumberData'
import transformPostData from 'utils/transformPostData'
import { useInputs } from 'd-system'
import useMultipleSelects from 'hooks/useMultipleSelects'
import useValueIsRepeated from 'hooks/useValueIsRepeated'

const useCreateFood = (formRef: RefObject<HTMLFormElement>): UseCreateFoodReturn => {
  const dispatch: AppDispatch = useDispatch()
  const foodsData = useSelector((state: RootState) => state.foods)
  const { inputsData, inputsErrors, onBlur, onChange: UseInpusOnChange, restartInputs } = useInputs(
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    {
      food_name: '',
      food_prep_time: '',
      food_type_select: defaultSelectValue
    } as UseCreateFoodReturn['inputsData'],
    true
  )
  const {
    isRepeated: foodNameIsRepeated,
    resetIsRepeated,
    searchIsRepeated
  } = useValueIsRepeated<typeof foodsData['foods'][0]>()
  const {
    Component: SelectIngredients,
    data: IngredientsSelectsData,
    resetMultipleSelect
  } = useMultipleSelects('ingredients')
  const onChange: UseCreateFoodReturn['onChange'] = (ev) => {
    const input = ev.currentTarget
    if (input.name === 'food_prep_time') {
      getInputNumberData(ev.target as HTMLInputElement)
    }
    searchIsRepeated(
      foodsData.foods,
      'food_name',
      input.value
    )
    UseInpusOnChange(ev)
  }
  const createFood: UseCreateFoodReturn['createFood'] = async (ev) => {
    if (!formIsValid()) return
    const foodTypeId = foodsData.foodTypes.find((ft) => ft.name === inputsData.food_type_select)?.id
    const postFoodRequestResult = await dispatch(createFoodThunk(transformPostData({
      food_type_id: foodTypeId as any,
      image: null,
      name: inputsData.food_name,
      preparation_time: parseInt(
        inputsData.food_prep_time,
        10
      ),
      score: 0,
      used_counter: 0
    })))
    if (typeof (postFoodRequestResult as any).error === 'undefined') {
      resetIsRepeated()
      formRef.current?.reset()
      restartInputs('all')
      resetMultipleSelect()
      await dispatch(restartPostData())
    }
  }
  const formIsValid = (): boolean => {
    if (formRef.current?.checkValidity() === true &&
    IngredientsSelectsData.valuesUsed.length > 0 &&
    !inputsErrors.food_name &&
    !inputsErrors.food_prep_time && !inputsErrors.food_type_select) return true
    return false
  }
  // Add validation for prep time to not allow symbols
  return {
    SelectIngredientsComponent: SelectIngredients,
    createFood,
    disableButton: !formIsValid(),
    foodNameIsRepeated,
    inputsData,
    inputsErrors,
    onBlur,
    onChange
  }
}

export default useCreateFood

interface UseCreateFoodReturn {
  inputsData: {
    food_name: string
    food_prep_time: string
    food_type_select: string
  }
  inputsErrors: Record<keyof UseCreateFoodReturn['inputsData'], boolean>
  onChange: ReturnType<typeof useInputs>['onChange']
  onBlur: ReturnType<typeof useInputs>['onBlur']
  SelectIngredientsComponent: ReturnType<typeof useMultipleSelects>['Component']
  foodNameIsRepeated: boolean
  disableButton: boolean
  createFood: (ev: MouseEvent<HTMLButtonElement>) => void
}
