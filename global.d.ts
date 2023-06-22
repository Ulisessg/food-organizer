import {
  type CreateIngredient,
  type GetIngredients
} from 'controllers/food_organizer_crud/sql/ingredients/types'
import {
  type CreateIngredientStock,
  type GetIngredientStock
} from 'controllers/food_organizer_crud/sql/ingredientStock/types'
import {
  type CreateUom,
  type GetUnitsOfMeasureData
} from 'controllers/food_organizer_crud/sql/unitsOfMeasure/types'
import {
  type CreateFood
} from 'redux/slices/foodsSlice/types'
import { type GetDays } from 'controllers/food_organizer_crud/sql/days/types'
import {
  type GetFoodTypes
} from 'controllers/food_organizer_crud/sql/foodTypes/types'
import {
  type GetFoods
} from 'controllers/food_organizer_crud/nextjs/foodsCRUD'
import {
  type GetMenus
} from 'controllers/food_organizer_crud/nextjs/MenuCRUD'
import {
  type GetMenusIngredients
} from 'controllers/food_organizer_crud/sql/menus/getMenusIngredientsSql'
import {
  type GetPurchasePlaces
} from 'controllers/food_organizer_crud/sql/purchasePlaces/types'
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
    getPurchasePlacesData: () => GetPurchasePlaces

    createFoods: (food: CreateFood) => GetFoods[0]
    createIngredients: (ingredient: CreateIngredient) => GetIngredients[0]
    createIngredientsStock: (ingredientsStock: CreateIngredientStock) => GetIngredientStock[0]
    createUnitsOfMeausure: (unitOfMeasure: CreateUom) =>
    GetUnitsOfMeasureData['unitsOfMeasureGroupedByType'][0]

    createUnitsOfMeasureTypes: (uomType) => GetFoodTypes[0]
  }
}
