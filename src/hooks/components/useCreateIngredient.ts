/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import { type AppDispatch, type RootState } from 'redux/store'
import { type MouseEvent, type RefObject } from 'react'
import {
  createIngredientThunk,
  restartPostStatusThunk
} from 'redux/slices/ingredientsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { defaultSelectValue } from 'utils/constants'
import transformPostData from 'utils/transformPostData'
import { useInputs } from 'd-system'
import useMultipleSelects from 'hooks/useMultipleSelects'
import useValueIsRepeated from 'hooks/useValueIsRepeated'

const useCreateIngredient = (
  detailsElement: RefObject<HTMLDetailsElement>,
  formElement: RefObject<HTMLFormElement>,
  selectUomElement: RefObject<HTMLSelectElement>
): UseCreateIngredientReturn => {
  const ingredientsData = useSelector((state: RootState) => state.ingredients)
  const purchasePlaces = useSelector((state: RootState) => state.purchasePlaces.purchasePlaces)
  const dispatch: AppDispatch = useDispatch()
  const {
    data: purchasePlacesSelected,
    resetMultipleSelect
  } = useMultipleSelects()
  const {
    isRepeated: ingredientNameIsRepeated,
    searchIsRepeated: searchNameIsRepeated
  } = useValueIsRepeated()
  const { inputsData, inputsErrors, onBlur, onChange, restartInputs } = useInputs(
    {
      ingredient_comment: '',
      ingredient_name: '',
      ingredient_uom: defaultSelectValue
    },
    true
  )

  const formIsValid = (): boolean => {
    if (
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      !inputsErrors.ingredient_name &&
      !ingredientNameIsRepeated &&
      inputsData.ingredient_name.length >= 2 &&
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      !inputsErrors.ingredient_uom &&
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      !inputsData.ingredient_uom.includes(defaultSelectValue)) return true
    return false
  }

  const handleOnChange: typeof onChange = (ev) => {
    onChange(ev)
    if (ev.currentTarget.name === 'ingredient_name') {
      searchNameIsRepeated(
        ingredientsData.ingredients,
        'ingredient_name',
        ev.currentTarget.value
      )
    }
  }

  const createIngredient: UseCreateIngredientReturn['createIngredient'] = async () => {
    const allowSend: boolean = formIsValid()
    if (!allowSend) return
    const uomId: number = parseInt(
      (selectUomElement.current?.selectedOptions[0]
        ?.getAttribute('data-uom-id') as string),
      10
    )

    const postResult = await dispatch(createIngredientThunk({
      ingredient: transformPostData({
        comment: inputsData.ingredient_comment,
        image: null,
        name: inputsData.ingredient_name,
        uomId
      }),
      purchasePlaces,
      purchasePlacesSelected: purchasePlacesSelected.valuesUsed
    }))
    if ((postResult as any).createIngredientPurchasePlacesError === true &&
      (postResult as any).createIngredientsError === true) {
      return
    }
    // Reset inputs
    resetMultipleSelect()
    restartInputs('all')
    formElement.current?.reset()
    detailsElement.current?.focus()
    void await dispatch(restartPostStatusThunk())
  }

  return {
    createIngredient,
    disableButton: !formIsValid() || ingredientsData.postIsLoading,
    ingredientNameIsRepeated,
    inputsData,
    inputsErrors,
    onBlur,
    onChange: handleOnChange
  }
}

interface UseCreateIngredientReturn {
  inputsData: InputsData
  inputsErrors: Record<keyof InputsData, boolean>
  onBlur: ReturnType<typeof useInputs>['onBlur']
  onChange: ReturnType<typeof useInputs>['onChange']
  disableButton: boolean
  createIngredient: (ev: MouseEvent<HTMLButtonElement>) => Promise<void>
  ingredientNameIsRepeated: boolean
}

interface InputsData {
  ingredient_comment: string
  ingredient_name: string
  ingredient_uom: string
}

export default useCreateIngredient
