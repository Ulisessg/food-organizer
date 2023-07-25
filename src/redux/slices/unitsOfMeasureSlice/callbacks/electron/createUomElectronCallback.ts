import { type CreateUnitsOfMeasureCallback } from '../../types'
import { type units_of_measure } from 'controllers/dbTablesTypes'

const createUomElectronCallback: CreateUnitsOfMeasureCallback = (uomData) => async () => {
  const uomCreated = await new Promise<units_of_measure>((resolve, reject) => {
    try {
      const uomCreatedData = window.createUnitsOfMeausure(uomData)
      resolve(uomCreatedData)
    } catch (error) {
      reject(error)
    }
  })
  return uomCreated
}

export default createUomElectronCallback
