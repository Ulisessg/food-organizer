const { contextBridge } = require('electron')
const { createMenus } = require('../bridgesNames')
const electronOpenDb = require('../../../db/electronOpenDb')
const getMenusSql = require('../../../sql/menus/getMenusSql')
const createMenusSql = require('../../../sql/menus/createMenusSql')
const createMenuFoodsSql = require('../../../sql/menuFoods/createMenuFoodsSql')

const createMenusBridge = () => {
  const db = electronOpenDb()

  /**
   * @param {import('../../../sql/menus/types').CreateMenu} menu
   */
  const create = (menu) => {
    const menuCreatedId = db.prepare(createMenusSql(1)).run([
      null,
      menu.comment
    ]).lastInsertRowid
    const createMenuFood = db.prepare(createMenuFoodsSql(1))
    menu.foods.forEach((food) => {
      createMenuFood.run([
        null,
        menuCreatedId,
        food.food_id
      ])
    })
    const menuCreated = db.prepare(getMenusSql('WHERE menus.id = ?')).get([menuCreatedId])
    return {
      ...menuCreated,
      foods: JSON.parse(menuCreated.foods)
    }
  }
  contextBridge.exposeInMainWorld(
    createMenus,
    create
  )
}

module.exports = createMenusBridge
