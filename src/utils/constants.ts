export const defaultSelectValue = 'Selecciona una opcion'
export const dateFormatUsed = 'DD-MM-YYYY'
export const dayInMiliseconds = (1000 * 60 * 60 * 24)

export type TDaysOfTheWeek = 'sunday'
| 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday'

export type TDaysOfTheWeekInSpanish =
'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sábado' | 'domingo'

export const NativeRoutes = {
  adminFoods: '/admin/foods',
  adminIngredients: '/admin/ingredients',
  adminMenus: '/admin/menu',
  adminStock: '/admin/stock',
  adminUnits: '/admin/units',
  adminWeeklyMenus: '/admin/week'
}

export const DbTablesNames = {
  days: 'days',
  foodIngredients: 'food_ingredients',
  foodPrices: 'food_prices',
  foodTypes: 'food_types',
  foods: 'foods',
  ingredientPrices: 'ingredient_prices',
  ingredientPurchasePlaces: 'ingredient_purchase_places',
  ingredients: 'ingredients',
  ingredientsStock: 'ingredient_stock',
  menuFoods: 'menu_foods',
  menuPrices: 'menu_prices',
  menus: 'menus',
  purchasePlaces: 'purchase_places',
  unitsOfMeasure: 'units_of_measure',
  unitsOfMeasureTypes: 'units_of_measure_types',
  weeklyMenuDays: 'weekly_menu_days',
  weeklyMenuPrices: 'weekly_menu_prices',
  weeklyMenus: 'weekly_menus'
}

/**
 * Includes file extension (.db)
 */
export const dbName = 'food_organizer.db'
