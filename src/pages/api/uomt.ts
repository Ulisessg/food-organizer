import { NextApiRequest, NextApiResponse } from 'next'
import {
  getUOMT,
  insertUOMT, updateUOMT
} from 'controllers/food_organizer_crud/unitsOfMeasureTypeCRUD'

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { method } = req
  switch (method) {
    case 'POST':
      await insertUOMT(
        req,
        res
      )
      break
    case 'GET':
      await getUOMT(
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
