import { type food_types } from 'controllers/dbTablesTypes'

export type GetFoodTypes = Array<{
  id: number
  name: string
}>

export interface CreateFoodType {
  name: string
}

export type UpdateFoodType = food_types
