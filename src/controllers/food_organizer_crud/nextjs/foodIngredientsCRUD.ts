/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import createFoodIngredientsSql,
{ type CreateFoodIngredients } from '../sql/WithPrisma/foodIngredients/createFoodIngredientsSql'
import type { food_ingredients } from '@prisma/client'
import getFoodIngredientsSql from '../sql/WithPrisma/foodIngredients/getFoodIngredientsSql'
import { type response } from 'controllers/response'
import updateFoodIngredientSql from '../sql/WithPrisma/foodIngredients/updateFoodIngredientSql'

export const createFoodIngredient = async (foodIngredients:
CreateFoodIngredients): Promise<void> => {
  const foodIngredientsCreation = await createFoodIngredientsSql(foodIngredients)
  if (foodIngredientsCreation === 0) throw new Error('No food ingredients created')
}

export const getFoodIngredients = async (
  _req: NextApiRequest,
  res: NextApiResponse<response<food_ingredients[] | string>>
): Promise<void> => {
  try {
    const result = await getFoodIngredientsSql()
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
    const rowsAffected: number = await updateFoodIngredientSql(req.body)
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
