import { type NextApiRequest, type NextApiResponse } from 'next'
import {
  createIngredientStock,
  getIngredientsStock,
  updateIngredientStock
} from 'controllers/food_organizer_crud/ingredientStockCRUD'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method } = req
  switch (method) {
    case 'POST':
      await createIngredientStock(
        req,
        res
      )
      break
    case 'GET':
      await getIngredientsStock(
        req,
        res
      )
      break
    case 'PATCH':
      await updateIngredientStock(
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
