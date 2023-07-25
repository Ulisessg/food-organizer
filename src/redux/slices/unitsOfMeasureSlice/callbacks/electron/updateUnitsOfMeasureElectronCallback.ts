import { type UpdateUnitsOfMeasureCallback } from '../../types'
import unitOfMeasureValidations from 'models/unitOfMeasureValidations'
import { type units_of_measure } from 'controllers/dbTablesTypes'

const updateUnitsOfMeasureElectronCallback: UpdateUnitsOfMeasureCallback = (uom) => async () => {
  const uomUpdatedData = await new Promise<units_of_measure>((resolve, reject) => {
    try {
      const {
        abbreviation,
        id,
        name,
        uomt_id
      } = uom.data
      unitOfMeasureValidations({
        abbreviation,
        name,
        uomtId: uomt_id
      })
      const uomUpdated = window.updateUnitsOfMeasure({
        abbreviation,
        id,
        name,
        uomt_id
      })
      resolve(uomUpdated)
    } catch (error) {
      reject(error)
    }
  })

  return {
    ...uom,
    data: {
      ...uomUpdatedData
    }
  }
}

export default updateUnitsOfMeasureElectronCallback
