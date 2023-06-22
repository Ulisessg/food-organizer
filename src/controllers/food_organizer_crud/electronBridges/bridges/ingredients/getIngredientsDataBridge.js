const { contextBridge } = require('electron')
const { getIngredientsData } = require('../bridgesNames')
const electronOpenDb = require('../../../db/electronOpenDb')
const getIngredientsSql = require('../../../sql/ingredients/getIngredientsSql')

const getIngredientsDataBridge = () => {
  const db = electronOpenDb()
  // eslint-disable-next-line padded-blocks
  const getData = () => {

    /**
     * @type {import('../../../sql/ingredients/types').GetIngredients}
     */
    const data = db.prepare(getIngredientsSql()).all()
    const dataTransformed = data.map((ingr) => ({
      ...ingr,
      ingr_purchase_places: JSON.parse(ingr.ingr_purchase_places)
    }))
    return dataTransformed
  }

  contextBridge.exposeInMainWorld(
    getIngredientsData,
    getData
  )
}

module.exports = getIngredientsDataBridge
