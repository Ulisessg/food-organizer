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
import {
  type GetUnitsOfMeasureData
} from 'controllers/food_organizer_crud/nextjs/unitsOfMeasureCRUD'

// Electron bridges
declare global {
  interface Window {
    getUomData: GetUnitsOfMeasureData
    getDaysData: GetDays
    getFoodTypesData: GetFoodTypes
    getFoodsData: GetFoods
    getIngredientsStockData: GetIngredientStock
  }
}
