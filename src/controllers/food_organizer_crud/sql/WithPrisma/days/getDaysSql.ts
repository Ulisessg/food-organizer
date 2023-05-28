import prisma from 'lib/prisma'

const getDaysSql = async (): Promise<GetDays> => {
  const days = await prisma.days.findMany({
    orderBy: {
      id: 'asc'
    }
  })
  return days
}

export default getDaysSql

export type GetDays = Array<{
  id: number
  name: string
}>
