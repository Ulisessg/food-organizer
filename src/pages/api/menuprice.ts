import { type NextApiRequest, type NextApiResponse } from 'next'
import {
  createMenuPrice, getMenuPrice, updateMenuPrice
} from 'controllers/food_organizer_crud/nextjs/MenuPriceCRUD'
import { type response } from 'controllers/response'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<response<string | any>>
): Promise<void> => {
  const { method } = req

  switch (method) {
    case 'POST':
      await createMenuPrice(
        req,
        res
      )
      break
    case 'GET':
      await getMenuPrice(
        req,
        res
      )
      break
    case 'PATCH':
      await updateMenuPrice(
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
