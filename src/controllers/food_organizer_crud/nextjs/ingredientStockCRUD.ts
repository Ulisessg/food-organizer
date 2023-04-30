/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import { type NextApiRequest, type NextApiResponse } from 'next'
import createIngredientStockSql,
{ type CreateIngredientStock } from '../sql/ingredientStock/createIngredientStockSql'
import getIngredientsStockSql,
{ type GetIngredientStock } from '../sql/ingredientStock/getIngredientsStockSql'
import { type ingredient_stock } from '@prisma/client'
import { type response } from 'controllers/response'
import updateIngredientStockSql from '../sql/ingredientStock/updateIngredientStockSql'

export const createIngredientStock = async (
  req: CreateIngredientStockRequest,
  res: NextApiResponse<response<ingredient_stock | null>>
): Promise<void> => {
  try {
    const createIngredientStockResult = await createIngredientStockSql(req.body)
    res.status(201).send({
      data: createIngredientStockResult,
      error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: null,
      error: true
    })
  }
}

export const getIngredientsStock = async (
  _req: NextApiRequest,
  res: NextApiResponse<response<GetIngredientStock | null>>
): Promise<void> => {
  try {
    const ingredientsStock = await getIngredientsStockSql()
    res.status(200).send({
      data: ingredientsStock,
      error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: null,
      error: true
    })
  }
}

export const updateIngredientStock = async (
  req: UpdateIngredientStockRequest,
  res: NextApiResponse<response<ingredient_stock | string>>
): Promise<void> => {
  try {
    const updateIngredientStockResult = await updateIngredientStockSql(req.body)
    res.status(200).send({
      data: updateIngredientStockResult,
      error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: '',
      error: true
    })
  }
}

interface CreateIngredientStockRequest extends NextApiRequest {
  body: CreateIngredientStock
}

interface UpdateIngredientStockRequest extends NextApiRequest {
  body: ingredient_stock
}
