/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import type { food_ingredients } from '@prisma/client'
import prisma from 'lib/prisma'
import { type response } from 'controllers/response'
import { validations } from 'models/foodIngredientValidations'

export const createFoodIngredient = async (foodIngredients:
CreateFoodIngredients): Promise<void> => {
  const foodIngredientsCreation = await prisma.food_ingredients.createMany({
    data: foodIngredients,
    skipDuplicates: true
  })
  if (foodIngredientsCreation.count === 0) throw new Error('No food ingredients created')
}

export const getFoodIngredients = async (
  _req: NextApiRequest,
  res: NextApiResponse<response<food_ingredients[] | string>>
): Promise<void> => {
  try {
    const result = await prisma.$queryRaw<food_ingredients[]>`SELECT
food_ingredients.id, food_ingredients.ingredient_id AS ingredient_id,
food_ingredients.food_id AS food_id, food_ingredients.ingredient_qty AS ingredient_qty,
foods.name AS food_name, ingredients.name AS ingredient_name, units_of_measure.name AS uom_name
FROM food_ingredients
INNER JOIN foods ON food_ingredients.food_id = foods.id
INNER JOIN ingredients ON food_ingredients.ingredient_id = ingredients.id
INNER JOIN units_of_measure ON ingredients.uom_id = units_of_measure.id
`
    res.status(200).send({
      data: result,
      error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: 'error getting food ingredient',
      error: true
    })
  }
}

export const updateFoodIngredient = async (
  req: UpdateFoodIngredient,
  res: NextApiResponse<response<string>>
): Promise<void> => {
  try {
    const { id, food_id, ingredient_id, ingredient_qty } = req.body
    validations.foodId(food_id)
    validations.ingredientId(ingredient_id)
    const rowsAffected: number = await prisma.$executeRaw`UPDATE IGNORE food_ingredients SET
food_id = ${food_id},
ingredient_id = ${ingredient_id},
ingredient_qty = ${ingredient_qty}
WHERE food_ingredients.id = ${id}
`
    if (rowsAffected === 0) {
      res.status(400).send({
        data: 'error updationg food ingredient',
        error: true
      })
    } else {
      res.status(200).send({
        data: 'food ingredient updated',
        error: false
      })
    }
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: 'error updating food ingredient',
      error: true
    })
  }
}

interface UpdateFoodIngredient extends NextApiRequest {
  body: food_ingredients
}

export type CreateFoodIngredients = Array<{
  creation_date: string
  food_id: number
  ingredient_id: number
  ingredient_qty: number
}>
