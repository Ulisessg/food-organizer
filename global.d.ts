import { type GetDays } from 'controllers/food_organizer_crud/sql/days/types'
import {
  type GetFoodTypes
} from 'controllers/food_organizer_crud/sql/foodTypes/types'
import {
  type GetFoods
} from 'controllers/food_organizer_crud/nextjs/foodsCRUD'
import {
  type GetIngredientStock
} from 'controllers/food_organizer_crud/sql/ingredientStock/types'
import { type GetIngredients } from 'controllers/food_organizer_crud/sql/ingredients/types'
import {
  type GetMenus
} from 'controllers/food_organizer_crud/nextjs/MenuCRUD'
import {
  type GetMenusIngredients
} from 'controllers/food_organizer_crud/sql/menus/getMenusIngredientsSql'
import {
  type GetUnitsOfMeasureData
} from 'controllers/food_organizer_crud/sql/menus/types'
import { type GetWeeklyMenu } from 'controllers/food_organizer_crud/sql/weeklyMenus/types'

// Electron bridges
declare global {
  interface Window {
    getUomData: () => GetUnitsOfMeasureData
    getDaysData: () => GetDays
    getFoodTypesData: () => GetFoodTypes
    getFoodsData: () => GetFoods
    getIngredientsStockData: () => GetIngredientStock
    getMenusData: () => GetMenus
    getWeeklyMenusData: () => GetWeeklyMenu
    getIngredientsData: () => GetIngredients
    getMenusIngredients: () => GetMenusIngredients
  }
}
