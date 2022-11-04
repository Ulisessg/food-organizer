import { NextApiRequest, NextApiResponse } from 'next'
import {
  createIngredientPurchasePlace,
  getIngredientPurchasePlaces,
  updateIngredientPurchasePlace
} from 'controllers/food_organizer_crud/ingredientPurchasePlacesCRUD'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method } = req
  switch (method) {
    case 'POST':
      await createIngredientPurchasePlace(
        req,
        res
      )
      break
    case 'GET':
      await getIngredientPurchasePlaces(
        req,
        res
      )
      break
    case 'PATCH':
      await updateIngredientPurchasePlace(
        req,
        res
      )
      break
    default:
      res.setHeader(
        'Allow',
        [
          'POST',
          'GET',
          'PATCH'
        ]
      )
      res.status(405).send({
        data: 'method not allowed',
        error: true
      })
  }
}

export default handler
