/* eslint-disable @typescript-eslint/naming-convention */
import capitalize from 'utils/capitalize'
import prisma from 'lib/prisma'
import unitOfMeasureTypeVerification from 'models/unitOfMeasureTypeValidations'
import { type units_of_measure_types } from '@prisma/client'

const createUnitOfMeasureTypeSql = async (unitOfMeasureType: CreateUnitOfMeasureType):
Promise<units_of_measure_types> => {
  const { creation_date, name } = unitOfMeasureType
  // Id value set as 1 to not crash validations
  unitOfMeasureTypeVerification({ creationDate: creation_date as unknown as string, name })
  const unitOfMeasureTypeCreationResult = await prisma.units_of_measure_types.create({
    data: {
      creation_date,
      name: capitalize(name)
    }
  })

  return unitOfMeasureTypeCreationResult
}

export interface CreateUnitOfMeasureType {
  creation_date: string
  name: string
}

export default createUnitOfMeasureTypeSql
