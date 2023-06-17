import {
  type GetUnitsOfMeasureData
} from 'controllers/food_organizer_crud/nextjs/unitsOfMeasureCRUD'

// Electron bridges
declare global {
  interface Window {
    getUomData: GetUnitsOfMeasureData
  }
}
