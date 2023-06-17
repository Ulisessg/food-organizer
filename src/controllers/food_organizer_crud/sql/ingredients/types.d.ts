import { type ingredient_purchase_places } from '@prisma/client'

export type GetIngredients = Array<{
  ingredient_id: number
  ingredient_name: string
  image?: string
  comment?: string
  uom_name: string
  ingr_purchase_places?: TIngr_purchase_places
}>

export type TIngr_purchase_places = Array<
ingredient_purchase_places & { purchase_place_name: string }>
