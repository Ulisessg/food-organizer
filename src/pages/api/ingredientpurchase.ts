import { type NextApiRequest, type NextApiResponse } from 'next'
import {
  createIngredientPurchasePlace,
  updateIngredientPurchasePlace
} from 'controllers/nextjs/ingredientPurchasePlacesCRUD'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method } = req
  switch (method) {
    case 'POST':
      await createIngredientPurchasePlace(
        req,
        res
      )
      break
    case 'PATCH':
      await updateIngredientPurchasePlace(
        req,
        res
      )
      break
    default:
      res.setHeader(
        'Allow',
        [
          'POST',
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
