const { contextBridge } = require('electron')
const { createUnitsOfMeausure } = require('../bridgesNames')
const electronOpenDb = require('../../../db/electronOpenDb')
const createUnitsOfMeasureSql = require('../../../sql/unitsOfMeasure/createUnitsOfMeasureSql')
const getUnitsOfMeasureGroupedByTypeSql =
  require('../../../sql/unitsOfMeasure/getUnitsOfMeasureGroupedByTypeSql')

const createUnitsOfMeasureBridge = () => {
  const db = electronOpenDb()

  /**
   * @param {import('../../../sql/unitsOfMeasure/types').CreateUom} unitOfMeasure
   */
  const create = (unitOfMeasure) => {
    const uomCreatedId = db.prepare(createUnitsOfMeasureSql(1))
      .run([
        null,
        unitOfMeasure.name,
        unitOfMeasure.abbreviation,
        unitOfMeasure.uomt_id
      ])
    const uomcreated = db
      .prepare(getUnitsOfMeasureGroupedByTypeSql('WHERE units_of_measure.id = ?'))
      .get([uomCreatedId])
    return uomcreated
  }
  contextBridge.exposeInMainWorld(
    createUnitsOfMeausure,
    create
  )
}

module.exports = createUnitsOfMeasureBridge
