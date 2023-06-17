import { type NextApiRequest, type NextApiResponse } from 'next'
import {
  createWeeklyMenuPrice, getWeeklyMenuPrices, updateWeeklyMenuPrice
} from 'controllers/food_organizer_crud/nextjs/weeklyMenuPriceCRUD'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method } = req
  switch (method) {
    case 'POST':
      await createWeeklyMenuPrice(
        req,
        res
      )
      break

    case 'GET':
      await getWeeklyMenuPrices(
        req,
        res
      )
      break

    case 'PATCH':
      await updateWeeklyMenuPrice(
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
