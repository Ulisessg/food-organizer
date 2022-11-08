import { NextApiRequest, NextApiResponse } from 'next'
import {
  createWeeklyMenu, getWeeklyMenu, updateWeeklyMenu
} from 'controllers/food_organizer_crud/weeklyMenuCRUD'
import { response } from 'controllers/response'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<response<string | any>>
): Promise<void> => {
  const { method } = req

  switch (method) {
    case 'POST':
      await createWeeklyMenu(
        req,
        res
      )
      break
    case 'GET':
      await getWeeklyMenu(
        req,
        res
      )
      break
    case 'PATCH':
      await updateWeeklyMenu(
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
