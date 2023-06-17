const { contextBridge } = require('electron')
const { getMenusData } = require('./bridgesNames')
const electronOpenDb = require('../../db/electronOpenDb')
const getMenusSql = require('../../sql/menus/getMenusSql')

const getMenusDataBridge = () => {
  const db = electronOpenDb()
  // eslint-disable-next-line padded-blocks
  const getData = () => {

    /**
     * @type {import('../../sql/menus/types').GetMenus}
     */
    const data = db.prepare(getMenusSql).all()
    const parsedData = data.map((menu) => {
      const foodsParsed = JSON.parse(menu.menu_foods)
      return {
        ...menu,
        menu_foods: foodsParsed
      }
    })
    return parsedData
  }

  contextBridge.exposeInMainWorld(
    getMenusData,
    getData
  )
}

module.exports = getMenusDataBridge
