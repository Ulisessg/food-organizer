import { type GetMenus } from 'controllers/food_organizer_crud/nextjs/MenuCRUD'
import {
  type GetMenusIngredients
} from 'controllers/food_organizer_crud/sql/menus/types'

export interface TMenuState {
  menus: GetMenus
  menusIngredients: GetMenusIngredients
  // Get data
  getMenusDataIsLoading: boolean
  getMenusDataEnd: boolean
  getMenusDataError: boolean
  getMenusDataSuccess: boolean
  // Get Menus ingredients
  getMenusIngredientsIsLoading: boolean
  getMenusIngredientsEnd: boolean
  getMenusIngredientsError: boolean
  getMenusIngredientsSuccess: boolean

  // Post data
  createMenuIsLoading: boolean
  createMenuEnd: boolean
  createMenuError: boolean
  createMenuSuccess: boolean

  errorCreatingMenu: boolean
  errorCreatingMenuFoods: boolean
}

export interface CreateMenuReject {
  createMenuError: boolean
  createMenuFoodsError: boolean
}

export type GetMenusDataCallback = () => Promise<GetMenus>
export type GetMenusIngredientsCallback = () => Promise<GetMenusIngredients>
