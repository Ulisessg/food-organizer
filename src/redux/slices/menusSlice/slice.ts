import createMenuReducer from './reducers/createMenuReducer'
import { createSlice } from '@reduxjs/toolkit'
import getMenuIngredientsReducer from './reducers/getMenuIngredientsReducer'
import getMenusReducer from './reducers/getMenusReducer'
import initialState from './initialState'
import restartPostDataReducer from './reducers/restartPostDataReducer'

const menusSlice = createSlice({
  initialState,
  name: 'menus',
  reducers: {},
  // eslint-disable-next-line sort-keys
  extraReducers: (builder) => {
    getMenusReducer(builder)
    getMenuIngredientsReducer(builder)
    createMenuReducer(builder)
    restartPostDataReducer(builder)
  }
})
export default menusSlice.reducer
