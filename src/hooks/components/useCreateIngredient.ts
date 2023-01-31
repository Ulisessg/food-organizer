/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import { type MouseEvent, type RefObject, useContext, useEffect, useState } from 'react'
import useMultipleSelects, { type UseMultipleSelectsReturn } from 'hooks/useMultipleSelects'
import { type CreateIngredient } from 'controllers/food_organizer_crud/ingredientCRUD'
import {
  type CreateIngredientPurchasePlace
} from 'controllers/food_organizer_crud/ingredientPurchasePlacesCRUD'
import { type GetPurchasePlaces } from 'controllers/food_organizer_crud/purchasePlaceCRUD'
import { IngredientsContext } from 'context/ingredientsContext'
import dayjs from 'dayjs'
import { defaultSelectValue } from 'utils/constants'
import { type ingredients } from '@prisma/client'
import transformPostData from 'utils/transformPostData'
import { useInputs } from 'd-system'
import usePostRequest from 'hooks/usePostRequest'
import useValueIsRepeated from 'hooks/useValueIsRepeated'

const useCreateIngredient = (
  detailsElement: RefObject<HTMLDetailsElement>,
  formElement: RefObject<HTMLFormElement>
): UseCreateIngredientReturn => {
  const ingredientsContext = useContext(IngredientsContext)
  const {
    Component: PurchasePlacesSelect,
    data: purchasePlaces,
    resetMultipleSelect
  } = useMultipleSelects()
  const [
    resetForm,
    setResetForm
  ] = useState<boolean>(false)
  const [
    errorResponse,
    setErrorResponse
  ] = useState<string>('')
  const [
    requestInit,
    setRequestInit
  ] = useState<boolean>(false)
  const [
    requestEnd,
    setRequestEnd
  ] = useState<boolean>(false)
  const [
    requestError,
    setRequestError
    // Init error set as true for hide ingredient creation success (RequestResultStyles)
  ] = useState<boolean>(true)
  const [
    uomId,
    setUomId
  ] = useState<number>()
  const {
    postData: postIngredient,
    response: ingredientRequestResponse
  } = usePostRequest<CreateIngredient, ingredients>('/api/ingredient')
  const {
    postData: postIngredientPurchase
  } = usePostRequest<CreateIngredientPurchasePlace, string>('/api/ingredientpurchase')
  const {
    isRepeated: nameIsRepeated,
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
      !nameIsRepeated &&
      inputsData.ingredient_name.length >= 2 &&
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      !inputsErrors.ingredient_uom &&
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      !inputsData.ingredient_uom.includes(defaultSelectValue)) return true
    return false
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

  const sendIngredient: UseCreateIngredientReturn['sendIngredient'] = async () => {
    const allowSend: boolean = formIsValid()
    if (!allowSend) return
    setRequestInit(true)

    // First post ingredient to use database generated id to post related purchase places
    const ingredientCreated: ingredients | string = await postIngredient(transformPostData({
      comment: inputsData.ingredient_comment,
      creationDate: dayjs().toISOString(),
      image: null,
      name: inputsData.ingredient_name,
      uomId: uomId as number
    })).then((res) => res.data.data as ingredients)
      .catch((err) => {
        // eslint-disable-next-line max-len
        setErrorResponse('Ocurió un error creando el ingrediente pero no es tu culpa, intenta de nuevo mas tarde :).')
        setRequestEnd(true)
        setRequestError(true)
        setResetForm(true)
        return err
      })

    // No purchase places related
    if (purchasePlaces.valuesUsed.length === 0) {
      setRequestEnd(true)
      setRequestError(false)
      setResetForm(true)
      ingredientsContext.updateIngredients(
        ingredientCreated as ingredients,
        inputsData.ingredient_uom,
        purchasePlaces.valuesUsed
      )
      return
    }
    const creationDate: string = dayjs().toISOString()
    const purchasePlacesData: CreateIngredientPurchasePlace =
      purchasePlaces.valuesUsed.map((purchasePlace) => {
        const ppSelected = ingredientsContext
          .purchasePlaces.find((pp) => pp.name === purchasePlace) as GetPurchasePlaces[0]
        return {
          creation_date: creationDate,
          ingredient_id: ((ingredientCreated as ingredients).id),
          purchase_place_id: ppSelected.id
        }
      })
      // Add restriction for no more than 10 registers or delete restriction
    postIngredientPurchase(purchasePlacesData).then(() => {
      setRequestEnd(true)
      setRequestError(false)
      setResetForm(true)
      ingredientsContext.updateIngredients(
        ingredientCreated as ingredients,
        inputsData.ingredient_uom,
        purchasePlaces.valuesUsed
      )
    })
      .catch(() => {
        // eslint-disable-next-line max-len
        setErrorResponse('Ocurió un error agregando los lugares de compra pero no es tu culpa, intenta de nuevo mas tarde :).')
        setRequestEnd(true)
        setRequestError(true)
      })
  }

  useEffect(
    () => {
      const timer = setTimeout(
        () => {
          if (resetForm) {
            // Reset hook data
            setErrorResponse('')
            setRequestInit(false)
            setRequestEnd(false)
            setRequestError(true)
            setResetForm(false)
            // eslint-disable-next-line no-undefined
            setUomId(undefined)
            // Reset inputs
            resetMultipleSelect()
            restartInputs('all')
            formElement.current?.reset()
            detailsElement.current?.removeAttribute('open')
            detailsElement.current?.focus()
          }
        },
        3000
      )
      return () => {
        clearTimeout(timer)
      }
    },
    [
      detailsElement,
      formElement,
      resetForm,
      resetMultipleSelect,
      restartInputs
    ]
  )

  return {
    PurchasePlaces: PurchasePlacesSelect,
    disableButton: !formIsValid() || requestInit,
    errorResponse,
    ingredientRequestResponse: ingredientRequestResponse as ingredients,
    inputsData,
    inputsErrors,
    nameIsRepeated,
    onBlur,
    onChange: handleOnChange,
    requestEnd,
    requestError,
    requestInit,
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
  sendIngredient: (ev: MouseEvent<HTMLButtonElement>) => Promise<void>
  nameIsRepeated: boolean
  requestInit: boolean
  requestEnd: boolean
  requestError: boolean
  ingredientRequestResponse: ingredients
  errorResponse: string
}

interface InputsData {
  ingredient_comment: string
  ingredient_name: string
  ingredient_uom: string
}

type useInputsReturn = ReturnType<typeof useInputs>

export default useCreateIngredient
