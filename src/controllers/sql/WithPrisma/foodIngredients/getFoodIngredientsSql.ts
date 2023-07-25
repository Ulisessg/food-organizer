import { type food_ingredients } from '@prisma/client'
import prisma from 'lib/prisma'
const getFoodIngredientsSql = async (): Promise<food_ingredients[]> => {
  const foodIngredients = await prisma.$queryRaw<food_ingredients[]>`SELECT
  food_ingredients.id, food_ingredients.ingredient_id AS ingredient_id,
  food_ingredients.food_id AS food_id, food_ingredients.ingredient_qty AS ingredient_qty,
  foods.name AS food_name, ingredients.name AS ingredient_name, units_of_measure.name AS uom_name
  FROM food_ingredients
  INNER JOIN foods ON food_ingredients.food_id = foods.id
  INNER JOIN ingredients ON food_ingredients.ingredient_id = ingredients.id
  INNER JOIN units_of_measure ON ingredients.uom_id = units_of_measure.id
  `
  return foodIngredients
}

export default getFoodIngredientsSql
