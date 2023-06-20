import { type TIngredientsState } from './types'

const initialState: TIngredientsState = {
  getIngredientsEnd: false,
  getIngredientsError: false,
  getIngredientsSuccess: false,
  getIsLoading: false,
  ingredients: [],
  postEnd: false,
  postError: false,
  postIngredientPurchaseEnd: false,
  postIngredientPurchaseError: false,
  postIngredientPurchaseIsLoading: false,
  postIngredientPurchaseSuccess: false,
  postIsLoading: false,
  postSuccess: false
}

export default initialState
