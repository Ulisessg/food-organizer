const { contextBridge } = require('electron')
const electronOpenDb = require('../db/electronOpenDb')
const { getDaysData } = require('./bridgesNames')
const getDaysSql = require('../sql/days/getDaysSql')

const getDaysDataBridge = () => {
  const db = electronOpenDb()

  /**
   * @returns {import('../../sql/days/types').GetDays}
   */
  const getDays = () => {
    // eslint-disable-next-line lines-around-comment
    /**
     * @returns {import('../../sql/days/types').GetDays}
     */

    const days = db.prepare(getDaysSql).all()
    return days
  }

  contextBridge.exposeInMainWorld(
    getDaysData,
    getDays
  )
}

module.exports = getDaysDataBridge
