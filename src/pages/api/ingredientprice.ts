import { NextApiRequest, NextApiResponse } from 'next'
import {
  createIngredientPrice, getIngredientPrices, updateIngredientPrice
} from 'controllers/food_organizer_crud/ingredientPricesCRUD'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method } = req
  switch (method) {
    case 'POST':
      await createIngredientPrice(
        req,
        res
      )
      break

    case 'GET':
      await getIngredientPrices(
        req,
        res
      )
      break

    case 'PATCH':
      await updateIngredientPrice(
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