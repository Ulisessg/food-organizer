/* eslint-disable max-params */
/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import { type AppDispatch, type RootState } from 'redux/store'
import { type MouseEvent, type RefObject, useContext, useState } from 'react'
import {
  createIngredientThunk,
  restartPostStatusThunk
} from 'redux/slices/ingredientsSlice/thunks'
import { useDispatch, useSelector } from 'react-redux'
import { MultipleSelectsContext } from 'context/MultipleSelectsContext'
import
createIngredientsElectronCallback
  from 'redux/slices/ingredientsSlice/callbacks/electron/createIngredientsElectronCallback'
import { defaultSelectValue } from 'utils/constants'
import { formIsValid } from './common'
import { useInputs } from 'd-system'
import useValueIsRepeated from 'hooks/useValueIsRepeated'

const useCreateIngredient = (
  detailsElement: RefObject<HTMLDetailsElement>,
  formElement: RefObject<HTMLFormElement>,
  selectUomElement: RefObject<HTMLSelectElement>
): UseCreateIngredientReturn => {
  const [
    base64Image,
    setBase64Image
  ] = useState<string>('')
  const multipleSelectsContext = useContext(MultipleSelectsContext)
  const ingredientsData = useSelector((state: RootState) => state.ingredients)
  const purchasePlaces = useSelector((state: RootState) => state.purchasePlaces.purchasePlaces)
  const dispatch: AppDispatch = useDispatch()
  const {
    isRepeated: ingredientNameIsRepeated,
    searchIsRepeated: searchNameIsRepeated
  } = useValueIsRepeated()
  const { inputsData, inputsErrors, onBlur, onChange, restartInputs, updateInput } = useInputs(
    {
      ingredient_comment: '',
      ingredient_image: '',
      ingredient_name: '',
      ingredient_uom: defaultSelectValue
    },
    true
  )

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
    const allowSend: boolean = formIsValid(
      inputsData,
      inputsErrors,
      ingredientNameIsRepeated
    )
    if (!allowSend) return
    const uomId: number = parseInt(
      (selectUomElement.current?.selectedOptions[0]
        ?.getAttribute('data-uom-id') as string),
      10
    )

    const purchasePlacesids: number[] = []
    multipleSelectsContext.data.valuesUsed.forEach((ppSelected) => {
      purchasePlacesids
        .push(purchasePlaces.find((pp) => pp.name === ppSelected)?.id as unknown as number)
    })

    const postResult = await dispatch(createIngredientThunk(createIngredientsElectronCallback({
      ingredient: {
        comment: inputsData.ingredient_comment,
        image: inputsData.ingredient_image,
        name: inputsData.ingredient_name,
        uomId
      },
      purchasePlaces: purchasePlacesids
    })))

    if ((postResult as any).createIngredientPurchasePlacesError === true &&
      (postResult as any).createIngredientsError === true) {
      return
    }
    // Reset inputs
    if (multipleSelectsContext.data.selects.length !== 0) {
      multipleSelectsContext.resetMultipleSelect()
    }
    restartInputs('all')
    formElement.current?.reset()
    detailsElement.current?.focus()
    void await dispatch(restartPostStatusThunk())
  }
  const selectImage: UseCreateIngredientReturn['selectImage'] = async (ev) => {
    ev.preventDefault()
    const image = await window.selectImage()
    if (!image.canceled) {
      console.log(image)

      updateInput(
        'ingredient_image',
        image.filePaths[0]
      )
      setBase64Image(image.base64Image)
    }
  }

  return {
    base64Image,
    createIngredient,
    disableButton: !formIsValid(
      inputsData,
      inputsErrors,
      ingredientNameIsRepeated
    ) || ingredientsData.postIsLoading,
    ingredientNameIsRepeated,
    inputsData,
    inputsErrors,
    onBlur,
    onChange: handleOnChange,
    selectImage
  }
}

interface UseCreateIngredientReturn {
  inputsData: InputsData
  inputsErrors: Record<keyof InputsData, boolean>
  onBlur: ReturnType<typeof useInputs>['onBlur']
  onChange: ReturnType<typeof useInputs>['onChange']
  selectImage: (ev: MouseEvent<HTMLInputElement>) => Promise<void>
  disableButton: boolean
  createIngredient: (ev: MouseEvent<HTMLButtonElement>) => Promise<void>
  ingredientNameIsRepeated: boolean
  base64Image: string
}

interface InputsData {
  ingredient_comment: string
  ingredient_name: string
  ingredient_uom: string
  ingredient_image: string
}

export default useCreateIngredient
