/* eslint-disable @typescript-eslint/naming-convention */
import { type ingredient_purchase_places } from '@prisma/client'
import prisma from 'lib/prisma'
import {
  validations
} from 'models/ingredientPurchasePlaceValidations'

const updateIngredientPurchasePlaceSql = async (ingrPP: ingredient_purchase_places):
Promise<ingredient_purchase_places> => {
  const { id, ingredient_id, purchase_place_id } = ingrPP
  validations.ingredientId(ingredient_id)
  validations.purchasePlaceId(purchase_place_id)
  const updateResult = await prisma.ingredient_purchase_places.update({
    data: {
      ingredient_id,
      purchase_place_id
    },
    where: {
      id
    }
  })
  return updateResult
}

export default updateIngredientPurchasePlaceSql
