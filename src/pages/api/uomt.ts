import { NextApiRequest, NextApiResponse } from 'next'
import { insertUOMT } from 'controllers/food_organizer_crud/unitsOfMeasureTypeCRUD'

const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const { method } = req
  switch (method) {
    case 'POST':
      await insertUOMT(
        req,
        res
      )
      break
    default:
      res.setHeader(
        'Allow',
        ['POST']
      )
      res.status(405).send({
        data: null,
        error: true
      })
  }
}

export default handler