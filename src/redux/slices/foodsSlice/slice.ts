import createFoodReducer from './reducers/createFoodReducer'
import createFoodTypeReducer from './reducers/createFoodTypeReducer'
import { createSlice } from '@reduxjs/toolkit'
import databaseReducers from '../databaseSlice/databaseReducers'
import getFoodsDataReducer from './reducers/getFoodsDataReducer'
import initialState from './initialState'
import restartPostDataReducer from './reducers/restartPostDataReducer'
import
restartUpdateFoodTypeDataReducer
  from './reducers/restartUpdateFoodTypeDataReducer'
import updateFoodTypeReducer from './reducers/updateFoodTypeReducer'
import updateFoodsReducer from './reducers/updateFoodsReducer'

const foodsSlice = createSlice({
  initialState,
  name: 'foods',
  reducers: {},
  // eslint-disable-next-line sort-keys
  extraReducers: (builder) => {
    databaseReducers({
      builder: builder as any,
      name: 'foods'
    })
    getFoodsDataReducer(builder)
    createFoodReducer(builder)
    restartPostDataReducer(builder)
    createFoodTypeReducer(builder)
    updateFoodTypeReducer(builder)
    restartUpdateFoodTypeDataReducer(builder)
    updateFoodsReducer(builder)
  }
})

export default foodsSlice.reducer
