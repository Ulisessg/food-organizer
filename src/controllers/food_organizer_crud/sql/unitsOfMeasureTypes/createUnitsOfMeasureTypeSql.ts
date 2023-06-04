import { DbTablesNames } from 'utils/constants'
import getParametrizedValuesSqlSentence from 'utils/getParametrizedValuesSqlSentence'

/**
 * Params order:
 * + id
 * + name
 * + creation_date
 * @param recordsAmount
 * @returns
 */
const createUnitOfMeasureTypeSql = (recordsAmount: number):
string => `INSERT INTO ${DbTablesNames.unitsOfMeasureTypes} (
  id,
  name,
  creation_date
)
${getParametrizedValuesSqlSentence(
3,
recordsAmount
)}
`

export interface CreateUnitOfMeasureType {
  creation_date: string
  name: string
}

export default createUnitOfMeasureTypeSql
