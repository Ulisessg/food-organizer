import { type NextApiRequest, type NextApiResponse } from 'next'
import { getDays } from 'controllers/food_organizer_crud/nextjs/daysCRUD'
import { type response } from 'controllers/response'

const handler = async (req: NextApiRequest, res: NextApiResponse<response<any>>): Promise<void> => {
  const { method } = req
  switch (method) {
    case 'GET':
      await getDays(
        req,
        res
      )
      break
    default:
      res.setHeader(
        'Allow',
        ['GET']
      )
      res.status(405).send({
        data: 'method not allowed',
        error: true
      })
  }
}

export default handler
