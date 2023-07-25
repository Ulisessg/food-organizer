import { type TGetUnitsOfMeasureType } from '../unitsOfMeasureTypes/types'

export type TGetUnitsOfMeasureGroupedByType = Array<{
  uomt_id: number
  uomt_name: string
  uom: Array<{
    id: number
    name: string
    abbreviation: string
  }>
}>

export interface GetUnitsOfMeasureData {
  unitsOfMeasureGroupedByType: TGetUnitsOfMeasureGroupedByType
  unitsOfMeasureType: TGetUnitsOfMeasureType
}

export interface CreateUom {
  abbreviation: string
  name: string
  uomt_id: number
}
