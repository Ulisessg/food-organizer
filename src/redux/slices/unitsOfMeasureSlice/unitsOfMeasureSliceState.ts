import {
  type GetUnitsOfMeasureData
} from 'controllers/sql/unitsOfMeasure/types'
import {
  type TGetUnitsOfMeasureType
} from 'controllers/sql/unitsOfMeasureTypes/types'
import { databaseSlicesCommonState } from '../databaseSlice/state'

const initialState: TUomState = {
  ...databaseSlicesCommonState,
  dataIsLoading: false,
  errorGettingData: false,
  postUomEnd: false,
  postUomError: false,
  postUomIsLoading: false,
  postUomSuccess: false,
  postUomtEnd: false,
  postUomtError: false,
  postUomtIsLoading: false,
  postUomtSuccess: false,
  requestEnd: false,
  unitsOfMeasureType: [],
  uom: [],
  uomGroupedByType: [],

  // Unit of measure
  updateUomEnd: false,
  updateUomError: false,
  updateUomIsLoading: false,
  updateUomSuccess: false,

  // Unit of measure type
  updateUomtEnd: false,
  updateUomtError: false,
  updateUomtIsLoading: false,
  updateUomtSuccess: false
}

export default initialState

export interface TUomState {
  uom: GetUnitsOfMeasureData['unitsOfMeasureGroupedByType'][0]['uom']
  uomGroupedByType: GetUnitsOfMeasureData['unitsOfMeasureGroupedByType']
  unitsOfMeasureType: TGetUnitsOfMeasureType
  // Get data
  dataIsLoading: boolean
  errorGettingData: boolean
  requestEnd: boolean
  // Post Uom
  postUomIsLoading: boolean
  postUomEnd: boolean
  postUomError: boolean
  postUomSuccess: boolean
  // Post Uomt
  postUomtIsLoading: boolean
  postUomtEnd: boolean
  postUomtError: boolean
  postUomtSuccess: boolean

  // Update uomt
  updateUomtIsLoading: boolean
  updateUomtEnd: boolean
  updateUomtError: boolean
  updateUomtSuccess: boolean

  // Update uom
  updateUomIsLoading: boolean
  updateUomEnd: boolean
  updateUomError: boolean
  updateUomSuccess: boolean
}
