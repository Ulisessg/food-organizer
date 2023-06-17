const { contextBridge } = require('electron')
const { getFoodsData } = require('./bridgesNames')
const electronOpenDb = require('../../db/electronOpenDb')
const getFoodsGroupedByTypeSql = require('../../sql/foods/getFoodsGroupedByTypeSql')

const getFoodsDataBridge = () => {
  const db = electronOpenDb()

  // eslint-disable-next-line padded-blocks
  const getData = () => {

    /**
     * @type {import('../../sql/foods/types').GetFoods}
     */
    const data = db.prepare(getFoodsGroupedByTypeSql).all()
    const dataParsed = data.map((foodGroup) => {
      const parsedFoods = JSON.parse(foodGroup.foods)
      return {
        ...foodGroup,
        foods: parsedFoods
      }
    })
    return dataParsed
  }

  contextBridge.exposeInMainWorld(
    getFoodsData,
    getData
  )
}

module.exports = getFoodsDataBridge
