/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import { type NextApiRequest, type NextApiResponse } from 'next'
import unitOfMeasureValidations, { validations } from 'models/unitOfMeasureValidations'
import { type GetUOMT } from './unitsOfMeasureTypeCRUD'
import capitalize from 'utils/capitalize'
import { getUomGroupedByTypeSql } from './sql/getUomGroupedByTypeSql'
import { getUomSql } from './sql/getUomSql'
import prisma from 'lib/prisma'
import { type response } from 'controllers/response'
import { type units_of_measure } from '@prisma/client'

export const createUOM = async (
  req: CreateUOMRequest,
  res: NextApiResponse<response<units_of_measure | string>>
): Promise<void> => {
  try {
    const { abbreviation, creation_date, name, uomt_id } = req.body
    unitOfMeasureValidations({
      abbreviation,
      creationDate: creation_date,
      name,
      uomtId: uomt_id
    })
    const result = await prisma.units_of_measure.create({
      data: {
        abbreviation: capitalize(abbreviation),
        creation_date,
        name: capitalize(name),
        uomt_id
      }
    })
    res.status(201).send({
      data: result, error: false
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
  res: NextApiResponse<response<GetUOM | null>>
): Promise<void> => {
  try {
    const unitsOfMeasureGroupedByType = await getUomGroupedByTypeSql()
    const unitsOfMeasureType = await getUomSql()
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
  res: NextApiResponse<response<string>>
): Promise<void> => {
  try {
    const { abbreviation, name, uomt_id, id } = req.body

    validations.abbreviation(abbreviation)
    validations.name(name)
    validations.uomtId(uomt_id)

    await prisma.$executeRaw`UPDATE IGNORE units_of_measure SET
name = ${capitalize(name)},
abbreviation = ${capitalize(abbreviation)},
uomt_id = ${uomt_id}
WHERE units_of_measure.id = ${id}`
    res.status(200).send({
      data: 'successful update',
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
  body: units_of_measure
}

export interface CreateUom {
  abbreviation: string
  creation_date: string
  name: string
  uomt_id: number
}

export interface GetUOM {
  unitsOfMeasureGroupedByType: Array<{
    uomt_id: number
    uomt_name: string
    uomIds: number[]
    uom: Array<{
      id: number
      name: string
      abbreviation: string
    }>
  }>
  unitsOfMeasureType: GetUOMT
}
