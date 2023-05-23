/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import { type NextApiRequest, type NextApiResponse } from 'next'
import
{
  type TGetUnitsOfMeasureGroupedByType,
  getUomGroupedByTypeSql
} from '../sql/unitsOfMeasure/getUnitsOfMeasureGroupedByTypeSql'
import createUnitOfMeasureSql,
{ type CreateUom } from '../sql/unitsOfMeasure/createUnitsOfMeasureSql'

import
getUnitsOfMeasureTypeSql, {
  type TGetUnitsOfMeasureType
} from '../sql/unitsOfMeasureType/getUnitsOfMeasureTypeSql'
import updateUnitOfMeasureSql,
{ type UpdateUnitOfMeasure } from '../sql/unitsOfMeasure/updateUnitsOfMeasureSql'
import { type response } from 'controllers/response'
import { type units_of_measure } from '@prisma/client'

export const createUOM = async (
  req: CreateUOMRequest,
  res: NextApiResponse<response<units_of_measure | string>>
): Promise<void> => {
  try {
    const unitOfMeasureCreated = await createUnitOfMeasureSql(req.body)
    res.status(201).send({
      data: unitOfMeasureCreated,
      error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: 'Error creando unidad de medida',
      error: true
    })
  }
}

export const getUOM = async (
  _req: NextApiRequest,
  res: NextApiResponse<response<GetUnitsOfMeasureData | null>>
): Promise<void> => {
  try {
    const unitsOfMeasureGroupedByType = await getUomGroupedByTypeSql()
    const unitsOfMeasureType = await getUnitsOfMeasureTypeSql()
    res.status(200).send({
      data: {
        unitsOfMeasureGroupedByType,
        unitsOfMeasureType
      },
      error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: null,
      error: true
    })
  }
}

export const updateUOM = async (
  req: UpdateUomRequest,
  res: NextApiResponse<response<units_of_measure | string>>
): Promise<void> => {
  try {
    const unitOfMeasureUpdated = await updateUnitOfMeasureSql(req.body)

    res.status(200).send({
      data: unitOfMeasureUpdated,
      error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: '',
      error: true
    })
  }
}

interface CreateUOMRequest extends NextApiRequest {
  body: CreateUom
}

interface UpdateUomRequest extends NextApiRequest {
  body: UpdateUnitOfMeasure
}

export interface GetUnitsOfMeasureData {
  unitsOfMeasureGroupedByType: TGetUnitsOfMeasureGroupedByType
  unitsOfMeasureType: TGetUnitsOfMeasureType
}
