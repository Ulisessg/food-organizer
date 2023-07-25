const { updateUnitsOfMeasureTypes } = require('../bridgesNames')
const openDb = require('../../db/electronOpenDb')
const { contextBridge } = require('electron')
const updateUnitsOfMeasureTypesSql =
  require('../../sql/unitsOfMeasureTypes/updateUnitsOfMeasureTypesSql')
const capitalize = require('../../../utils/capitalize')

const updateUnitsOfMeasureTypesElectronBridge = () => {
  const update = (unitOfMeasureType) => {
    const db = openDb()
    const capitalizedName = capitalize(unitOfMeasureType.name)
    const updateChanges = db.prepare(updateUnitsOfMeasureTypesSql).run([
      capitalizedName,
      unitOfMeasureType.id
    ]).changes
    if (updateChanges === 0) {
      throw new Error('No updates')
    }
    return {
      ...unitOfMeasureType,
      name: capitalizedName
    }
  }

  contextBridge.exposeInMainWorld(
    updateUnitsOfMeasureTypes,
    update
  )
}

module.exports = updateUnitsOfMeasureTypesElectronBridge
