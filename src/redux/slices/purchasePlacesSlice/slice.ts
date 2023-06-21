import createPurchasePlaceReducer from './reducers/createPurchasePlaceReducer'
import { createSlice } from '@reduxjs/toolkit'
import getPurchasePlacesReducer from './reducers/getPurchasePlacesReducer'
import initialState from './initialState'
import restartPostDataReducer from './reducers/restartPostDataReducer'

const purchasePlacesSlice = createSlice({
  initialState,
  name: 'purchase_places',
  reducers: {
  },
  // eslint-disable-next-line sort-keys
  extraReducers: (builder) => {
    getPurchasePlacesReducer(builder)
    createPurchasePlaceReducer(builder)
    restartPostDataReducer(builder)
  }
})

export default purchasePlacesSlice.reducer
