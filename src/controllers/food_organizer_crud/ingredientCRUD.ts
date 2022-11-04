/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import ingredientValidations, { validations } from 'models/ingredientValidations'
import type { ingredients } from '@prisma/client'
import prisma from 'lib/prisma'
import { response } from 'controllers/response'

export const createIngredient = async (
  req: CreateIngredient,
  res: NextApiResponse<response<string>>
): Promise<void> => {
  try {
    const { comment, creation_date, image, name, prefered_purchase_place_id, uom_id } = req.body
    ingredientValidations({
      comment,
      creationDate: creation_date as unknown as string,
      image,
      name,
      preferredPurchasePlaceId: prefered_purchase_place_id,
      uomtId: uom_id
    })
    await prisma.ingredients.create({
      data: {
        comment,
        creation_date,
        image,
        name: name.toLowerCase(),
        prefered_purchase_place_id,
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
    // TABLES: ingredients, purchase places and units of measure
    const result = await prisma.$queryRaw<GetIngredients[]>`SELECT
ingredients.id, ingredients.name, ingredients.image,
ingredients.comment, purchase_places.name AS preferred_purchase_place_name,
units_of_measure.name AS uom_name, units_of_measure.abbreviation
FROM ingredients
INNER JOIN purchase_places ON ingredients.prefered_purchase_place_id = purchase_places.id
INNER JOIN units_of_measure ON ingredients.uom_id = units_of_measure.id
ORDER BY ingredients.creation_date
`
    res.status(200).send({
      data: result,
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

// eslint-disable-next-line max-statements
export const updateIngredient = async (
  req: CreateIngredient,
  res: NextApiResponse<response<string>>
): Promise<void> => {
  try {
    const { comment, image, name, prefered_purchase_place_id, uom_id, id } = req.body
    validations.comment(comment)
    validations.image(image)
    validations.name(name)
    validations.preferredPurchasePlaceId(prefered_purchase_place_id)
    validations.uomtId(uom_id)
    await prisma.ingredients.update({
      data: {
        comment, image, name, prefered_purchase_place_id, uom_id
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
interface GetIngredients {
  id: number
  name: string
  image: string | null
  comment: string
  preferred_purchase_place_name: string
  uom_name: string
  abbreviation: string
}
