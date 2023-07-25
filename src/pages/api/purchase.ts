import { type NextApiRequest, type NextApiResponse } from 'next'
import {
  createPurchasePlace,
  getPurchasePlaces,
  updatePurchasePlace
} from 'controllers/nextjs/purchasePlaceCRUD'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method } = req
  switch (method) {
    case 'POST':
      await createPurchasePlace(
        req,
        res
      )
      break
    case 'GET':
      await getPurchasePlaces(
        req,
        res
      )
      break
    case 'PATCH':
      await updatePurchasePlace(
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
