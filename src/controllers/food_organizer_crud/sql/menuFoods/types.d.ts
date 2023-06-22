import { type menu_foods } from 'controllers/food_organizer_crud/dbTablesTypes'

export type CreateMenuFoods = Array<Pick<menu_foods, 'food_id' | 'menu_id'>>
