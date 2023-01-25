import { type NextApiRequest, type NextApiResponse } from 'next'
import {
  createIngredient, getIngredients, updateIngredient
} from 'controllers/food_organizer_crud/ingredientCRUD'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method } = req
  switch (method) {
    case 'POST':
      await createIngredient(
        req,
        res
      )
      break
    case 'GET':
      await getIngredients(
        req,
        res
      )
      break
    case 'PATCH':
      await updateIngredient(
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
