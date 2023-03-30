/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import { type NextApiRequest, type NextApiResponse } from 'next'
import capitalize from 'utils/capitalize'
import prisma from 'lib/prisma'
import { type response } from 'controllers/response'
import unitOfMeasureTypeVerification from 'models/unitOfMeasureTypeValidations'
import type { units_of_measure_types } from '@prisma/client'

export const insertUOMT = async (
  req: InsertUOMTRequest,
  res: NextApiResponse<response<units_of_measure_types | string>>
): Promise<void> => {
  try {
    const { creation_date, name } = req.body
    // Id value set as 1 to not crash validations
    unitOfMeasureTypeVerification({ creationDate: creation_date as unknown as string, name })
    const creationResponse = await prisma.units_of_measure_types.create({
      data: {
        creation_date,
        name: capitalize(name)
      }
    })
    res.status(201).send({
      data: creationResponse,
      error: false
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({
      data: 'Error creando tipo de unidad de medida',
      error: true
    })
  }
}

export const getUOMT = async (
  _req: NextApiRequest,
  res: NextApiResponse< response<units_of_measure_types[] | null>>
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
  req: UpdateUOMTRequest,
  res: NextApiResponse<response<units_of_measure_types | null>>
): Promise<void> => {
  const { name } = req.body
  try {
    const result = await prisma.units_of_measure_types.update({
      data: {
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

interface InsertUOMTRequest extends NextApiRequest {
  body: CreateUomT
}

interface UpdateUOMTRequest extends NextApiRequest {
  body: UpdateUomT
}

export interface UpdateUomT {
  name: string
}

export interface CreateUomT {
  creation_date: string
  name: string
}

export type GetUOMT = Array<{
  id: number
  name: string
}>
