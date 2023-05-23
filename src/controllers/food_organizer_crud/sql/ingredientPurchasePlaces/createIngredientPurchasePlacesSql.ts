import IngredientPurchasePlaceValidations from 'models/ingredientPurchasePlaceValidations'
import { type TIngr_purchase_places } from '../ingredients/getIngredientsSql'
import prisma from 'lib/prisma'

const createIngredientPurchasesPlaceSql =
 async (ingrPurchasePlaces: CreateIngredientPurchasePlace): Promise<number> => {
   if (ingrPurchasePlaces.length > 10) throw new Error('not more of 10 purchase places')
   for (const purchasePlace of ingrPurchasePlaces) {
     IngredientPurchasePlaceValidations({
       creationDate: purchasePlace.creation_date as unknown as string,
       ingredientId: purchasePlace.ingredient_id,
       purchasePlaceId: purchasePlace.purchase_place_id
     })
   }
   const ingrPurchasePlacesRowsAffected = await prisma.ingredient_purchase_places.createMany({
     data: ingrPurchasePlaces,
     skipDuplicates: true
   })
   return ingrPurchasePlacesRowsAffected.count
 }

export const getIngredientPurchasePlacesCreatedSql = async (ingredientId: number):
Promise<TIngr_purchase_places> => {
  const ingrPPCreated = await prisma.$queryRaw<TIngr_purchase_places>`SELECT 
  ingredient_purchase_places.id, 
  ingredient_purchase_places.ingredient_id, 
  ingredient_purchase_places.purchase_place_id, 
  purchase_places.name AS purchase_place_name
  FROM ingredient_purchase_places 
  INNER JOIN purchase_places ON purchase_places.id = ingredient_purchase_places.purchase_place_id
  WHERE ingredient_purchase_places.ingredient_id = ${ingredientId};
        `

  return ingrPPCreated
}

export type CreateIngredientPurchasePlace = Array<{
  ingredient_id: number
  purchase_place_id: number
  creation_date: string
}>

export default createIngredientPurchasesPlaceSql
