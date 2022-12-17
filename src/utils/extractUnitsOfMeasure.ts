import { GetUOM } from 'controllers/food_organizer_crud/unitsOfMeasureCRUD'

const extractUomNames = (uomList: GetUOM): GetUOM[0]['uom'] => {
  if (!Array.isArray(uomList)) throw new TypeError('Array type mus required')
  const result: GetUOM[0]['uom'] = []
  uomList.forEach((uomOrderByUomt) => {
    uomOrderByUomt.uom.forEach((uom) => {
      if (typeof uom.abbreviation !== 'string') {
        throw new
        TypeError(`Abbreviation property must be string type, value: ${uom.abbreviation as string}.
type: ${typeof uom.abbreviation}`)
      }
      if (typeof uom.name !== 'string') {
        throw new
        TypeError(`name property must be string type, value: ${uom.name as string}.
type: ${typeof uom.name}`)
      }
      if (typeof uom.id !== 'number' || !Number.isInteger(uom.id)) {
        throw new TypeError(`id property must be integer numer type, value: ${uom.id}.
type: ${typeof uom.id}`)
      }
      result.push(uom)
    })
  })
  return result
}

export default extractUomNames
