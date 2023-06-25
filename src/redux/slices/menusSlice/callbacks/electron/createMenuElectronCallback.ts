import { type CreateMenuCallback } from '../../types'
import { type GetMenus } from 'controllers/food_organizer_crud/nextjs/MenuCRUD'

const createMenuElectronCallback: CreateMenuCallback = (menu) => async () => {
  const menuCreated = await new Promise<GetMenus[0]>((resolve, reject) => {
    try {
      const menuCreatedData = window.createMenus(menu)
      resolve(menuCreatedData)
    } catch (error) {
      reject(error)
    }
  })
  return menuCreated
}

export default createMenuElectronCallback
