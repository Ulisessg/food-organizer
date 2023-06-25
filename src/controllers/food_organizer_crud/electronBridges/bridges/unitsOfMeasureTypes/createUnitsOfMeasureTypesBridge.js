const { contextBridge } = require('electron')
const { createUnitsOfMeasureTypes } = require('../bridgesNames')
const electronOpenDb = require('../../../db/electronOpenDb')
const createUnitsOfMeasureTypeSql =
  require('../../../sql/unitsOfMeasureTypes/createUnitsOfMeasureTypeSql')
const getUnitsOfMeasureTypeSql =
  require('../../../sql/unitsOfMeasureTypes/getUnitsOfMeasureTypeSql')

const createUnitOfMeasureTypesBridge = () => {
  const db = electronOpenDb()

  /**
   * @param {import('../../../sql/unitsOfMeasureTypes/types').CreateUnitOfMeasureType} uomType
   */
  const create = (uomType) => {
    const unitOfMeasureTypeCreatedId = db.prepare(createUnitsOfMeasureTypeSql(1)).run([
      null,
      uomType.name
    ]).lastInsertRowid

    const unitOfMeasureTypeCreated = db
      .prepare(getUnitsOfMeasureTypeSql('WHERE units_of_measure_types.id = ?'))
      .get([unitOfMeasureTypeCreatedId])
    return unitOfMeasureTypeCreated
  }

  contextBridge.exposeInMainWorld(
    createUnitsOfMeasureTypes,
    create
  )
}

module.exports = createUnitOfMeasureTypesBridge
