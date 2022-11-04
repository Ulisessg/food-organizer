/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import ingredientPurchasePlaceValidations, {
  validations
} from 'models/ingredientPurchasePlaceValidations'
import type { ingredient_purchase_places } from '@prisma/client'
import prisma from 'lib/prisma'
import { response } from 'controllers/response'

export const createIngredientPurchasePlace = async (
  req: CreateIngredientPurchasePlace,
  res: NextApiResponse<response<string>>
): Promise<void> => {
  try {
    for (const purchasePlace of req.body) {
      ingredientPurchasePlaceValidations({
        creationDate: purchasePlace.creation_date as unknown as string,
        ingredientId: purchasePlace.ingredient_id,
        purchasePlaceId: purchasePlace.purchase_place_id
      })
    }
    await prisma.ingredient_purchase_places.createMany({
      data: req.body,
      skipDuplicates: true
    })
    res.status(201).send({
      data: 'ingredient purchase place created',
      error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: 'error creating purchase place',
      error: true
    })
  }
}

export const getIngredientPurchasePlaces = async (
  req: NextApiRequest,
  res: NextApiResponse<response<ingredient_purchase_places[] | string>>
): Promise<void> => {
  try {
    const result = await prisma.$queryRaw<ingredient_purchase_places[]>`SELECT
ingredient_purchase_places.id, ingredient_purchase_places.ingredient_id AS ingredient_id,
ingredient_purchase_places.purchase_place_id AS purchase_place_id,
ingredients.name AS ingredient_name, purchase_places.name AS purchase_place_name
FROM ingredient_purchase_places
INNER JOIN ingredients ON ingredients.id = ingredient_id
INNER JOIN purchase_places ON purchase_places.id = purchase_place_id
`
    res.status(200).send({
      data: result,
      error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: 'error creating purchase place',
      error: true
    })
  }
}

export const updateIngredientPurchasePlace = async (
  req: UpdateIngredientPurchasePlace,
  res: NextApiResponse<response<string>>
): Promise<void> => {
  try {
    const { id, ingredient_id, purchase_place_id } = req.body
    validations.ingredientId(ingredient_id)
    validations.purchasePlaceId(purchase_place_id)
    await prisma.$executeRaw`UPDATE IGNORE ingredient_purchase_places SET
ingredient_id = ${ingredient_id},
purchase_place_id = ${purchase_place_id}
WHERE ingredient_purchase_places.id = ${id}
`
    res.status(200).send({
      data: 'purchase place for ingredient updated',
      error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: 'error updating purchase place',
      error: true
    })
  }
}

interface CreateIngredientPurchasePlace extends NextApiRequest {
  body: ingredient_purchase_places[]
}
interface UpdateIngredientPurchasePlace extends NextApiRequest {
  body: ingredient_purchase_places
}
