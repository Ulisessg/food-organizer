import {
  type CreateIngredient
} from 'controllers/food_organizer_crud/sql/ingredients/createIngredientsSql'
import { type GetIngredients } from 'controllers/food_organizer_crud/sql/ingredients/types'
import { type RootState } from 'redux/store'

interface CreateIngredientThunkParam {
  ingredient: CreateIngredient
  purchasePlacesSelected: string[]
  purchasePlaces: RootState['purchasePlaces']['purchasePlaces']
}

interface TIngredientsState {
  ingredients: GetIngredients

  /** Get ingredient request init */
  getIsLoading: boolean

  /** Get ingredient request have an error */
  getIngredientsError: boolean

  /** Get ingredient request ends */
  getIngredientsEnd: boolean

  /** Get ingredient request ends successfully */
  getIngredientsSuccess: boolean

  /** Ingredient creation request init */
  postIsLoading: boolean

  /** Ingredient creation request ends */
  postEnd: boolean

  /** Ingredient creation request have an error */
  postError: boolean

  /** Ingredient creation request ends successfull */
  postSuccess: boolean

  /** Ingredient purchase places creation init */
  postIngredientPurchaseIsLoading: boolean

  /** Ingredient purchase places creation ends */
  postIngredientPurchaseEnd: boolean

  /** Ingredient purchase places creation error */
  postIngredientPurchaseError: boolean

  /** Ingredient purchase places creation ends successfull */
  postIngredientPurchaseSuccess: boolean
}

export type TGetIngredientsDataCallback = () => Promise<GetIngredients>
