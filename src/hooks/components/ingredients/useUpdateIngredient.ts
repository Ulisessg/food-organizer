/* eslint-disable max-statements */
import { type AppDispatch, type RootState } from 'redux/store'
import { type MouseEvent, useContext } from 'react'
import {
  restartUpdateIngredientStatus,
  updateIngredientThunk
} from 'redux/slices/ingredientsSlice/thunks'
import { useDispatch, useSelector } from 'react-redux'
import { MultipleSelectsContext } from 'context/MultipleSelectsContext'
import { type TIngr_purchase_places } from 'controllers/sql/ingredients/types'
import setFocusInElement from 'utils/setFocusInElement'
import
updateIngredientsElectronCallback
  from 'redux/slices/ingredientsSlice/callbacks/electron/updateIngredientsElectronCallback'
import { useInputs } from 'd-system'
import useValueIsRepeated from 'hooks/useValueIsRepeated'

const useUpdateIngredient = ({
  purchasePlacesInIngredient,
  ingredient,
  ingredientIndex
}: UseUpdateIngredientParams): UseUpdateIngredientReturn => {
  const dispatch: AppDispatch = useDispatch()
  const {
    data,
    initialValues,
    resetMultipleSelect,
    setCurrentValuesAsInitialValues
  } = useContext(MultipleSelectsContext)

  const ingredients = useSelector((state: RootState) => state.ingredients.ingredients)

  const {
    isRepeated,
    resetIsRepeated,
    searchIsRepeated
  } = useValueIsRepeated(ingredient.ingredient_name)
  const inputsHook = useInputs(
    {
      update_ingredient_comment: ingredient.comment ?? '',
      update_ingredient_image: ingredient.image ?? '',
      update_ingredient_name: ingredient.ingredient_name,
      update_ingredient_uom: `${ingredient.uom_id}`
    },
    true,
    (ev, ingredientName) => {
      if (ev.currentTarget.name === 'update_ingredient_name') {
        searchIsRepeated(
          ingredients,
          'ingredient_name',
          ingredientName
        )
      }
      return ingredientName
    }
  )

  const restartForm = (): void => {
    inputsHook.restartInputs('all')
    resetIsRepeated()
    resetMultipleSelect()
    setFocusInElement('update_ingredient_name')
  }

  const onClickSelectImage: UseUpdateIngredientReturn['onClickSelectImage'] = async (ev) => {
    ev.preventDefault()
    const image = await window.selectImage('ingredients')
    if (!image.canceled) {
      inputsHook.updateInput(
        'update_ingredient_image',
        image.fileName
      )
      inputsHook.checkFormValidity()
    }
  }

  const formIsValid = (): boolean => !isRepeated &&
  inputsHook.formIsValid &&
  data.selects.length === data.valuesUsed.length

  const formHasChanged = (): boolean => {
    const purchasePlacesAddedOrDeleted = data.selects.length !== purchasePlacesInIngredient.length
    if (purchasePlacesAddedOrDeleted) return true

    const { inputsData, inputsInitialValues } = inputsHook
    const inputsHasChanged = (
      inputsData
        .update_ingredient_comment !== inputsInitialValues.get('update_ingredient_comment') ||
      inputsData.update_ingredient_image !== inputsInitialValues.get('update_ingredient_image') ||
      inputsData.update_ingredient_name !== inputsInitialValues.get('update_ingredient_name') ||
      inputsData.update_ingredient_uom !== inputsInitialValues.get('update_ingredient_uom')
    )
    if (inputsHasChanged) return true

    const purchasePlacesHasChanged = data
      .selects
      .some((select) => select.value !== (initialValues.get(select.selectId) as string))

    if (purchasePlacesHasChanged) return true
    return false
  }

  const updateIngredient = async (): Promise<void> => {
    const { inputsData } = inputsHook
    const updateIngredientResult = await
    dispatch(updateIngredientThunk(updateIngredientsElectronCallback(
      {
        comment: inputsData.update_ingredient_comment,
        image: inputsData.update_ingredient_image,
        ingr_purchase_places: data.valuesUsed,
        ingredient_id: ingredient.ingredient_id,
        ingredient_name: inputsData.update_ingredient_name,
        uom_id: parseInt(
          inputsData.update_ingredient_uom,
          10
        )
      },
      ingredientIndex
    )))
    if (updateIngredientResult.meta.requestStatus === 'fulfilled') {
      setFocusInElement('update_ingredient_name')
      const { updateInitialValue, restartInputs } = inputsHook
      updateInitialValue(
        'update_ingredient_comment',
        inputsData.update_ingredient_comment
      )
      updateInitialValue(
        'update_ingredient_image',
        inputsData.update_ingredient_image
      )
      updateInitialValue(
        'update_ingredient_name',
        inputsData.update_ingredient_name
      )
      updateInitialValue(
        'update_ingredient_uom',
        inputsData.update_ingredient_uom
      )
      restartInputs('all')
      setCurrentValuesAsInitialValues()
      await dispatch(restartUpdateIngredientStatus())
    }
  }

  return {
    ...inputsHook,
    formHasChanged: formHasChanged(),
    formIsValid: formIsValid(),
    onClickSelectImage,
    restartForm,
    updateIngredient
  }
}

export default useUpdateIngredient

interface UseUpdateIngredientReturn extends ReturnType<typeof useInputs<Inputs>> {
  formHasChanged: boolean
  onClickSelectImage: (ev: MouseEvent<HTMLInputElement>) => Promise<void>
  restartForm: () => void
  updateIngredient: () => Promise<void>
}

interface UseUpdateIngredientParams {
  purchasePlacesInIngredient: TIngr_purchase_places
  ingredient: RootState['ingredients']['ingredients'][0]
  ingredientIndex: number
}

type Inputs =
Record<'update_ingredient_comment'
| 'update_ingredient_name'
| 'update_ingredient_uom'
| 'update_ingredient_image', string>
