import {
  type CreateUnitOfMeasureType,
  type TGetUnitsOfMeasureType
} from 'controllers/food_organizer_crud/sql/unitsOfMeasureTypes/types'
import {
  type CreateUom,
  type GetUnitsOfMeasureData
} from 'controllers/food_organizer_crud/sql/unitsOfMeasure/types'
import {
  type units_of_measure,
  type units_of_measure_types
} from 'controllers/food_organizer_crud/dbTablesTypes'
import { type TUpdateThunkArgs } from 'Types'

export type TGetUnitOfMeasureDataThunkCallback = () => () => Promise<GetUnitsOfMeasureData>

export type CreateUnitsOfMeasureTypesCallback =
(unitOfMeasureType: CreateUnitOfMeasureType) => () => Promise<TGetUnitsOfMeasureType[0]>

export type CreateUnitsOfMeasureCallback = (uom: CreateUom) => () => Promise<units_of_measure>

type UpdateUomtThunkArgs = TUpdateThunkArgs<units_of_measure_types>

export type UpdateUnitsOfMeasureTypesCallback =
 (uomt: UpdateUomtThunkArgs) => () => Promise<UpdateUomtThunkArgs>

interface UpdateUnitsOfMeasureThunkArgs extends TUpdateThunkArgs<units_of_measure> {
  initialUomtId: number
}
interface UpdateUnitsOfMeasureReturn extends UpdateUnitsOfMeasureThunkArgs {
  isUomtIdChanged: boolean
}

export type UpdateUnitsOfMeasureCallback =
  (uom: UpdateUnitsOfMeasureThunkArgs) => () => Promise<UpdateUnitsOfMeasureThunkArgs>
