/* eslint-disable max-len */
const { contextBridge } = require('electron')
const { createIngredientPurchasePlaces } = require('../bridgesNames')
const electronOpenDb = require('../../../db/electronOpenDb')
const createIngredientPurchasePlacesSql =
  require('../../../sql/ingredientPurchasePlaces/createIngredientPurchasePlacesSql')
const getPurchasePlacesSql = require('../../../sql/purchasePlaces/getPurchasePlacesSql')

const createIngredientPurchasePlacesBridge = () => {
  const db = electronOpenDb()

  /**
   * @param {import('../../../sql/ingredientPurchasePlaces/types').CreateIngredientPurchasePlace} ingredientPurchasePlaces
   * @returns {import('../../../sql/ingredients/types').TIngr_purchase_places}
   */
  const create = (ingredientPurchasePlaces) => {
    if (ingredientPurchasePlaces.length === 0) {
      throw new Error('No ingredients purchase places')
    }
    const createingredientPP = db.prepare(createIngredientPurchasePlacesSql(1))

    /**
     * @type {import('../../../sql/ingredients/types').TIngr_purchase_places}
     */
    const result = []

    ingredientPurchasePlaces.forEach(({ ingredient_id, purchase_place_id }) => {
      const ingrPurchasePlaceCreateId = createingredientPP.run([
        ingredient_id,
        purchase_place_id
      ]).lastInsertRowid

      /**
       * @type {import('../../../sql/purchasePlaces/types').GetPurchasePlaces[0]}
       */
      const purchasePlace = db.prepare(getPurchasePlacesSql('WHERE purchase_places.id = ?')).get(purchase_place_id)
      result.push({
        id: ingrPurchasePlaceCreateId,
        ingredient_id,
        purchase_place_id,
        purchase_place_name: purchasePlace.name
      })
    })

    return result
  }
  contextBridge.exposeInMainWorld(
    createIngredientPurchasePlaces,
    create
  )
}

module.exports = createIngredientPurchasePlacesBridge
