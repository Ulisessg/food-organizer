/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import { type AppDispatch, type RootState } from 'redux/store'
import {
  type ChangeEvent, type MouseEvent,
  type RefObject, useState
} from 'react'
import { createFoodThunk, restartPostData } from 'redux/slices/foodsSlice/thunks'
import { useDispatch, useSelector } from 'react-redux'
import { type CreateFood } from 'redux/slices/foodsSlice/types'
import
createFoodelectronCallback
  from 'redux/slices/foodsSlice/callbacks/electron/createFoodElectronCallback'
import { defaultSelectValue } from 'utils/constants'
import getInputNumberData from 'utils/getInputNumberData'
import transformPostData from 'utils/transformPostData'
import { useInputs } from 'd-system'
import useMultipleSelects from 'hooks/useMultipleSelects'
import useValueIsRepeated from 'hooks/useValueIsRepeated'

const useCreateFood = (formRef: RefObject<HTMLFormElement>): UseCreateFoodReturn => {
  const dispatch: AppDispatch = useDispatch()
  const foodsData = useSelector((state: RootState) => state.foods)
  const ingredientsData = useSelector((state: RootState) => state.ingredients)
  const [
    inputsIngredientQtyAreValid,
    setInputsIngredientsQtyAreValid
  ] = useState<boolean>(false)

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
    addSelect,
    data: selectIngredientsData,
    deleteSelect,
    disableButton: multipleSelecsDisableButton,
    onChange: UseMultipleSelectsOnChangeFunc,
    resetMultipleSelect
  } = useMultipleSelects(
    'ingredients',
    ingredientsData.ingredients.length
  )
  const UseMultipleSelectsOnChange:
  UseCreateFoodReturn['UseMultipleSelectsOnChange'] = (ev) => {
    UseMultipleSelectsOnChangeFunc(ev)
    setInputsIngredientsQtyAreValid(formRef.current?.checkValidity() as boolean)
  }

  const onChange: UseCreateFoodReturn['onChange'] = (ev) => {
    const input = ev.currentTarget
    if (input.name === 'food_prep_time') {
      getInputNumberData(ev.target as HTMLInputElement)
    }
    if (input.name === 'food_name') {
      searchIsRepeated(
        foodsData.foods,
        'food_name',
        input.value
      )
    }
    UseInpusOnChange(ev)

    /**
     * Re render to validate form if user start typing ingredient qty
     */
    setInputsIngredientsQtyAreValid(formRef.current?.checkValidity() as boolean)
  }
  const createFood: UseCreateFoodReturn['createFood'] = async (_ev) => {
    if (!formIsValid()) return
    const foodTypeId = foodsData.foodTypes.find((ft) => ft.name === inputsData.food_type_select)?.id

    const ingredientsContainers = document.querySelectorAll('[data-ingredient-container="true"]')
    const datalist: HTMLDataListElement = document
      .querySelector('datalist[id="ingredients-options"]') as HTMLDataListElement

    const ingredients: CreateFood['ingredients'] = []

    ingredientsContainers.forEach((ingredientContainer) => {
      const inputIngredientName: HTMLInputElement =
      ingredientContainer.querySelector('input[list=ingredients-options]') as HTMLInputElement
      const inputIngredientQty: HTMLInputElement = ingredientContainer
        .querySelector('input[type=number]') as HTMLInputElement
      console.log(ingredientContainer)

      const ingredientId: number = parseInt(
        datalist
          .querySelector(`option[value='${inputIngredientName.value}' i]`)
          ?.getAttribute('data-ingredient-id') as string,
        10
      )
      const ingredientQty = parseInt(
        inputIngredientQty.value,
        10
      )
      ingredients.push({
        // Food id is setted before food creation
        food_id: '' as unknown as number,
        ingredient_id: ingredientId,
        ingredient_qty: ingredientQty
      })
    })

    const dataTransformed: CreateFood = transformPostData({
      food_type_id: foodTypeId as number,
      image: null,
      ingredients,
      name: inputsData.food_name,
      preparation_time: parseInt(
        inputsData.food_prep_time,
        10
      ),
      score: 0,
      used_counter: 0
    })
    const postFoodRequestResult = await
    dispatch(createFoodThunk(createFoodelectronCallback(dataTransformed)))

    if (typeof (postFoodRequestResult as any).error === 'undefined') {
      resetIsRepeated()
      formRef.current?.reset()
      restartInputs('all')
      resetMultipleSelect()
      await dispatch(restartPostData())
    }
  }

  /**
   *
   * Form validations
   */
  const formIsValid = (): boolean => {
    if (formRef.current?.checkValidity() === true &&
    (selectIngredientsData.valuesUsed.length >= 1) &&
    (inputsIngredientQtyAreValid) &&
    !inputsErrors.food_name &&
    !inputsErrors.food_prep_time && !inputsErrors.food_type_select) return true
    return false
  }

  // Add validation for prep time to not allow symbols
  return {
    UseMultipleSelectsOnChange,
    addSelect,
    createFood,
    deleteSelect,
    disableAddIngredient: multipleSelecsDisableButton,
    disableButton: !formIsValid(),
    foodNameIsRepeated,
    inputsData,
    inputsErrors,
    onBlur,
    onChange,
    selectIngredientsData
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
  foodNameIsRepeated: boolean
  disableButton: boolean
  createFood: (ev: MouseEvent<HTMLButtonElement>) => void
  addSelect: ReturnType<typeof useMultipleSelects>['addSelect']
  deleteSelect: ReturnType<typeof useMultipleSelects>['deleteSelect']

  UseMultipleSelectsOnChange:
  (
    ev: ChangeEvent<HTMLInputElement>
  ) => void
  selectIngredientsData: ReturnType<typeof useMultipleSelects>['data']
  disableAddIngredient: ReturnType<typeof useMultipleSelects>['disableButton']
}
