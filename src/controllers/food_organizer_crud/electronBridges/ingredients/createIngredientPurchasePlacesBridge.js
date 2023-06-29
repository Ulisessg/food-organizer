/* eslint-disable max-len */
const { contextBridge } = require('electron')
const { createIngredientPurchasePlaces } = require('../bridgesNames')
const electronOpenDb = require('../../db/electronOpenDb')
const createIngredientPurchasePlacesSql =
  require('../../sql/ingredientPurchasePlaces/createIngredientPurchasePlacesSql')
const getIngredientPurchasePlaces = require('../../sql/ingredientPurchasePlaces/getIngredientPurchasePlaces')

const createIngredientPurchasePlacesBridge = () => {
  const db = electronOpenDb()

  /**
   * @type {import('../../sql/ingredientPurchasePlaces/types').CreateIngredientPurchasePlaceFunc}
   */
  const create = (ingredient_id, purchasePlaces) => {
    if (purchasePlaces.length === 0) {
      throw new Error('No ingredients purchase places')
    }
    const createingredientPP = db.prepare(createIngredientPurchasePlacesSql(1))

    /**
     * @type {import('../../sql/ingredients/types').TIngr_purchase_places}
     */

    purchasePlaces.forEach((purchase_place_id) => {
      createingredientPP.run([
        null,
        ingredient_id,
        purchase_place_id
      ])
    })

    const ingredientPurchasePlacesCreated = db.prepare(getIngredientPurchasePlaces).all([ingredient_id])

    return ingredientPurchasePlacesCreated
  }
  contextBridge.exposeInMainWorld(
    createIngredientPurchasePlaces,
    create
  )
}

module.exports = createIngredientPurchasePlacesBridge
