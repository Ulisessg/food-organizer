import { type NextApiRequest, type NextApiResponse } from 'next'
import {
  createFood, getFoods, updateFood
} from 'controllers/food_organizer_crud/foodsCRUD'
import { type response } from 'controllers/response'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<response<any>>
): Promise<void> => {
  const { method } = req

  switch (method) {
    case 'POST':
      await createFood(
        req,
        res
      )
      break
    case 'GET':
      await getFoods(
        req,
        res
      )
      break
    case 'PATCH':
      await updateFood(
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
