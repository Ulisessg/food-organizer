import type { GetUOM } from 'controllers/food_organizer_crud/unitsOfMeasureCRUD'
import axios from 'axios'
import { response } from 'controllers/response'

export const getUnitsOfMeasure = async (): Promise<response<GetUOM> | response<string>> => {
  const result = await axios<response<GetUOM>>(
    '/api/uom',
    {
      method: 'GET'
    }
  )
  return result.data
}
