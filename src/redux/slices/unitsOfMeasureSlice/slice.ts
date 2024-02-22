/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice } from '@reduxjs/toolkit'
import createUnitOfMeasureReducer from './reducers/createUnitOfMeasureReducer'
import createUnitOfMeasureTypeReducer from './reducers/createUnitOfMeasureTypeReducer'
import databaseReducers from '../databaseSlice/databaseReducers'
import
getUnitsOfMeasureTypeWithoutUomReducer
  from './reducers/getUnitsOfMeasureTypeWithoutUomReducer'
import getUomDataReducer from './reducers/getUomDataReducer'
import initialState from './unitsOfMeasureSliceState'
import updateUnitOfMeasureReducer from './reducers/updateUnitOfMeasureReducer'
import updateUnitOfMeasureTypeReducer from './reducers/updateUnitOfMeasureTypeReducer'

const UnitsOfMeasureSlice = createSlice({
  initialState,
  name: 'units_of_measure',
  reducers: {

  },
  // eslint-disable-next-line sort-keys
  extraReducers: (builder) => {
    databaseReducers({
      builder: builder as any,
      name: 'units_of_measure'
    })
    // Get data
    getUomDataReducer(builder)
    getUnitsOfMeasureTypeWithoutUomReducer(builder)
    // Create
    createUnitOfMeasureReducer(builder)
    createUnitOfMeasureTypeReducer(builder)

    // Update

    // Units of measure types
    updateUnitOfMeasureTypeReducer(builder)

    updateUnitOfMeasureReducer(builder)
  }
})

export default UnitsOfMeasureSlice.reducer
