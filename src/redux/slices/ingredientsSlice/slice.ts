import createIngredientReducer from './reducers/createIngredientReducer'
import { createSlice } from '@reduxjs/toolkit'
import getIngredientsDataReducer from './reducers/getIngredientsDataReducer'
import initialState from './initialState'
import restartPostStatusReducer from './reducers/restartPostStatusReducer'
import restartUpdateIngredientStatusReducer from './reducers/restartUpdateStatusReducer'
import updateIngredientReducer from './reducers/updateIngredientReducer'

const ingredientsSlice = createSlice({
  initialState,
  name: 'ingredients',
  reducers: {
  },
  // eslint-disable-next-line sort-keys
  extraReducers: (builder) => {
    getIngredientsDataReducer(builder)
    createIngredientReducer(builder)
    restartPostStatusReducer(builder)
    updateIngredientReducer(builder)
    restartUpdateIngredientStatusReducer(builder)
  }
})

export default ingredientsSlice.reducer
