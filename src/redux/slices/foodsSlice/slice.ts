import createFoodReducer from './reducers/createFoodReducer'
import createFoodTypeReducer from './reducers/createFoodTypeReducer'
import { createSlice } from '@reduxjs/toolkit'
import getFoodsDataReducer from './reducers/getFoodsDataReducer'
import initialState from './initialState'
import restartPostDataReducer from './reducers/restartPostDataReducer'

const foodsSlice = createSlice({
  initialState,
  name: 'foods',
  reducers: {},
  // eslint-disable-next-line sort-keys
  extraReducers: (builder) => {
    getFoodsDataReducer(builder)
    createFoodReducer(builder)
    restartPostDataReducer(builder)
    createFoodTypeReducer(builder)
  }
})

export default foodsSlice.reducer
