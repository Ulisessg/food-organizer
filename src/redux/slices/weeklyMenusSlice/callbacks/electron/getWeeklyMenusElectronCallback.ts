import { type GetWeeklyMenu } from 'controllers/food_organizer_crud/sql/weeklyMenus/types'
import { type GetWeeklyMenusCallback } from '../../types'

const getWeeklyMenusElectronCallback: GetWeeklyMenusCallback = async () => {
  const weeklyMenus = await new Promise<GetWeeklyMenu>((resolve, reject) => {
    try {
      const weeklyMenusData = window.getWeeklyMenusData()
      resolve(weeklyMenusData)
    } catch (error) {
      reject(error)
    }
  })
  return weeklyMenus
}
export default getWeeklyMenusElectronCallback
