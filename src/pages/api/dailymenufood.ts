import { NextApiRequest, NextApiResponse } from 'next'
import {
  createDailyMenuFoods, getDailyMenuFoods, updateDailyMenuFoods
} from 'controllers/food_organizer_crud/dailyMenuFoodsCRUD'
import { response } from 'controllers/response'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<response<string | any>>
): Promise<void> => {
  const { method } = req

  switch (method) {
    case 'POST':
      await createDailyMenuFoods(
        req,
        res
      )
      break
    case 'GET':
      await getDailyMenuFoods(
        req,
        res
      )
      break
    case 'PATCH':
      await updateDailyMenuFoods(
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
