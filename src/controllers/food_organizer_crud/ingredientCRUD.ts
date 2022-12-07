/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import ingredientValidations, { validations } from 'models/ingredientValidations'
import capitalize from 'utils/capitalize'
import type { ingredients } from '@prisma/client'
import prisma from 'lib/prisma'
import { response } from 'controllers/response'

export const createIngredient = async (
  req: CreateIngredient,
  res: NextApiResponse<response<string>>
): Promise<void> => {
  try {
    const { comment, creation_date, image, name, uom_id } = req.body
    ingredientValidations({
      comment,
      creationDate: creation_date as unknown as string,
      image,
      name,
      uomId: uom_id
    })
    await prisma.ingredients.create({
      data: {
        comment,
        creation_date,
        image,
        name: capitalize(name),
        uom_id
      }
    })
    res.status(200).send({
      data: 'ingredient created',
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
  req: NextApiRequest,
  res: NextApiResponse<response<GetIngredients[] | string>>
): Promise<void> => {
  try {
    const result = await prisma.$queryRaw<GetIngredients[]>`SELECT
ingredients.id AS ingredient_id,
ingredients.name AS ingredient_name,
ingredients.image AS image,
ingredients.comment AS comment,
units_of_measure.name AS uom_name,
JSON_ARRAYAGG(JSON_OBJECT(
'ingredient_purchase_place_id', ingredient_purchase_places.id,
'purchase_place_id', purchase_places.id,
'purchase_place_name', purchase_places.name
)) AS ingr_purchase_places
FROM ingredient_purchase_places
JOIN ingredients ON ingredients.id = ingredient_purchase_places.ingredient_id
JOIN purchase_places ON purchase_places.id = ingredient_purchase_places.purchase_place_id
JOIN units_of_measure ON units_of_measure.id = ingredients.uom_id
GROUP BY ingredient_name
ORDER BY ingredient_name;
`

    res.status(200).send({
      data: result,
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
  req: CreateIngredient,
  res: NextApiResponse<response<string>>
): Promise<void> => {
  try {
    const { comment, image, name, uom_id, id } = req.body
    validations.comment(comment)
    validations.image(image)
    validations.name(name)
    validations.uomId(uom_id)
    await prisma.ingredients.update({
      data: {
        comment, image, name: capitalize(name), uom_id
      },
      where: {
        id
      }
    })
    res.status(200).send({
      data: 'ingredient updated',
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

interface CreateIngredient extends NextApiRequest {
  body: ingredients
}
export type GetIngredients = Array<{
  ingredient_id: number
  ingredient_name: string
  image?: string
  comment?: string
  uom_name: string
  ingr_purchase_places: Array<
  {
    purchase_place_id: number
    purchase_place_name: string
    ingredient_purchase_place_id: number
  }>
}>
