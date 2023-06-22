const { contextBridge } = require('electron')
const electronOpenDb = require('../../../db/electronOpenDb')
const { getPurchasePlacesData } = require('../bridgesNames')
const getPurchasePlacesSql = require('../../../sql/purchasePlaces/getPurchasePlacesSql')

const purchasePlacesDataBridge = () => {
  const db = electronOpenDb()

  /**
   * @returns {import('../../../sql/purchasePlaces/types').GetPurchasePlaces}
   */
  const getData = () => {
    const purchasePlacesData = db.prepare(getPurchasePlacesSql()).all()
    return purchasePlacesData
  }

  contextBridge.exposeInMainWorld(
    getPurchasePlacesData,
    getData
  )
}

module.exports = purchasePlacesDataBridge
