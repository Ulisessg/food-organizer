import {
  type GetUnitsOfMeasureData
} from 'controllers/nextjs/unitsOfMeasureCRUD'
import { type TGetUnitOfMeasureDataThunkCallback } from '../../types'

const getUomDataElectronCallback: TGetUnitOfMeasureDataThunkCallback = async () => {
  const data = await new Promise<GetUnitsOfMeasureData>((resolve, reject) => {
    try {
      const uomData = window.getUomData()
      resolve(uomData)
    } catch (error) {
      reject(error)
    }
  })
  return data
}

export default getUomDataElectronCallback
