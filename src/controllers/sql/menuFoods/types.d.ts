import { type menu_foods } from 'controllers/dbTablesTypes'

export type CreateMenuFoods = Array<Pick<menu_foods, 'food_id' | 'menu_id'>>
