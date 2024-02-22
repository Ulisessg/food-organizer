import { type DatabaseSliceState } from 'redux/types'

export const databaseSlicesCommonState: DatabaseSliceState = {
  createEnds: false,
  createError: false,
  createInit: false,
  createSuccess: false,

  deleteEnds: false,
  deleteError: false,
  deleteInit: false,
  deleteSuccess: false,

  getEnds: false,
  getError: false,
  getInit: false,
  getSuccess: false,

  updateEnds: false,
  updateError: false,
  updateInit: false,
  updateSuccess: false
}
