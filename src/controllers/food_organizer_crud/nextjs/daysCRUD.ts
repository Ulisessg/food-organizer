import { type NextApiRequest, type NextApiResponse } from 'next'
import getDaysSql, { type GetDays } from '../sql/days/getDaysSql'
import { type response } from 'controllers/response'

export const getDays = async (
  _req: NextApiRequest,
  res: NextApiResponse<response<GetDays>>
): Promise<void> => {
  try {
    const days = await getDaysSql()
    res.status(200).send({
      data: days,
      error: false
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      data: [] as any,
      error: true
    })
  }
}
