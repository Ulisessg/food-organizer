/* eslint-disable max-len */
const { contextBridge } = require('electron')
const bridgesNames = require('../bridgesNames')
const electronOpenDb = require('../../db/electronOpenDb')
const getUomGroupedByTypeSql = require('../../sql/unitsOfMeasure/getUnitsOfMeasureGroupedByTypeSql')
const getUnitsOfMeasureTypeSql = require('../../sql/unitsOfMeasureTypes/getUnitsOfMeasureTypeSql')

/**
 * @returns {import('../../../nextjs/unitsOfMeasureCRUD').GetUnitsOfMeasureData}
 *
 */

const getData = () => {
  const db = electronOpenDb()

  /**
   * @type {import('../../../nextjs/unitsOfMeasureCRUD').GetUnitsOfMeasureData['unitsOfMeasureGroupedByType']}
   */
  const uomGroupedByType = db.prepare(getUomGroupedByTypeSql()).all()

  /**
   * @type {import('../../../nextjs/unitsOfMeasureCRUD').GetUnitsOfMeasureData['unitsOfMeasureType']}
   */
  const unitsOfMeasureType = db.prepare(getUnitsOfMeasureTypeSql()).all()

  return {
    unitsOfMeasureGroupedByType: uomGroupedByType.map((uomt) => ({
      ...uomt,
      uom: JSON.parse(uomt.uom),
      uomAbbreviations: JSON.parse(uomt.uomAbbreviations),
      uomNames: JSON.parse(uomt.uomNames)
    }
    )),
    unitsOfMeasureType
  }
}

const getUomDataBridge = () => {
  contextBridge.exposeInMainWorld(
    bridgesNames.getUomData,
    getData

  )
}

module.exports = getUomDataBridge
