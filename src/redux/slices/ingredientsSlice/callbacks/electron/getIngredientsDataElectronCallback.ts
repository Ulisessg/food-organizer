import { type GetIngredients } from 'controllers/sql/ingredients/types'
import { type TGetIngredientsDataCallback } from '../../types'

const getIngredientsDataElectronCallback: TGetIngredientsDataCallback = async () => {
  const data = await new Promise<GetIngredients>((resolve, reject) => {
    try {
      const response = window.getIngredientsData()
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
  return data
}

export default getIngredientsDataElectronCallback
