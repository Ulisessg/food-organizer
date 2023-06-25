import { type CreateUnitsOfMeasureTypesCallback } from '../../types'
import { type units_of_measure_types } from 'controllers/food_organizer_crud/dbTablesTypes'

const createUnitsOfMeasureTypeElectronCallback: CreateUnitsOfMeasureTypesCallback =
(uomTData) => async () => {
  const uomtCreated = await new Promise<units_of_measure_types>((resolve, reject) => {
    try {
      const uomtCreatedData = window.createUnitsOfMeasureTypes(uomTData)
      resolve(uomtCreatedData)
    } catch (error) {
      reject(error)
    }
  })
  return uomtCreated
}

export default createUnitsOfMeasureTypeElectronCallback
