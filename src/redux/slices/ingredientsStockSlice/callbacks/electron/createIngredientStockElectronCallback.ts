import { type CreateIngredientStockCallback } from '../../types'
import {
  type GetIngredientStock
} from 'controllers/food_organizer_crud/sql/ingredientStock/types'

const createIngredientStockElectronCallback:
CreateIngredientStockCallback = (ingredient) => async () => {
  const result = await new Promise < GetIngredientStock[0]>((resolve, reject) => {
    try {
      const creation = window.createIngredientsStock(ingredient)
      resolve(creation)
    } catch (error) {
      reject(error)
    }
  })
  return result
}

export default createIngredientStockElectronCallback
