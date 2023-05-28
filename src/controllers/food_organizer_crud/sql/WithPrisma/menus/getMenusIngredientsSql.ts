import prisma from 'lib/prisma'

const getMenusIngredientsSql = async (): Promise<GetMenusIngredients> => {
  const menusIngredients = await prisma.$queryRaw<GetMenusIngredients>`SELECT
  menu_foods.menu_id AS id,
  (SELECT JSON_ARRAYAGG(JSON_OBJECT(
      'ingredient_id', food_ingredients.ingredient_id,
          'ingredient_name', ingredients.name,
          'ingredient_qty', food_ingredients.ingredient_qty
      )) FROM food_ingredients
      INNER JOIN ingredients ON ingredients.id = food_ingredients.ingredient_id
      WHERE food_ingredients.food_id = menu_foods.food_id
  ) as ingredients
  FROM menu_foods
  GROUP BY menu_foods.menu_id
  ORDER BY menu_foods.menu_id asc;`
  return menusIngredients
}

export default getMenusIngredientsSql

export type GetMenusIngredients = Array<{
  id: number
  ingredients: Array<{
    ingredient_id: number
    ingredient_name: string
    ingredient_qty: number
  }>
}>
