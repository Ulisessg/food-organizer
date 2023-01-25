/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import { type NextApiRequest, type NextApiResponse } from 'next'
import ingredientStockValidations, { validations } from 'models/ingredientStockValidations'
import { type ingredient_stock } from '@prisma/client'
import prisma from 'lib/prisma'
import { type response } from 'controllers/response'

export const createIngredientStock = async (
  req: CreateUOM,
  res: NextApiResponse<response<ingredient_stock>>
): Promise<void> => {
  try {
    const { comment, ingredient_id, ingredient_qty, creation_date } = req.body
    ingredientStockValidations({
      comment,
      creationDate: creation_date as unknown as string,
      ingredientId: ingredient_id,
      ingredient_qty

    })
    const result = await prisma.ingredient_stock.create({
      data: {
        comment,
        creation_date,
        ingredient_id,
        ingredient_qty
      }
    })
    res.status(201).send({
      data: result, error: false
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
  res: NextApiResponse<response<GetIngredientStock>>
): Promise<void> => {
  try {
    const result = await prisma.$queryRaw<GetIngredientStock>`SELECT 
    ingredient_stock.id AS ingredient_stock_id,
      ingredient_stock.ingredient_id AS ingredient_id,
      ingredient_stock.comment,
      ingredient_stock.ingredient_qty,
      ingredients.name AS ingredient,
      ingredients.image,
      units_of_measure.name AS uom
  FROM ingredient_stock
  INNER JOIN ingredients ON ingredients.id = ingredient_stock.ingredient_id
  INNER JOIN units_of_measure ON units_of_measure.id = ingredients.uom_id
  ORDER BY ingredient;
`
    res.status(200).send({
      data: result,
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
  req: CreateUOM,
  res: NextApiResponse<response<string>>
): Promise<void> => {
  try {
    const { comment, ingredient_id, ingredient_qty, id } = req.body

    validations.comment(comment)
    validations.ingredientId(ingredient_id)

    await prisma.$executeRaw`UPDATE IGNORE ingredient_stock SET
ingredient_id = ${ingredient_id},
comment = ${comment},
ingredient_qty = ${ingredient_qty}
WHERE ingredient_stock.id = ${id}`
    res.status(200).send({
      data: 'successful update',
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

interface CreateUOM extends NextApiRequest {
  body: ingredient_stock
}

export type GetIngredientStock = Array<{
  ingredient_stock_id: number
  ingredient_id: number
  comment: string | null
  ingredient_qty: number
  ingredient: string
  image: string | null
  uom: string
}>
