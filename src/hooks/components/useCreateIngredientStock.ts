/* eslint-disable camelcase */
/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import { type MouseEvent, type RefObject, useState } from 'react'
import { type CreateIngredientStock } from 'controllers/food_organizer_crud/ingredientStockCRUD'
import { type ingredient_stock } from '@prisma/client'
import transformPostData from 'utils/transformPostData'
import { useInputs } from 'd-system'
import usePostRequest from 'hooks/usePostRequest'

const useCreateIngredientStock = (formElement:
RefObject<HTMLFormElement>):
UseCreateIngredientStockReturn => {
  const [
    disableButton,
    setDisableButton
  ] = useState<boolean>(true)
  const [
    uom,
    setUom
  ] = useState('N/A')
  const [
    ingredientId,
    setIngredientId
  ] = useState<number>()
  const {
    error: requestError,
    postData,
    requestEnd,
    requestInit
  } = usePostRequest<CreateIngredientStock, ingredient_stock>('/api/ingredientstock')
  const { inputsData, onBlur, onChange: UseIOnChange, inputsErrors } = useInputs(
    {
      ingredient: '',
      ingredient_qty: '',
      ingredient_stock_comment: ''
    },
    true
  )

  const onChange: ReturnType<typeof useInputs>['onChange'] = (ev) => {
    const input = ev.currentTarget
    // Only accept numbers and no exponential notation or symbols, etc.
    if (input.name === 'ingredient_qty' && (ev.target.value.match('/^[1-9][0-9]*$/g') === null)) {
      input.value = Number(input.value).toFixed(0)
      input.reportValidity()
      setDisableButton(true)
    } else {
      input.setCustomValidity('')
      input.checkValidity()
      input.reportValidity()
    }
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    setDisableButton(!formElement.current?.checkValidity())
    UseIOnChange(ev)

    if (input.id === 'ingredient_stock_ingredients') {
      getUom(ev)
      const selectedIngredientId: number = parseInt(
        document
          .querySelector(`option[value="${ev.currentTarget.value}"]`)
          ?.getAttribute('data-ingredient-id') as string,
        10
      )
      setIngredientId(selectedIngredientId)
    }
  }

  const getUom: ReturnType<typeof useInputs>['onChange'] = (ev) => {
    const value = ev.currentTarget.value as unknown as string
    let unitOfMeasure: string | undefined = document
      .querySelector(`option[value='${value}']`)
      ?.getAttribute('data-ingredient-uom') as unknown as string

    if (typeof unitOfMeasure !== 'string') {
      unitOfMeasure = 'N/A'
      setDisableButton(true)
    }

    setUom(unitOfMeasure)
  }

  const sendIngredientStock: UseCreateIngredientStockReturn['sendIngredientStock'] = async (ev) => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!formElement.current?.checkValidity() || disableButton) return
    try {
      setDisableButton(true)
      const response = await postData(transformPostData({
        comment: inputsData.ingredient_stock_comment,
        ingredient_id: ingredientId,
        ingredient_qty: parseInt(
          inputsData.ingredient_qty,
          10
        )
      } as any))
      setDisableButton(false)
      console.log(response)
    } catch (error) {
      console.log(error)

      console.log('Errorrr')
    }
    // Update ingredient stock context
  }

  return {
    disableButton,
    inputsData,
    inputsErrors,
    onBlur,
    onChange,
    requestEnd,
    requestError,
    requestInit,
    sendIngredientStock,
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
  uom: string
  disableButton: boolean
  sendIngredientStock: (ev: MouseEvent<HTMLButtonElement>) => void
  requestError: boolean
  requestEnd: boolean
  requestInit: boolean
}

export default useCreateIngredientStock
