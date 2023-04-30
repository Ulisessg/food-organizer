/* eslint-disable max-lines-per-function */
/* eslint-disable camelcase */
import {
  type GetUnitsOfMeasureData
} from 'controllers/food_organizer_crud/nextjs/unitsOfMeasureCRUD'
import {
  type TGetUnitsOfMeasureType
} from 'controllers/food_organizer_crud/sql/unitsOfMeasureType/getUnitsOfMeasureTypeSql'
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
  uomList: GetUnitsOfMeasureData['unitsOfMeasureGroupedByType'],
  unitOfMeasure: units_of_measure,
  unitsOfMeasureTypes: TGetUnitsOfMeasureType
): GetUnitsOfMeasureData['unitsOfMeasureGroupedByType'] => {
  let isUnitOfMeasureTypeIncluded = false
  let result: GetUnitsOfMeasureData['unitsOfMeasureGroupedByType'] = uomList.map((uomt) => {
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
        ],
        uomAbbreviations: [
          ...uomt.uomAbbreviations,
          unitOfMeasure.abbreviation
        ],
        uomNames: [
          ...uomt.uomNames,
          unitOfMeasure.name
        ]
      }
    }
    return uomt
  })

  if (!isUnitOfMeasureTypeIncluded) {
    const unitOfMeasureType: TGetUnitsOfMeasureType[0] =
      unitsOfMeasureTypes.find((uomt) => uomt.id ===
      unitOfMeasure.uomt_id) as TGetUnitsOfMeasureType[0]

    if (typeof unitOfMeasureType === 'undefined') {
      throw new Error('Unit of measure type does not exist')
    }
    result = [
      ...result,
      {
        uom: [unitOfMeasure],
        uomAbbreviations: [unitOfMeasure.abbreviation],
        uomNames: [unitOfMeasure.name],
        uomt_id: unitOfMeasureType.id,
        uomt_name: unitOfMeasureType.name
      }
    ]
  }

  return result
}

export default insertUnitOfMeasure
