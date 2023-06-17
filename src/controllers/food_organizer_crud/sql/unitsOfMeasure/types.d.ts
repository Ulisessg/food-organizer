export type TGetUnitsOfMeasureGroupedByType = Array<{
  uomt_id: number
  uomt_name: string
  uomNames: string[]
  uomAbbreviations: string[]
  uom: Array<{
    id: number
    name: string
    abbreviation: string
  }>
}>
