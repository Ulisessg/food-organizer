import { NextApiRequest, NextApiResponse } from 'next'
import {
  createFoodPrice, getFoodPrices, updateFoodPrice
} from 'controllers/food_organizer_crud/foodPriceCRUD'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method } = req
  switch (method) {
    case 'POST':
      await createFoodPrice(
        req,
        res
      )
      break

    case 'GET':
      await getFoodPrices(
        req,
        res
      )
      break

    case 'PATCH':
      await updateFoodPrice(
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
