
/** Array must be referenced as const or readonly */
export type TGetKeysFromArrayOfStrings<T extends readonly string[]> =
T extends readonly string[] ? T[number] : never

/** All update thunks must have this params */
export interface TUpdateThunkArgs<T> {
  data: T
  groupingElementIndex: number | null
  elementIndex: number | null
}

export type DbTablesNames =
  'days'
  | 'food_ingredients'
  | 'food_prices'
  | 'food_types'
  | 'foods'
  | 'ingredient_prices'
  | 'ingredient_purchase_places'
  | 'ingredients'
  | 'ingredient_stock'
  | 'menu_foods'
  | 'menu_prices'
  | 'menus'
  | 'purchase_places'
  | 'units_of_measure'
  | 'units_of_measure_types'
  | 'weekly_menu_days'
  | 'weekly_menu_prices'
  | 'weekly_menus'
