import { type CreateWeeklyMenusCallback } from '../../types'
import { type GetWeeklyMenu } from 'controllers/sql/weeklyMenus/types'

const createWeeklyMenusElectronCallback: CreateWeeklyMenusCallback = (weeklyMenu) => async () => {
  const weeklyMenuCreated = await new Promise<GetWeeklyMenu[0]>((resolve, reject) => {
    try {
      const weeklyMenuCreatedData = window.createWeeklyMenu(weeklyMenu)
      resolve(weeklyMenuCreatedData)
    } catch (error) {
      reject(error)
    }
  })
  return weeklyMenuCreated
}

export default createWeeklyMenusElectronCallback
