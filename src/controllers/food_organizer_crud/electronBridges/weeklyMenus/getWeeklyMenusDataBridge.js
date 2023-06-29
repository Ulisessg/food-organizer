const { contextBridge } = require('electron')
const { getWeeklyMenusData } = require('../bridgesNames')
const electronOpenDb = require('../../db/electronOpenDb')
const getWeeklyMenusSql = require('../../sql/weeklyMenus/getWeeklyMenusSql')

/**
 * @param {Array} day
 */
const parseDayData = (day) => {
  if (day.length === 0) {
    return []
  }
  return JSON.parse(day)
}

const getWeeklyMenusDataBridge = () => {
  const db = electronOpenDb()
  // eslint-disable-next-line padded-blocks
  const getData = () => {

    /**
     * @type {import('../../sql/weeklyMenus/types').GetWeeklyMenu}
     */
    const data = db.prepare(getWeeklyMenusSql()).all()
    const fixedData = data.map((weeklyMenu) => ({
      ...weeklyMenu,
      friday: parseDayData(weeklyMenu.friday),
      monday: parseDayData(weeklyMenu.monday),
      saturday: parseDayData(weeklyMenu.saturday),
      sunday: parseDayData(weeklyMenu.sunday),
      thursday: parseDayData(weeklyMenu.thursday),
      tuesday: parseDayData(weeklyMenu.tuesday),
      wednesday: parseDayData(weeklyMenu.wednesday)
    }))
    return fixedData
  }
  contextBridge.exposeInMainWorld(
    getWeeklyMenusData,
    getData
  )
}

module.exports = getWeeklyMenusDataBridge
