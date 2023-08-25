import { type GetIngredients } from 'controllers/sql/ingredients/types'
import { type UpdateIngredientCallback } from '../../types'

const updateIngredientsElectronCallback: UpdateIngredientCallback =
(ingredient, elementIndex) => async () => {
  const updateIngredientResult = await new Promise<GetIngredients[0]>((resolve, reject) => {
    try {
      resolve(window.updateIngredient(ingredient))
    } catch (error) {
      console.log(error)

      reject(error)
    }
  })
  return {
    ...updateIngredientResult,
    elementIndex
  }
}

export default updateIngredientsElectronCallback
