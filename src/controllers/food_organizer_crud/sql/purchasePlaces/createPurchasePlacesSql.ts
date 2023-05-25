import { DbTablesNames } from 'utils/constants'
import getParametrizedValuesSqlSentence from 'utils/getParametrizedValuesSqlSentence'

/**
 * Params order
 * + id
 * + name
 * + address
 * + creation_date
 *
 * @param recordsAmourt number
 * @returns
 */
const createPurchasePlaceSql = (recordsAmourt: number):
string => `INSERT INTO ${DbTablesNames.purchasePlaces} (
  id,
  name,
  address,
  creation_date
)
${getParametrizedValuesSqlSentence(
4,
recordsAmourt
)}
`
export default createPurchasePlaceSql

export interface CreatePurchasePlace {
  address: string | null
  creation_date: string
  name: string
}
