import { DbTablesNames } from 'utils/constants'

const getDaysSql = `
  SELECT * FROM ${DbTablesNames.days} ORDER BY days.id ASC
`

export default getDaysSql

export type GetDays = Array<{
  id: number
  name: string
}>
