/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/prisma'
import { response } from 'controllers/response'
import unitOfMeasureValidations from 'models/unitOfMeasureValidations'
import { units_of_measure } from '@prisma/client'

export const createUOM = async (
  req: CreateUOM,
  res: NextApiResponse<response<units_of_measure>>
): Promise<void> => {
  try {
    const { abbreviation, creation_date, name, uomt_id } = req.body
    unitOfMeasureValidations({
      abbreviation,
      creationDate: creation_date as unknown as string,
      name,
      uomtId: uomt_id
    })
    const result = await prisma.units_of_measure.create({
      data: {
        abbreviation: abbreviation.toLocaleLowerCase(),
        creation_date,
        name: name.toLocaleLowerCase(),
        uomt_id
      }
    })
    res.status(201).send({
      data: result, error: false
    })
  } catch (error) {
    console.error(error)
    res.status(400).send({
      data: null,
      error: true
    })
  }
}

export const getUOM = async (
  _req: NextApiRequest,
  res: NextApiResponse<response<GetUOM[]>>
): Promise<void> => {
  try {
    const result = await prisma.$queryRaw<GetUOM[]>`SELECT 
units_of_measure_types.id,units_of_measure_types.name as uomt_name,
JSON_ARRAYAGG(JSON_OBJECT(
'abbreviation', units_of_measure.abbreviation,
'name', units_of_measure.name,
'id', units_of_measure.id
)) AS uom
FROM units_of_measure_types
INNER JOIN units_of_measure ON units_of_measure_types.id = units_of_measure.uomt_id
GROUP BY uomt_name
`
    res.status(200).send({
      data: result,
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
  req: CreateUOM,
  res: NextApiResponse<response<string>>
): Promise<void> => {
  try {
    const { abbreviation, name, uomt_id, creation_date, id } = req.body
    unitOfMeasureValidations({
      abbreviation,
      creationDate: creation_date as unknown as string,
      name,
      uomtId: uomt_id
    })
    await prisma.$executeRaw`UPDATE IGNORE units_of_measure SET
name = ${name},
abbreviation = ${abbreviation},
uomt_id = ${uomt_id}
WHERE units_of_measure.id = ${id}`
    res.status(200).send({
      data: 'successful update',
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

interface CreateUOM extends NextApiRequest {
  body: units_of_measure
}

interface GetUOM {
  id: number
  uomt_name: string
  uom: Array<{
    name: string
    abbreviation: string
  }>
}
