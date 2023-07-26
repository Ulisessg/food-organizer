import {
  type CreateFoodType,
  type GetFoodTypes
} from 'controllers/sql/foodTypes/types'
import {
  type CreateIngredient,
  type GetIngredients,
  type TIngr_purchase_places
} from 'controllers/sql/ingredients/types'
import {
  type CreateIngredientStock,
  type GetIngredientStock
} from 'controllers/sql/ingredientStock/types'
import {
  type CreateMenu,
  type GetMenus
} from 'controllers/nextjs/MenuCRUD'
import {
  type CreatePurchasePlace,
  type GetPurchasePlaces
} from 'controllers/sql/purchasePlaces/types'
import {
  type CreateUom,
  type GetUnitsOfMeasureData
} from 'controllers/sql/unitsOfMeasure/types'
import {
  type GetWeeklyMenu,
  type TCreateWeeklyMenus
} from 'controllers/sql/weeklyMenus/types'
import {
  type CreateFood
} from 'redux/slices/foodsSlice/types'
import { type GetDays } from 'controllers/sql/days/types'
import {
  type GetFoods
} from 'controllers/nextjs/foodsCRUD'
import {
  type GetMenusIngredients
} from 'controllers/sql/menus/getMenusIngredientsSql'
import { type OpenDialogReturnValue } from 'electron'
import { type units_of_measure } from '@prisma/client'
import { type units_of_measure_types } from 'controllers/dbTablesTypes'

// Electron bridges
declare global {
  interface Window {
    // Database
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

    updateUnitsOfMeasureTypes:
    (unitsOfMeasureTypes: units_of_measure_types) => units_of_measure_types

    updateUnitsOfMeasure: (unitsOfMeasure: units_of_measure) => units_of_measure

    // Os
    selectImage: () => Promise<OpenDialogReturnValue & {
      base64Image: string
    }>
    getBase64Image: (filePath) => Promise<string>
  }
}
