import { type NextApiRequest, type NextApiResponse } from 'next'
import {
  getFoodIngredients,
  updateFoodIngredient
} from 'controllers/food_organizer_crud/foodIngredientsCRUD'
import { type response } from 'controllers/response'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<response<any>>
): Promise<void> => {
  const { method } = req
  switch (method) {
    case 'GET':
      await getFoodIngredients(
        req,
        res
      )
      break
    case 'PATCH':
      await updateFoodIngredient(
        req,
        res
      )
      break
    default:
      res.setHeader(
        'Allow',
        [
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
