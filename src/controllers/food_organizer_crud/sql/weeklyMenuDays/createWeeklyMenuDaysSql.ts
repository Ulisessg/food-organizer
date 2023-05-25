import { DbTablesNames } from 'utils/constants'
import getParametrizedValuesSqlSentence from 'utils/getParametrizedValuesSqlSentence'

/**
 * Params order
 * + id
 * + weekly_menu_id
 * + menu_id
 * + day_id
 * @param recordsAmount
 * @returns
 */
const createWeeklyMenuDaysSql = (recordsAmount: number):
string => `INSERT INTO ${DbTablesNames.weeklyMenuDays} (
  id,
  weekly_menu_id,
  menu_id,
  day_id,
)
${getParametrizedValuesSqlSentence(
4,
recordsAmount
)}
`

export default createWeeklyMenuDaysSql
