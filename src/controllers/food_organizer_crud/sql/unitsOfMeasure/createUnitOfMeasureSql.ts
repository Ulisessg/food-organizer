/* eslint-disable @typescript-eslint/naming-convention */
import capitalize from 'utils/capitalize'
import prisma from 'lib/prisma'
import unitOfMeasureValidations from 'models/unitOfMeasureValidations'
import { type units_of_measure } from '@prisma/client'

const createUnitOfMeasureSql = async (unitOfMeasure: CreateUom): Promise<units_of_measure> => {
  const { abbreviation, creation_date, name, uomt_id } = unitOfMeasure
  unitOfMeasureValidations({
    abbreviation,
    creationDate: creation_date,
    name,
    uomtId: uomt_id
  })
  const unitOfMeasureCreated = await prisma.units_of_measure.create({
    data: {
      abbreviation: capitalize(abbreviation),
      creation_date,
      name: capitalize(name),
      uomt_id
    }
  })
  return unitOfMeasureCreated
}

export default createUnitOfMeasureSql

export interface CreateUom {
  abbreviation: string
  creation_date: string
  name: string
  uomt_id: number
}
