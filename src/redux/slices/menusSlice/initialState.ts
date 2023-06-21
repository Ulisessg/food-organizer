import { type TMenuState } from './types'

const initialState: TMenuState = {
  createMenuEnd: false,
  createMenuError: false,
  createMenuIsLoading: false,
  createMenuSuccess: false,
  errorCreatingMenu: false,
  errorCreatingMenuFoods: false,
  getMenusDataEnd: false,
  getMenusDataError: false,
  getMenusDataIsLoading: false,
  getMenusDataSuccess: false,
  getMenusIngredientsEnd: false,
  getMenusIngredientsError: false,
  getMenusIngredientsIsLoading: false,
  getMenusIngredientsSuccess: false,
  menus: [],
  menusIngredients: []
}

export default initialState
