/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import ingredientValidations, { validations } from 'models/ingredientValidations'
import type {
  ingredient_purchase_places, ingredients
} from '@prisma/client'
import capitalize from 'utils/capitalize'
import prisma from 'lib/prisma'
import { type response } from 'controllers/response'

export const createIngredient = async (
  req: CreateIngredientRequest,
  res: NextApiResponse<response<CreateIngredientReturn | string>>
): Promise<void> => {
  // Implement a way to store images
  try {
    const { comment, creation_date, image, name, uomId } = req.body
    ingredientValidations({
      comment,
      creationDate: creation_date as unknown as string,
      image,
      name,
      uomId
    })
    const result = await prisma.ingredients.create({
      data: {
        comment,
        creation_date,
        image,
        name: capitalize(name),
        uom_id: uomId
      }
    })
    const uomName: string = await prisma.units_of_measure.findUniqueOrThrow({
      where: {
        id: result.uom_id
      }
    }).then((uom) => uom.name)

    res.status(201).send({
      data: {
        ...result,
        uomName
      },
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
  res: NextApiResponse<response<GetIngredients | string>>
): Promise<void> => {
  try {
    const result = await prisma.$queryRaw<GetIngredients>`SELECT 
    ingredients.id AS ingredient_id,
    ingredients.name AS ingredient_name,
    ingredients.image,
    ingredients.comment,
    units_of_measure.name AS uom_name,
    (SELECT
      JSON_ARRAYAGG(JSON_OBJECT(
        'ingredient_purchase_place_id', ingredient_purchase_places.id,
        'purchase_place_id', purchase_places.id,
        'purchase_place_name', purchase_places.name
        ))
        FROM ingredient_purchase_places
    INNER JOIN purchase_places ON purchase_places.id = ingredient_purchase_places.purchase_place_id
        WHERE ingredient_purchase_places.ingredient_id = ingredients.id
    ) AS ingr_purchase_places
    FROM ingredients
    INNER JOIN units_of_measure ON units_of_measure.id = ingredients.uom_id
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
  req: UpdateIngredientRequest,
  res: NextApiResponse<response<string>>
): Promise<void> => {
  try {
    const { comment, image, name, uomId, id } = req.body
    validations.comment(comment)
    validations.image(image)
    validations.name(name)
    validations.uomId(uomId)
    await prisma.ingredients.update({
      data: {
        comment, image, name: capitalize(name), uom_id: uomId
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

interface CreateIngredientRequest extends NextApiRequest {
  body: CreateIngredient
}
interface UpdateIngredientRequest extends NextApiRequest {
  body: UpdateIngredient
}

export interface CreateIngredient {
  comment: string | null
  creation_date: string
  image: string | null
  name: string
  uomId: number
}

export interface UpdateIngredient extends CreateIngredient {
  id: number
}

export interface CreateIngredientReturn extends ingredients {
  uomName: string
}

export type GetIngredients = Array<{
  ingredient_id: number
  ingredient_name: string
  image?: string
  comment?: string
  uom_name: string
  ingr_purchase_places?: TIngr_purchase_places
}>

export type TIngr_purchase_places = Array<
ingredient_purchase_places & { purchase_place_name: string }>
