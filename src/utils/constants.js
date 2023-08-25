const DbTablesNames = {
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

const defaultSelectValue = 'Selecciona una opcion'
const dateFormatUsed = 'DD-MM-YYYY'
const dayInMiliseconds = (1000 * 60 * 60 * 24)

module.exports = {
  DbTablesNames,
  dateFormatUsed,
  dayInMiliseconds,
  defaultSelectValue
}
