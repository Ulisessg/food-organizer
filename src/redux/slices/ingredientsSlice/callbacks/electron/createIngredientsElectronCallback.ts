/* eslint-disable @typescript-eslint/naming-convention */
import {
  type GetIngredients,
  type TIngr_purchase_places
} from 'controllers/sql/ingredients/types'
import { type CreateIngredientCallback } from '../../types'

const createIngredientsElectronCallback: CreateIngredientCallback = (ingredientData) => ({
  callbackData: ingredientData,
  createIngredientCallback: async () => {
    const ingredientCreated = await new Promise<GetIngredients[0]>((resolve, reject) => {
      try {
        const data = window.createIngredients(ingredientData.ingredient)
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
    return ingredientCreated
  },
  createIngredientPurchasePlaces: async (ingredient_id, purchasePlacesIds) => {
    const purchasePlacesCreated = await new Promise<TIngr_purchase_places>((resolve, reject) => {
      try {
        const data = window.createIngredientPurchasePlaces(
          ingredient_id,
          purchasePlacesIds
        )
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
    return purchasePlacesCreated
  }
})

export default createIngredientsElectronCallback
