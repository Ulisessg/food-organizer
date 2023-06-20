import {
  type GetUnitsOfMeasureData
} from 'controllers/food_organizer_crud/sql/unitsOfMeasure/types'

export type TGetUnitOfMeasureDataThunkCallback = () => Promise<GetUnitsOfMeasureData>
