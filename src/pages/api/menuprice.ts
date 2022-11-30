import { NextApiRequest, NextApiResponse } from 'next'
import {
  createDailyMenuPrice, getDailyMenuPrices, updateDailyMenuPrice
} from 'controllers/food_organizer_crud/MenuPriceCRUD'
import { response } from 'controllers/response'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<response<string | any>>
): Promise<void> => {
  const { method } = req

  switch (method) {
    case 'POST':
      await createDailyMenuPrice(
        req,
        res
      )
      break
    case 'GET':
      await getDailyMenuPrices(
        req,
        res
      )
      break
    case 'PATCH':
      await updateDailyMenuPrice(
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
        error: false
      })
  }
}

export default handler
