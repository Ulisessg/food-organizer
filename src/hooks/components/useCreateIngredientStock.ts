/* eslint-disable camelcase */
/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import { type AppDispatch, type RootState } from 'redux/store'
import { type MouseEvent, type RefObject, useState } from 'react'
import {
  createIngredientStockThunk,
  restartPostStatusThunk
} from 'redux/slices/ingredientsStockSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
  type GetIngredientStock
} from 'controllers/food_organizer_crud/ingredientStockCRUD'
import { useInputs } from 'd-system'
import useValueIsRepeated from 'hooks/useValueIsRepeated'

const useCreateIngredientStock = (formElement:
RefObject<HTMLFormElement>, detailsElement: RefObject<HTMLDetailsElement>):
UseCreateIngredientStockReturn => {
  const ingredeintsStockData = useSelector((state: RootState) => state.ingredientsStock)
  const ingredientsData = useSelector((state: RootState) => state.ingredients)
  const dispatch: AppDispatch = useDispatch()
  const {
    isRepeated,
    searchIsRepeated,
    resetIsRepeated
  } = useValueIsRepeated<GetIngredientStock[0]>()
  const [
    uom,
    setUom
  ] = useState('N/A')
  const [
    ingredientId,
    setIngredientId
  ] = useState<number>()
  const [
    ingredientExist,
    setIngredientExists
  ] = useState<boolean>(false)
  const { inputsData, onBlur, onChange: UseIOnChange, inputsErrors, restartInputs } = useInputs(
    {
      ingredient: '',
      ingredient_qty: '',
      ingredient_stock_comment: ''
    },
    true
  )

  const getIngredientExist =
  (input: HTMLInputElement): boolean => ingredientsData.ingredients.some((ingr) => {
    if (ingr.ingredient_name.toLowerCase() === input.value.toLowerCase()) {
      return true
    }
    return false
  })
  const formIsValid = (): boolean => {
    if (formElement.current?.checkValidity() === true && !isRepeated) return true
    return false
  }

  const onChange: ReturnType<typeof useInputs>['onChange'] = (ev) => {
    const input = ev.currentTarget
    // Only accept numbers and no exponential notation or symbols, etc.
    if (input.name === 'ingredient_qty' && (ev.target.value.match('/^[1-9][0-9]*$/g') === null)) {
      input.value = Number(input.value).toFixed(0)
      input.reportValidity()
    } else {
      input.setCustomValidity('')
      input.checkValidity()
      input.reportValidity()
    }
    UseIOnChange(ev)

    if (input.id === 'ingredient_stock_ingredients') {
      // Ingredient exists
      const ingredientExistResult = getIngredientExist(ev.currentTarget as HTMLInputElement)

      if (!ingredientExistResult) {
        input.setCustomValidity('El ingrediente no existe')
        input.checkValidity()
        input.reportValidity()
        resetIsRepeated()
        setIngredientExists(false)
        return
      }
      input.setCustomValidity('')
      setIngredientExists(true)

      searchIsRepeated(
        ingredeintsStockData.ingredientsStock,
        'ingredient',
        input.value
      )
      setUomAndIngredientId(ev)
    }
  }

  const setUomAndIngredientId: ReturnType<typeof useInputs>['onChange'] = (ev) => {
    const value = ev.currentTarget.value as unknown as string
    const option = document.querySelector(`option[value='${value}' i]`) as HTMLOptionElement
    let unitOfMeasure: string | undefined = option
      ?.getAttribute('data-ingredient-uom') as unknown as string

    const ingredientIdResult: number = parseInt(
      option?.getAttribute('data-ingredient-id') as string,
      10
    )
    if (typeof unitOfMeasure !== 'string') {
      unitOfMeasure = 'N/A'
    }
    setUom(unitOfMeasure)
    setIngredientId(ingredientIdResult)
  }

  const createIngredientStock:
  UseCreateIngredientStockReturn['createIngredientStock'] = async (ev) => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!formElement.current?.checkValidity() ||
    formElement.current.querySelector('button')?.disabled === true) return

    const postResult = await dispatch(createIngredientStockThunk({
      ingredientData: {
        comment: inputsData.ingredient_stock_comment,
        ingredient_id: ingredientId as number,
        ingredient_qty: parseInt(
          inputsData.ingredient_qty,
          10
        )
      } as any,
      ingredientList: ingredientsData.ingredients
    }))
    // No error in async thunk
    if (typeof (postResult as any).error === 'undefined') {
      formElement.current.reset()
      restartInputs('all')
      resetIsRepeated()
      formElement.current.reportValidity()
      detailsElement.current?.focus()
      setUom('N/A')
      await dispatch(restartPostStatusThunk())
    }
  }

  return {
    createIngredientStock,
    disableButton:
    !formIsValid() ||
     ingredeintsStockData.getRequestIsLoading ||
      ingredeintsStockData.postRequestIsLoading || !ingredientExist ||
      ingredeintsStockData.postRequestSuccess,
    inputsData,
    inputsErrors,
    isRepeated,
    onBlur,
    onChange,
    uom
  }
}

interface UseCreateIngredientStockReturn {
  inputsData: {
    ingredient_qty: string
    ingredient: string
    ingredient_stock_comment: string
  }
  inputsErrors: {
    ingredient_qty: boolean
    ingredient: boolean
    ingredient_stock_comment: boolean
  }
  onChange: ReturnType<typeof useInputs>['onChange']
  onBlur: ReturnType<typeof useInputs>['onBlur']
  // Unit of measure from ingredient selected
  uom: string
  disableButton: boolean
  createIngredientStock: (ev: MouseEvent<HTMLButtonElement>) => void
  isRepeated: boolean
}

export default useCreateIngredientStock
