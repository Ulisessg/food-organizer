/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import { type GetUOM } from 'controllers/food_organizer_crud/unitsOfMeasureCRUD'

const getUomtFromRequest = (data: GetUOM['unitsOfMeasureType']): TGetUomtFromRequestReturn => {
  const result: TGetUomtFromRequestReturn = data.map(({ id, name }) => ({
    id,
    name
  }))
  return result
}

type TGetUomtFromRequestReturn = Array<Pick<
GetUOM['unitsOfMeasureType'][0],
'id' | 'name'>>

export default getUomtFromRequest
