import { DbTablesNames } from 'utils/constants'
import getParametrizedValuesSqlSentence from 'utils/getParametrizedValuesSqlSentence'

/**
 * Params order
 * + id
 * + name
 * + abbreviation
 * + uomt_id
 * + creation_date
 * @param recordsAmount
 * @returns
 */
const createUnitOfMeasureSql = (recordsAmount: number):
string => `INSERT INTO ${DbTablesNames.unitsOfMeasure} (
  id,
  name,
  abbreviation,
  uomt_id,
  creation_date
)
${getParametrizedValuesSqlSentence(
5,
recordsAmount
)}
`

export default createUnitOfMeasureSql

export interface CreateUom {
  abbreviation: string
  creation_date: string
  name: string
  uomt_id: number
}
