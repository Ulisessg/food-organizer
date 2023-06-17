export type GetIngredientStock = Array<{
  ingredient_stock_id: number
  ingredient_id: number
  comment: string | null
  ingredient_qty: number
  ingredient: string
  image: string | null
  uom: string
}>
