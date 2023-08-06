import { type MouseEvent, useContext, useState } from 'react'
import { MultipleSelectsContext } from 'context/MultipleSelectsContext'
import { type RootState } from 'redux/store'
import { type TIngr_purchase_places } from 'controllers/sql/ingredients/types'
import { useInputs } from 'd-system'

const useUpdateIngredient = ({
  purchasePlacesInIngredient,
  ingredient
}: UseUpdateIngredientParams): UseUpdateIngredientReturn => {
  const [
    base64Image,
    setBase64Image
  ] = useState('')
  const {
    data,
    initialValues
  } = useContext(MultipleSelectsContext)

  const inputsHook = useInputs(
    {
      update_ingredient_comment: ingredient.comment ?? '',
      update_ingredient_image: ingredient.image ?? '',
      update_ingredient_name: ingredient.ingredient_name,
      update_ingredient_uom: `${ingredient.uom_id}`
    },
    true
  )

  console.log(inputsHook.inputsData.update_ingredient_image)
  const onClickSelectImage: UseUpdateIngredientReturn['onClickSelectImage'] = async (ev) => {
    ev.preventDefault()
    const image = await window.selectImage()
    inputsHook.updateInput(
      'update_ingredient_image',
      image.filePaths[0]
    )
    setBase64Image(image.base64Image)
  }

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

  return {
    ...inputsHook,
    base64Image,
    formHasChanged: formHasChanged(),
    onClickSelectImage
  }
}

export default useUpdateIngredient

interface UseUpdateIngredientReturn extends ReturnType<typeof useInputs<Inputs>> {
  formHasChanged: boolean
  onClickSelectImage: (ev: MouseEvent<HTMLInputElement>) => Promise<void>
  base64Image: string
}

interface UseUpdateIngredientParams {
  purchasePlacesInIngredient: TIngr_purchase_places
  ingredient: RootState['ingredients']['ingredients'][0]
}

type Inputs =
Record<'update_ingredient_comment'
| 'update_ingredient_name'
| 'update_ingredient_uom'
| 'update_ingredient_image', string>
