/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import type { NextApiRequest, NextApiResponse } from 'next'
import createIngredientPurchasePlaceSql, {
  type CreateIngredientPurchasePlace,
  getIngredientPurchasePlacesCreatedSql
} from '../sql/ingredientPurchasePlaces/createIngredientPurchasePlaceSql'
import { type TIngr_purchase_places } from '../sql/ingredients/getIngredientsSql'
import type { ingredient_purchase_places } from '@prisma/client'
import { type response } from 'controllers/response'

import updateIngredientPurchasePlaceSql
  from '../sql/ingredientPurchasePlaces/updateIngredientPurchasePlaceSql'

export const createIngredientPurchasePlace = async (
  req: CreateIngredientPurchasePlaceRequest,
  res: NextApiResponse<response<TIngr_purchase_places | string>>
): Promise<void> => {
  try {
    if (req.body.length === 0) {
      res.status(204).send({
        data: 'No purchase places in request',
        error: false
      })
      return
    }
    const ingredientPurchasePlacesCreation = await createIngredientPurchasePlaceSql(req.body)
    if (ingredientPurchasePlacesCreation === 0) {
      res.status(400).send({
        data: 'error creating purchase place',
        error: true
      })
    } else {
      const ingredientId = req.body[0].ingredient_id
      const ingredientPurchasePlacesCreated =
        await getIngredientPurchasePlacesCreatedSql(ingredientId)
      res.status(201).send({
        data: ingredientPurchasePlacesCreated,
        error: false
      })
    }
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
  res: NextApiResponse<response<ingredient_purchase_places | string>>
): Promise<void> => {
  try {
    const updateIngrPP = await updateIngredientPurchasePlaceSql(req.body)
    res.status(200).send({
      data: updateIngrPP,
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

interface CreateIngredientPurchasePlaceRequest extends NextApiRequest {
  body: CreateIngredientPurchasePlace
}

interface UpdateIngredientPurchasePlace extends NextApiRequest {
  body: ingredient_purchase_places
}
