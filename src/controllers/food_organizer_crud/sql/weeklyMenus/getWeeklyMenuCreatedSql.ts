import getWeeklyMenusSql from './getWeeklyMenusSql'

/**
 * Params
 * + weekly_menus.id
 */
const getWeeklyMenuCreated = `
${getWeeklyMenusSql}
WHERE weekly_menus.id = ?
`

export default getWeeklyMenuCreated
