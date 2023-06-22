import { type ingredient_stock } from 'controllers/food_organizer_crud/dbTablesTypes'

export type GetIngredientStock = Array<{
  ingredient_stock_id: number
  ingredient_id: number
  comment: string | null
  ingredient_qty: number
  ingredient: string
  image: string | null
  uom: string
}>

export interface CreateIngredientStock extends Pick<
ingredient_stock, 'comment' | 'ingredient_id' | 'ingredient_qty'> {
}
