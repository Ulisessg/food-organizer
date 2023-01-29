/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import { type MouseEvent, useContext, useState } from 'react'
import useMultipleSelects
, { type UseMultipleSelectsReturn } from 'hooks/useMultipleSelects'
import {
  type CreateIngredient
} from 'controllers/food_organizer_crud/ingredientCRUD'
import {
  type CreateIngredientPurchasePlace
} from
  'controllers/food_organizer_crud/ingredientPurchasePlacesCRUD'
import {
  type GetPurchasePlaces
} from 'controllers/food_organizer_crud/purchasePlaceCRUD'
import { IngredientsContext } from 'context/ingredientsContext'
import dayjs from 'dayjs'
import { defaultSelectValue } from 'utils/constants'
import { type ingredients } from '@prisma/client'
import transformPostData from 'utils/transformPostData'
import { useInputs } from 'd-system'
import usePostRequest from 'hooks/usePostRequest'
import useValueIsRepeated from 'hooks/useValueIsRepeated'

const useCreateIngredient = (): UseCreateIngredientReturn => {
  const { Component: PurchasePlacesSelect, data: purchasePlaces } = useMultipleSelects()
  const ingredientsContext = useContext(IngredientsContext)
  const [
    uomId,
    setUomId
  ] = useState<number>()
  const {
    error: ingredientRequestError,
    postData: postIngredient,
    requestEnd: ingredientRequestEnd,
    requestInit: ingredientRequestInit,
    response: ingredientRequestResponse
  } = usePostRequest<CreateIngredient, ingredients>('/api/ingredient')
  const {
    error: ingredientPurchaseRequestError,
    postData: postIngredientPurchase,
    requestEnd: ingredientPurchaseRequestEnd,
    requestInit: ingredientPurchaseRequestInit,
    response: ingredientPurchaseRequestResponse
  } = usePostRequest<CreateIngredientPurchasePlace, string>('/api/ingredientpurchase')
  const {
    isRepeated: nameIsRepeated,
    searchIsRepeated: searchNameIsRepeated
  } = useValueIsRepeated()
  const { inputsData, inputsErrors, onBlur, onChange } = useInputs(
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
      !nameIsRepeated &&
      inputsData.ingredient_name.length >= 2 &&
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      !inputsErrors.ingredient_uom &&
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      !inputsData.ingredient_uom.includes(defaultSelectValue)) return true
    return false
  }

  const sendIngredient: UseCreateIngredientReturn['sendIngredient'] = () => {
    void (async () => {
      const allowSend: boolean = formIsValid()
      if (!allowSend) return
      // Post ingredient to use database generated id to post related purchase places
      try {
        const res = await postIngredient(transformPostData({
          comment: inputsData.ingredient_comment,
          creationDate: dayjs().toISOString(),
          image: null,
          name: inputsData.ingredient_name,
          uomId: uomId as number
        }))
        // No related purchase places
        if (purchasePlaces.valuesUsed.length === 0) return
        const ingredientCreated: ingredients = res.data.data as ingredients
        const creationDate: string = dayjs().toISOString()
        const purchasePlacesData: CreateIngredientPurchasePlace =
        purchasePlaces.valuesUsed.map((purchasePlace) => {
          const ppSelected = ingredientsContext
            .purchasePlaces.find((pp) => pp.name === purchasePlace) as GetPurchasePlaces[0]
          return {
            creation_date: creationDate,
            ingredient_id: ingredientCreated.id,
            purchase_place_id: ppSelected.id
          }
        })
        // Add restriction for no more than 10 registers or delete restriction
        await postIngredientPurchase(purchasePlacesData)
      } catch (error) {
        console.log(error)
      }
    })()
  }

  const handleOnChange: typeof onChange = (ev) => {
    onChange(ev)
    searchNameIsRepeated(
      ingredientsContext.ingredients,
      'ingredient_name',
      ev.currentTarget.value
    )
    // Select unit of measure type
    if (ev.currentTarget.id === 'select_uom') {
      const select = ev.currentTarget as HTMLSelectElement
      const opt = select.selectedOptions['0']
      setUomId(parseInt(
        opt.getAttribute('data-uom-id') as string,
        10
      ))
    }
  }

  return {
    PurchasePlaces: PurchasePlacesSelect,
    disableButton: !formIsValid(),
    ingredientPurchaseRequestEnd,
    ingredientPurchaseRequestError,
    ingredientPurchaseRequestInit,
    ingredientPurchaseRequestResponse,
    ingredientRequestEnd,
    ingredientRequestError,
    ingredientRequestInit,
    ingredientRequestResponse: ingredientRequestResponse as ingredients,
    inputsData,
    inputsErrors,
    nameIsRepeated,
    onBlur,
    onChange: handleOnChange,
    sendIngredient
  }
}

interface UseCreateIngredientReturn {
  inputsData: InputsData
  inputsErrors: Record<keyof InputsData, boolean>
  onBlur: useInputsReturn['onBlur']
  onChange: useInputsReturn['onChange']
  PurchasePlaces: UseMultipleSelectsReturn['Component']
  disableButton: boolean
  sendIngredient: (ev: MouseEvent<HTMLButtonElement>) => void
  nameIsRepeated: boolean
  ingredientRequestInit: boolean
  ingredientRequestEnd: boolean
  ingredientRequestResponse: ingredients
  ingredientRequestError: boolean
  ingredientPurchaseRequestInit: boolean
  ingredientPurchaseRequestEnd: boolean
  ingredientPurchaseRequestResponse: string
  ingredientPurchaseRequestError: boolean
}

interface InputsData {
  ingredient_comment: string
  ingredient_name: string
  ingredient_uom: string
}

type useInputsReturn = ReturnType<typeof useInputs>

export default useCreateIngredient
