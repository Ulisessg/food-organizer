const { contextBridge } = require('electron')
const { createUnitsOfMeausure } = require('../bridgesNames')
const electronOpenDb = require('../../db/electronOpenDb')
const createUnitsOfMeasureSql = require('../../sql/unitsOfMeasure/createUnitsOfMeasureSql')
const getUnitsOfMeasureSql = require('../../sql/unitsOfMeasure/getunitsOfmeasureSql')
const capitalize = require('../../../utils/capitalize')

const createUnitsOfMeasureBridge = () => {
  const db = electronOpenDb()

  /**
   * @param {import('../../sql/unitsOfMeasure/types').CreateUom} unitOfMeasure
   */
  const create = (unitOfMeasure) => {
    const uomCreatedId = db.prepare(createUnitsOfMeasureSql(1))
      .run([
        null,
        capitalize(unitOfMeasure.name),
        capitalize(unitOfMeasure.abbreviation),
        unitOfMeasure.uomt_id
      ]).lastInsertRowid
    const uomcreated = db
      .prepare(getUnitsOfMeasureSql('WHERE units_of_measure.id = ?'))
      .get([uomCreatedId])
    return uomcreated
  }
  contextBridge.exposeInMainWorld(
    createUnitsOfMeausure,
    create
  )
}

module.exports = createUnitsOfMeasureBridge
