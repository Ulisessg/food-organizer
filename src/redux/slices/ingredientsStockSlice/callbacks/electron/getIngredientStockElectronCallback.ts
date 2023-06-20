import { type GetIngredientStock } from 'controllers/food_organizer_crud/sql/ingredientStock/types'
import { type TGetIngredientsStockCallback } from '../../types'

const getIngredientStockElectronCallback: TGetIngredientsStockCallback = async () => {
  console.log('From callback')

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
