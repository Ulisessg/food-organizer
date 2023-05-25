import { DbTablesNames } from 'utils/constants'
import { type units_of_measure } from 'controllers/food_organizer_crud/dbTablesTypes'

/**
 * Params order:
 * + name
 * + abbreviation
 * + uomt_id
 * + units_of_measure.id
 * @returns
 */
const updateUnitOfMeasureSql = `UPDATE  ${DbTablesNames.unitsOfMeasure} SET
name = ?,
abbreviation = ?,
uomt_id = ?

WHERE ${DbTablesNames.unitsOfMeasure}.id = ?
`

export interface UpdateUnitOfMeasure extends Omit<units_of_measure, 'creation_date'> {

}

export default updateUnitOfMeasureSql
