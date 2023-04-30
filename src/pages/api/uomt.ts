import { type NextApiRequest, type NextApiResponse } from 'next'
import {
  createUnitOfMeasureType, updateUOMT
} from 'controllers/food_organizer_crud/nextjs/unitsOfMeasureTypeCRUD'

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { method } = req
  switch (method) {
    case 'POST':
      await createUnitOfMeasureType(
        req,
        res
      )
      break
    case 'PATCH':
      await updateUOMT(
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
        data: null,
        error: true
      })
  }
}

export default handler
