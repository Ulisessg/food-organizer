import { DbTablesNames } from 'utils/constants'

/**
 * Params order:
 * + name
 * + address
 * + purchase_place.id
 */
const updatePurchasePlaceSql = `UPDATE ${DbTablesNames.purchasePlaces} SET
  name = ?,
  address = ?

  WHERE ${DbTablesNames.purchasePlaces}.id = ?
`

export default updatePurchasePlaceSql
