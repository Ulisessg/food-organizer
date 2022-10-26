/* eslint-disable camelcase */
/* eslint-disable no-magic-numbers */
/* No-magic-numbers is disabled to void error with http request status  */
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, units_of_measure_types } from '@prisma/client'
import dotenv from 'dotenv'
dotenv.config()

const prisma = new PrismaClient()

export default async function handler
(_req: NextApiRequest, res: NextApiResponse<units_of_measure_types[]>): Promise<void> {
  const response: units_of_measure_types[] = await prisma.units_of_measure_types.findMany()
  res.status(200).json(response)
}
