const { updateUnitsOfMeasure } = require('../bridgesNames')
const openDb = require('../../db/electronOpenDb')
const { contextBridge } = require('electron')
const updateUnitsOfMeasureSql = require('../../sql/unitsOfMeasure/updateUnitsOfMeasureSql')
const capitalize = require('../../../utils/capitalize')

const updateUnitsOfMeasureBridge = () => {
  const update = (unitOfMeasure) => {
    const db = openDb()
    const nameCapitalized = capitalize(unitOfMeasure.name)
    const abbreviationCapitalized = capitalize(unitOfMeasure.abbreviation)

    db.prepare(updateUnitsOfMeasureSql).run([
      nameCapitalized,
      abbreviationCapitalized,
      unitOfMeasure.uomt_id,
      unitOfMeasure.id
    ])
    return {
      ...unitOfMeasure,
      abbreviation: abbreviationCapitalized,
      name: nameCapitalized
    }
  }

  contextBridge.exposeInMainWorld(
    updateUnitsOfMeasure,
    update
  )
}

module.exports = updateUnitsOfMeasureBridge
