const { contextBridge } = require('electron')
const { createMenus } = require('../bridgesNames')
const electronOpenDb = require('../../db/electronOpenDb')
const getMenusSql = require('../../sql/menus/getMenusSql')
const createMenusSql = require('../../sql/menus/createMenusSql')
const createMenuFoodsSql = require('../../sql/menuFoods/createMenuFoodsSql')

const createMenusBridge = () => {
  const db = electronOpenDb()

  /**
   * @param {import('../../sql/menus/types').CreateMenu} menu
   */
  const create = (menu) => {
    let menuCreatedId = null
    try {
      menuCreatedId = db.prepare(createMenusSql(1)).run([
        null,
        menu.comment
      ]).lastInsertRowid
    } catch {
      throw new Error('menu')
    }
    try {
      const createMenuFood = db.prepare(createMenuFoodsSql(1))
      menu.foods.forEach((food) => {
        createMenuFood.run([
          null,
          menuCreatedId,
          food.food_id
        ])
      })
    } catch (error) {
      throw new Error('menu_foods')
    }

    /**
     * @type {import('../../sql/menus/types').GetMenus[0]}
     */
    const menuCreated = db.prepare(getMenusSql('WHERE menus.id = ?')).get([menuCreatedId])

    return {
      ...menuCreated,
      foods: JSON.parse(menuCreated.menu_foods),
      menu_foods: JSON.parse(menuCreated.menu_foods)
    }
  }
  contextBridge.exposeInMainWorld(
    createMenus,
    create
  )
}

module.exports = createMenusBridge
