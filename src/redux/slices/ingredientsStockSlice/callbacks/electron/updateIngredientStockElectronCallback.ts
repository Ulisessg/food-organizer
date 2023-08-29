import {
  type UpdateIngredientStockCallback,
  type UpdateIngredientStockCallbackReturn
} from '../../types'

const updateIngredientStockElectronCallback:
UpdateIngredientStockCallback = (ingredientStock) => async () => {
  const ingredientStockUpdated =
   await new Promise<UpdateIngredientStockCallbackReturn>((resolve, reject) => {
     try {
       const result = window.updateIngredientStock(ingredientStock)
       resolve(result)
     } catch (error) {
       reject(error)
     }
   })
  return ingredientStockUpdated
}

export default updateIngredientStockElectronCallback
