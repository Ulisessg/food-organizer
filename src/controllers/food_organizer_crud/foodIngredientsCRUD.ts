/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import foodIngredientValidations, { validations } from 'models/foodIngredientValidations'
import type { food_ingredients } from '@prisma/client'
import prisma from 'lib/prisma'
import { response } from 'controllers/response'

export const createFoodIngredient = async (
  req: CreateFoodIngredient,
  res: NextApiResponse<response<string>>
): Promise<void> => {
  try {
    const { creation_date, food_id, ingredient_id } = req.body
    foodIngredientValidations({
      creationDate: creation_date as unknown as string,
      foodId: food_id,
      ingredientId: ingredient_id
    })
    await prisma.food_ingredients.create({
      data: {
        creation_date,
        food_id,
        ingredient_id
      }
    })
    res.status(201).send({
      data: 'food ingredient created',
      error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: 'error creating food ingredient',
      error: true
    })
  }
}

export const getFoodIngredients = async (
  _req: NextApiRequest,
  res: NextApiResponse<response<food_ingredients[] | string>>
): Promise<void> => {
  try {
    const result = await prisma.$queryRaw<food_ingredients[]>`SELECT
food_ingredients.id, food_ingredients.ingredient_id AS ingredient_id,
food_ingredients.food_id AS food_id,
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
  req: CreateFoodIngredient,
  res: NextApiResponse<response<string>>
): Promise<void> => {
  try {
    const { id, food_id, ingredient_id } = req.body
    validations.foodId(food_id)
    validations.ingredientId(ingredient_id)
    const rowsAffected: number = await prisma.$executeRaw`UPDATE IGNORE food_ingredients SET
food_id = ${food_id},
ingredient_id = ${ingredient_id}
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

interface CreateFoodIngredient extends NextApiRequest {
  body: food_ingredients
}
