import { type NextApiRequest, type NextApiResponse } from 'next'
import {
  createFoodType, getFoodTypes, updateFoodTypes
} from 'controllers/food_organizer_crud/foodTypesCRUD'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { method } = req
  switch (method) {
    case 'POST':
      await createFoodType(
        req,
        res
      )
      break
    case 'GET':
      await getFoodTypes(
        req,
        res
      )
      break
    case 'PATCH':
      await updateFoodTypes(
        req,
        res
      )
      break
    default:
      res.setHeader(
        'Accept',
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
