import {
  type CreateFoodType,
  type GetFoodTypes
} from 'controllers/food_organizer_crud/sql/foodTypes/types'
import {
  type CreateIngredient,
  type GetIngredients,
  type TIngr_purchase_places
} from 'controllers/food_organizer_crud/sql/ingredients/types'
import {
  type CreateIngredientStock,
  type GetIngredientStock
} from 'controllers/food_organizer_crud/sql/ingredientStock/types'
import {
  type CreateMenu,
  type GetMenus
} from 'controllers/food_organizer_crud/nextjs/MenuCRUD'
import {
  type CreatePurchasePlace,
  type GetPurchasePlaces
} from 'controllers/food_organizer_crud/sql/purchasePlaces/types'
import {
  type CreateUom,
  type GetUnitsOfMeasureData
} from 'controllers/food_organizer_crud/sql/unitsOfMeasure/types'
import {
  type GetWeeklyMenu,
  type TCreateWeeklyMenus
} from 'controllers/food_organizer_crud/sql/weeklyMenus/types'
import {
  type CreateFood
} from 'redux/slices/foodsSlice/types'
import { type GetDays } from 'controllers/food_organizer_crud/sql/days/types'
import {
  type GetFoods
} from 'controllers/food_organizer_crud/nextjs/foodsCRUD'
import {
  type GetMenusIngredients
} from 'controllers/food_organizer_crud/sql/menus/getMenusIngredientsSql'
import { type units_of_measure } from '@prisma/client'

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

    createMenus: (menu: CreateMenu) => GetMenus[0]

    createFoods: (food: CreateFood) => GetFoods[0]
    createFoodType: (foodType: CreateFoodType) => GetFoodTypes[0]

    createIngredients: (ingredient: CreateIngredient) => GetIngredients[0]
    createIngredientsStock: (ingredientsStock: CreateIngredientStock) => GetIngredientStock[0]
    createUnitsOfMeausure: (unitOfMeasure: CreateUom) => units_of_measure

    createUnitsOfMeasureTypes: (uomType) => GetFoodTypes[0]
    createIngredientPurchasePlaces:
    (ingredientId: number, purchasePlacesid: number[]) => TIngr_purchase_places
    createWeeklyMenu: (weeklyMenu: TCreateWeeklyMenus) => GetWeeklyMenu[0]

    createPurchasePlaces: (purchasePlace: CreatePurchasePlace) => GetPurchasePlaces[0]
  }
}
