import { type GetMenusIngredients } from 'controllers/sql/menus/types'
import { type GetMenusIngredientsCallback } from '../../types'

const getMenusIngredientsElectronCallback: GetMenusIngredientsCallback = async () => {
  const data = await new Promise<GetMenusIngredients>((resolve, reject) => {
    try {
      const response = window.getMenusIngredients()
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
  return data
}

export default getMenusIngredientsElectronCallback
