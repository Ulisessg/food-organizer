const { contextBridge } = require('electron')
const { createPurchasePlaces } = require('../bridgesNames')
const electronOpenDb = require('../../db/electronOpenDb')
const createPurchasePlacesSql = require('../../sql/purchasePlaces/createPurchasePlacesSql')
const createIngredientsSql = require('../../sql/purchasePlaces/getPurchasePlacesSql')
const capitalize = require('../../../../utils/capitalize')

const createPurchasePlacesBridge = () => {
  const db = electronOpenDb()

  /**
   * @param {import('../../sql/purchasePlaces/types').CreatePurchasePlace} purchasePlace
   */
  const create = (purchasePlace) => {
    const purchasePlaceCreatedId = db.prepare(createPurchasePlacesSql(1)).run([
      null,
      capitalize(purchasePlace.name),
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
