import UpdateIngredientStockReducer from './reducers/updateIngredientStockReducer'
import createIngredientStockReducer from './reducers/createIngredientStockReducer'
import { createSlice } from '@reduxjs/toolkit'
import databaseReducers from '../databaseSlice/databaseReducers'
import getIngredientsStockReducer from './reducers/getIngredientsStockReducer'
import initialState from './initialState'
import restartPostDataReducer from './reducers/restartPostDataReducer'

const ingredientsStockSlice = createSlice({
  initialState,
  name: 'ingredients_stock',
  reducers: {},
  // eslint-disable-next-line sort-keys
  extraReducers: (builder) => {
    databaseReducers({ builder: builder as any, name: 'ingredients_stock' })
    getIngredientsStockReducer(builder)
    createIngredientStockReducer(builder)
    restartPostDataReducer(builder)
    UpdateIngredientStockReducer(builder)
  }
})

export default ingredientsStockSlice.reducer
