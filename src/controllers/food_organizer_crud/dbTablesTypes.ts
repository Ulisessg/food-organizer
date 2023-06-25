/**
 * Model food_ingredients
 *
 */
export interface food_ingredients {
  id: number
  food_id: number
  ingredient_id: number
  ingredient_qty: number | null

}

/**
 * Model food_prices
 *
 */
export interface food_prices {
  id: number
  value: number
  price_date: string
  food_id: number

}

/**
 * Model food_types
 *
 */
export interface food_types {
  id: number
  name: string

}

/**
 * Model foods
 *
 */
export interface foods {
  id: number
  name: string
  used_counter: number | null
  preparation_time: number
  score: number | null
  food_type_id: number
  image: string | null

}

/**
 * Model ingredient_prices
 *
 */
export interface ingredient_prices {
  id: number
  value: number
  price_date: string
  ingredient_id: number
  purchase_place_id: number
}

/**
 * Model ingredient_purchase_places
 *
 */
export interface ingredient_purchase_places {
  id: number
  ingredient_id: number
  purchase_place_id: number

}

/**
 * Model ingredient_stock
 *
 */
export interface ingredient_stock {
  id: number
  ingredient_id: number
  comment: string | null
  ingredient_qty: number

}

/**
 * Model ingredients
 *
 */
export interface ingredients {
  id: number
  name: string
  uom_id: number
  image: string | null

  comment: string | null
}

/**
 * Model purchase_places
 *
 */
export interface purchase_places {
  id: number
  name: string
  address: string | null

}

/**
 * Model units_of_measure
 *
 */
export interface units_of_measure {
  id: number
  name: string
  abbreviation: string
  uomt_id: number
}

/**
 * Model units_of_measure_types
 *
 */
export interface units_of_measure_types {
  id: number
  name: string
}

/**
 * Model weekly_menus
 *
 */
export interface weekly_menus {
  id: number
  creation_date: string
}

/**
 * Model days
 *
 */
export interface days {
  id: number
  name: string
}

/**
 * Model menu_foods
 *
 */
export interface menu_foods {
  id: number
  menu_id: number
  food_id: number
}

/**
 * Model menu_prices
 *
 */
export interface menu_prices {
  id: number
  value: number
  price_date: string
  menu_id: number

}

/**
 * Model menus
 *
 */
export interface menus {
  id: number
  comment: string | null
}

/**
 * Model weekly_menu_days
 *
 */
export interface weekly_menu_days {
  id: number
  weekly_menu_id: number
  day_id: number
  menu_id: number
}

/**
 * Model weekly_menu_prices
 *
 */
export interface weekly_menu_prices {
  id: number
  value: number
  price_date: string
  weekly_menu_id: number

}
