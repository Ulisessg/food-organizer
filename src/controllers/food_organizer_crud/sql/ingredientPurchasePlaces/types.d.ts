import { type TIngr_purchase_places } from '../ingredients/types'

export type CreateIngredientPurchasePlace = Array<{
  ingredient_id: number
  purchase_place_id: number
}>

export type CreateIngredientPurchasePlaceFunc = (
  ingredientId: number, purchasePlacesIds: number[]) => TIngr_purchase_places
