import { type NextApiRequest, type NextApiResponse } from 'next'
import {
  createUOM,
  getUOM,
  updateUOM
} from 'controllers/food_organizer_crud/nextjs/unitsOfMeasureCRUD'

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { method } = req
  switch (method) {
    case 'POST':
      await createUOM(
        req,
        res
      )
      break
    case 'GET':
      await getUOM(
        req,
        res
      )
      break
    case 'PATCH':
      await updateUOM(
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
        data: null,
        error: true
      })
  }
}

export default handler
