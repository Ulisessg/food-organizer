import { type GetMenus } from 'controllers/nextjs/MenuCRUD'
import { type GetMenusDataCallback } from '../../types'

const getMenusDataElectronCallback: GetMenusDataCallback = async () => {
  const data = await new Promise<GetMenus>((resolve, reject) => {
    try {
      const response = window.getMenusData()
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
  return data
}

export default getMenusDataElectronCallback
