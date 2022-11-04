import { NextApiRequest, NextApiResponse } from 'next'
import {
  createDailyMenu, getDailyMenus, updateDailyMenu
} from 'controllers/food_organizer_crud/dailyMenuCRUD'
import { response } from 'controllers/response'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<response<string | any>>
): Promise<void> => {
  const { method } = req

  switch (method) {
    case 'POST':
      await createDailyMenu(
        req,
        res
      )
      break
    case 'GET':
      await getDailyMenus(
        req,
        res
      )
      break
    case 'PATCH':
      await updateDailyMenu(
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
