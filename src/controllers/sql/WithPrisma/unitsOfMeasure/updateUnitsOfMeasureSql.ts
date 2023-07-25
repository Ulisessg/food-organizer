/* eslint-disable @typescript-eslint/naming-convention */
import capitalize from 'utils/capitalize'
import prisma from 'lib/prisma'
import { type units_of_measure } from '@prisma/client'
import { validations } from 'models/unitOfMeasureValidations'

const updateUnitOfMeasureSql = async (unitOfMeasure: UpdateUnitOfMeasure):
Promise<units_of_measure> => {
  const { abbreviation, name, id, uomt_id } = unitOfMeasure

  validations.abbreviation(abbreviation)
  validations.name(name)

  const unitOfMeasureUpdated = await prisma.units_of_measure.update({
    data: {
      abbreviation: capitalize(abbreviation),
      name: capitalize(name),
      uomt_id
    },
    where: {
      id
    }
  })
  return unitOfMeasureUpdated
}

export interface UpdateUnitOfMeasure extends Omit<units_of_measure, 'creation_date'> {

}

export default updateUnitOfMeasureSql
