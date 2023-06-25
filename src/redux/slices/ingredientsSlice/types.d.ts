import {
  type GetIngredients,
  type TIngr_purchase_places
} from 'controllers/food_organizer_crud/sql/ingredients/types'
import {
  type CreateIngredient
} from 'controllers/food_organizer_crud/sql/ingredients/createIngredientsSql'

interface CreateIngredientThunkParam {
  ingredient: CreateIngredient
  purchasePlaces: number[]
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
export type CreateIngredientCallback =
  (ingredientData: CreateIngredientThunkParam) => {
    createIngredientCallback: () => Promise<GetIngredients[0]>
    createIngredientPurchasePlaces:
    (ingredient_id: number, purchasePlacesIds: number[]) => Promise<TIngr_purchase_places>
    callbackData: CreateIngredientThunkParam
  }
