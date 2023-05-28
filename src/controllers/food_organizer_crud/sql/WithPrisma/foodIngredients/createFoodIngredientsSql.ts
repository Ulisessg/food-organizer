import prisma from 'lib/prisma'

const createFoodIngredientsSql =
async (foodIngredients: CreateFoodIngredients): Promise<number> => {
  const createFoodIngredientsResult = await prisma.food_ingredients.createMany({
    data: foodIngredients,
    skipDuplicates: true
  })
  return createFoodIngredientsResult.count
}

export default createFoodIngredientsSql

export type CreateFoodIngredients = Array<{
  creation_date: string
  food_id: number
  ingredient_id: number
  ingredient_qty: number
}>
