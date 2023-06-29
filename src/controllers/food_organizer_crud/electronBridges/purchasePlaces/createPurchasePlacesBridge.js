const { contextBridge } = require('electron')
const { createPurchasePlaces } = require('../bridgesNames')
const electronOpenDb = require('../../db/electronOpenDb')
const createPurchasePlacesSql = require('../../sql/purchasePlaces/createPurchasePlacesSql')
const createIngredientsSql = require('../../sql/purchasePlaces/getPurchasePlacesSql')

const createPurchasePlacesBridge = () => {
  const db = electronOpenDb()

  /**
   * @param {import('../../sql/purchasePlaces/types').CreatePurchasePlace} purchasePlace
   */
  const create = (purchasePlace) => {
    const purchasePlaceCreatedId = db.prepare(createPurchasePlacesSql(1)).run([
      null,
      purchasePlace.name,
      purchasePlace.address || ''
    ]).lastInsertRowid
    const purchasePlacecreated = db
      .prepare(createIngredientsSql('WHERE purchase_places.id = ?')).get([purchasePlaceCreatedId])
    return purchasePlacecreated
  }
  contextBridge.exposeInMainWorld(
    createPurchasePlaces,
    create
  )
}

module.exports = createPurchasePlacesBridge
