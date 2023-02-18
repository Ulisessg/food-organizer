import { type NextApiRequest, type NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { type response } from 'controllers/response'

export const getDays = async (
  _req: NextApiRequest,
  res: NextApiResponse<response<GetDays>>
): Promise<void> => {
  try {
    const days = await prisma.days.findMany({
      orderBy: {
        id: 'asc'
      }
    })
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

export type GetDays = Array<{
  id: number
  name: string
}>
