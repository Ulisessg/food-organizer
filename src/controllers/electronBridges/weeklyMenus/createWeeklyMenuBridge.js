const { contextBridge } = require('electron')
const { createWeeklyMenu } = require('../bridgesNames')
const electronOpenDb = require('../../db/electronOpenDb')
const createWeeklyMenuSql =
  require('../../sql/weeklyMenus/createWeeklyMenuSql')
const createWeeklyMenuDaysSql = require('../../sql/weeklyMenuDays/createWeeklyMenuDaysSql')
const getWeeklyMenusSql = require('../../sql/weeklyMenus/getWeeklyMenusSql')

const createWeeklyMenuBridge = () => {
  const db = electronOpenDb()

  /**
   * @param {import('../../sql/weeklyMenus/types').TCreateWeeklyMenus} weeklyMenu
   */
  const create = (weeklyMenu) => {
    const createWmDays = db.prepare(createWeeklyMenuDaysSql(1))

    const weeklyMenuCreatedId = db.prepare(createWeeklyMenuSql(1)).run([
      null,
      weeklyMenu.creation_date
    ]).lastInsertRowid

    weeklyMenu.menus.forEach((menu) => {
      createWmDays.run([
        null,
        weeklyMenuCreatedId,
        menu.menu_id,
        menu.day_id
      ])
    })
    const weeklyMenuCreated = db.prepare(getWeeklyMenusSql('WHERE weekly_menus.id = ?'))
      .get([weeklyMenuCreatedId])
    return weeklyMenuCreated
  }
  contextBridge.exposeInMainWorld(
    createWeeklyMenu,
    create
  )
}

module.exports = createWeeklyMenuBridge
