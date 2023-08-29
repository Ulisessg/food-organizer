import { type GetIngredientStock } from 'controllers/sql/ingredientStock/types'
import { type TGetIngredientsStockCallback } from '../../types'

const getIngredientStockElectronCallback: TGetIngredientsStockCallback = async () => {
  const data = await new Promise<GetIngredientStock>((resolve, reject) => {
    try {
      const result = window.getIngredientsStockData()
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
  return data
}

export default getIngredientStockElectronCallback
