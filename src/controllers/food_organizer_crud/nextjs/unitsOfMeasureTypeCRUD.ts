/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import { type NextApiRequest, type NextApiResponse } from 'next'
import createUnitOfMeasureTypeSql, {
  type CreateUnitOfMeasureType
} from '../sql/unitsOfMeasureType/createUnitsOfMeasureTyeSql'
import capitalize from 'utils/capitalize'
import prisma from 'lib/prisma'
import { type response } from 'controllers/response'
import type { units_of_measure_types } from '@prisma/client'

export const createUnitOfMeasureType = async (
  req: CreateUnitOfMeasureTypeRequest,
  res: NextApiResponse<response<units_of_measure_types | string>>
): Promise<void> => {
  try {
    const unitOfMeasureTypeCreation = await createUnitOfMeasureTypeSql(req.body)
    res.status(201).send({
      data: unitOfMeasureTypeCreation,
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

export const updateUOMT = async (
  req: UpdateUOMTRequest,
  res: NextApiResponse<response<units_of_measure_types | null>>
): Promise<void> => {
  const { name, id } = req.body

  try {
    const result = await prisma.units_of_measure_types.update({
      data: {
        name: capitalize(name)
      },
      where: {
        id
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

interface CreateUnitOfMeasureTypeRequest extends NextApiRequest {
  body: CreateUnitOfMeasureType
}

interface UpdateUOMTRequest extends NextApiRequest {
  body: UpdateUomT
}

export interface UpdateUomT {
  name: string
  id: number
}
