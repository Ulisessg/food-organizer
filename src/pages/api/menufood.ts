import { type NextApiRequest, type NextApiResponse } from 'next'
import { getMenuFoods, updateMenuFoods } from 'controllers/nextjs/MenuFoodsCRUD'
import { type response } from 'controllers/response'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<response<string | any>>
): Promise<void> => {
  const { method } = req

  switch (method) {
    case 'GET':
      await getMenuFoods(
        req,
        res
      )
      break
    case 'PATCH':
      await updateMenuFoods(
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
        error: false
      })
  }
}

export default handler
