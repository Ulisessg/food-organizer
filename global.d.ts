import { type GetDays } from 'controllers/food_organizer_crud/sql/days/types'
import {
  type GetUnitsOfMeasureData
} from 'controllers/food_organizer_crud/nextjs/unitsOfMeasureCRUD'

// Electron bridges
declare global {
  interface Window {
    getUomData: GetUnitsOfMeasureData
    getDaysData: GetDays
  }
}
