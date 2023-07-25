import { type UpdateUnitsOfMeasureTypesCallback } from '../../types'
import unitOfMeasureTypeVerification from 'models/unitOfMeasureTypeValidations'
import { type units_of_measure_types } from 'controllers/dbTablesTypes'

const UpdateUnitsOfMeasureTypesElectronCallback: UpdateUnitsOfMeasureTypesCallback =
(unitsOfMeasureTypes) => async () => {
  const uomtUpdated = await new Promise<units_of_measure_types>((resolve, reject) => {
    try {
      const { data } = unitsOfMeasureTypes
      unitOfMeasureTypeVerification({
        name: data.name
      })
      const updated = window.updateUnitsOfMeasureTypes(data)
      resolve(updated)
    } catch (error) {
      reject(error)
    }
  })
  return {
    ...unitsOfMeasureTypes,
    data: {
      ...uomtUpdated
    }
  }
}

export default UpdateUnitsOfMeasureTypesElectronCallback
