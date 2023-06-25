import {
  type CreateUnitOfMeasureType,
  type TGetUnitsOfMeasureType
} from 'controllers/food_organizer_crud/sql/unitsOfMeasureTypes/types'
import {
  type CreateUom,
  type GetUnitsOfMeasureData
} from 'controllers/food_organizer_crud/sql/unitsOfMeasure/types'
import { type units_of_measure } from 'controllers/food_organizer_crud/dbTablesTypes'

export type TGetUnitOfMeasureDataThunkCallback = () => Promise<GetUnitsOfMeasureData>

export type CreateUnitsOfMeasureTypesCallback =
(unitOfMeasureType: CreateUnitOfMeasureType) => () => Promise<TGetUnitsOfMeasureType[0]>

export type CreateUnitsOfMeasureCallback = (uom: CreateUom) => () => Promise<units_of_measure>
