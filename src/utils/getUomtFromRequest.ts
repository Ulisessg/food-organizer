/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import { type GetUOM } from 'controllers/food_organizer_crud/unitsOfMeasureCRUD'

const getUomtFromRequest = (data: GetUOM): TGetUomtFromRequestReturn => {
  const result: TGetUomtFromRequestReturn = data.map(({ uomt_id, uomt_name }) => ({
    uomt_id,
    uomt_name
  }))
  return result
}

type TGetUomtFromRequestReturn = Array<Pick<GetUOM[0], 'uomt_id' | 'uomt_name'>>

export default getUomtFromRequest
