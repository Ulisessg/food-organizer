import { type NextApiRequest, type NextApiResponse } from 'next'
import {
  createMenu, getMenus, updateMenu
} from 'controllers/nextjs/MenuCRUD'
import { type response } from 'controllers/response'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<response<string | any>>
): Promise<void> => {
  const { method } = req

  switch (method) {
    case 'POST':
      await createMenu(
        req,
        res
      )
      break
    case 'GET':
      await getMenus(
        req,
        res
      )
      break
    case 'PATCH':
      await updateMenu(
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
        error: false
      })
  }
}

export default handler
