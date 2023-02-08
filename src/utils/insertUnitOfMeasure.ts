/* eslint-disable camelcase */
import type { GetUOM } from 'controllers/food_organizer_crud/unitsOfMeasureCRUD'
import type { GetUOMT } from 'controllers/food_organizer_crud/unitsOfMeasureTypeCRUD'
import type { units_of_measure } from '@prisma/client'

/**
 * Insert a "unit of measure" in "units of measure order by unit of measure type" list
 *
 * @param uomList
 * @param unitOfMeasure
 * @param unitsOfMeasureTypes
 * @returns
 */
const insertUnitOfMeasure = (
  uomList: GetUOM['unitsOfMeasureGroupedByType'],
  unitOfMeasure: units_of_measure,
  unitsOfMeasureTypes: GetUOMT
): GetUOM['unitsOfMeasureGroupedByType'] => {
  let isUnitOfMeasureTypeIncluded = false
  let result: GetUOM['unitsOfMeasureGroupedByType'] = uomList.map((uomt) => {
    if (uomt.uomt_id === unitOfMeasure.uomt_id) {
      isUnitOfMeasureTypeIncluded = true
      return {
        ...uomt,
        uom: [
          ...uomt.uom,
          {
            abbreviation: unitOfMeasure.abbreviation,
            id: unitOfMeasure.id,
            name: unitOfMeasure.name
          }
        ]
      }
    }
    return uomt
  })

  if (!isUnitOfMeasureTypeIncluded) {
    const unitOfMeasureType: GetUOMT[0] =
      unitsOfMeasureTypes.find((uomt) => uomt.id === unitOfMeasure.uomt_id) as GetUOMT[0]

    if (typeof unitOfMeasureType === 'undefined') {
      throw new Error('Unit of measure type does not exist')
    }
    result = [
      ...result,
      {
        uom: [unitOfMeasure],
        uomt_id: unitOfMeasureType.id,
        uomt_name: unitOfMeasureType.name
      }
    ]
  }

  return result
}

export default insertUnitOfMeasure
