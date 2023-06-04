/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import {
  type TGetUnitsOfMeasureType
} from 'controllers/food_organizer_crud/sql/unitsOfMeasureTypes/getUnitsOfMeasureTypeSql'

const getUomtFromRequest = (data: TGetUnitsOfMeasureType): TGetUomtFromRequestReturn => {
  const result: TGetUomtFromRequestReturn = data.map(({ id, name }) => ({
    id,
    name
  }))
  return result
}

type TGetUomtFromRequestReturn = Array<Pick<
TGetUnitsOfMeasureType[0],
'id' | 'name'>>

export default getUomtFromRequest
