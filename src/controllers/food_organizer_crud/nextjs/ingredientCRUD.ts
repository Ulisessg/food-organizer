/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import createingredientSql, {
  type CreateIngredient,
  type CreateIngredientReturn
} from '../sql/ingredients/createIngredientsSql'
import getIngredientsSql, { type GetIngredients } from '../sql/ingredients/getIngredientsSql'
import updateIngredientSql, { type UpdateIngredient } from '../sql/ingredients/updateIngredientsSql'
import { type ingredients } from '@prisma/client'
import { type response } from 'controllers/response'

export const createIngredient = async (
  req: CreateIngredientRequest,
  res: NextApiResponse<response<CreateIngredientReturn | string>>
): Promise<void> => {
  // Implement a way to store images
  try {
    const ingredientCreated = await createingredientSql(req.body)

    res.status(201).send({
      data: ingredientCreated,
      error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: 'error creating ingredient',
      error: true
    })
  }
}

export const getIngredients = async (
  _req: NextApiRequest,
  res: NextApiResponse<response<GetIngredients | string>>
): Promise<void> => {
  try {
    const ingredientsData = await getIngredientsSql()

    res.status(200).send({
      data: ingredientsData,
      error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: 'error getting ingredients',
      error: true
    })
  }
}

// eslint-disable-next-line max-statements
export const updateIngredient = async (
  req: UpdateIngredientRequest,
  res: NextApiResponse<response<ingredients | string>>
): Promise<void> => {
  try {
    const ingredientUpdated = await updateIngredientSql(req.body)
    res.status(200).send({
      data: ingredientUpdated,
      error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: 'error updating ingredient',
      error: true
    })
  }
}

interface CreateIngredientRequest extends NextApiRequest {
  body: CreateIngredient
}
interface UpdateIngredientRequest extends NextApiRequest {
  body: UpdateIngredient
}
