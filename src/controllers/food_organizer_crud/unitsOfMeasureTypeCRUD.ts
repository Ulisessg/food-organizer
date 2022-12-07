/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next'
import capitalize from 'utils/capitalize'
import prisma from 'lib/prisma'
import { response } from 'controllers/response'
import unitOfMeasureTypeVerification from 'models/unitOfMeasureTypeValidations'
import type { units_of_measure_types } from '@prisma/client'

export const insertUOMT = async (
  req: InsertUOMTBody,
  res: NextApiResponse<response<units_of_measure_types>>
): Promise<void> => {
  try {
    const { creation_date, name } = req.body
    // Id value set as 1 to not crash validations
    unitOfMeasureTypeVerification({ creationDate: creation_date as unknown as string, name })
    const result = await prisma.units_of_measure_types.create({
      data: {
        creation_date,
        name: capitalize(name)
      }
    })
    res.status(201).send({
      data: result,
      error: false
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      data: null,
      error: true
    })
  }
}

export const getUOMT = async (
  _req: NextApiRequest,
  res: NextApiResponse< response<units_of_measure_types[] >>
): Promise<void> => {
  try {
    const result = await prisma.units_of_measure_types.findMany({
      orderBy: { name: 'asc' }
    })
    res.status(200).send({ data: result, error: false })
  } catch (error) {
    console.error(error)
    res.status(500).send({
      data: null,
      error: true
    })
  }
}

export const updateUOMT = async (
  req: InsertUOMTBody,
  res: NextApiResponse<response<units_of_measure_types>>
): Promise<void> => {
  const { creation_date, name } = req.body
  try {
    unitOfMeasureTypeVerification({ creationDate: creation_date as unknown as string, name })
    const result = await prisma.units_of_measure_types.update({
      data: {
        creation_date,
        name: capitalize(name)
      },
      where: {
        name
      }
    })
    res.status(200).send({ data: result, error: false })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: null,
      error: true
    })
  }
}

interface InsertUOMTBody extends NextApiRequest {
  body: units_of_measure_types
}

export type GetUOMT = Array<{
  id: number
  name: string
}>
