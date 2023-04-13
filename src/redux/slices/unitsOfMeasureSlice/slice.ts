import { createSlice } from '@reduxjs/toolkit'
import createUnitOfMeasureReducer from './reducers/createUnitOfMeasureReducer'
import createUnitOfMeasureTypeReducer from './reducers/createUnitOfMeasureTypeReducer'
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
    // Get data
    getUomDataReducer(builder)

    // Create
    createUnitOfMeasureReducer(builder)
    createUnitOfMeasureTypeReducer(builder)

    // Update
    updateUnitOfMeasureTypeReducer(builder)
    updateUnitOfMeasureReducer(builder)
  }
})

export default UnitsOfMeasureSlice.reducer
