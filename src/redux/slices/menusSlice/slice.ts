import createMenuReducer from './reducers/createMenuReducer'
import { createSlice } from '@reduxjs/toolkit'
import databaseReducers from '../databaseSlice/databaseReducers'
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
    databaseReducers({ builder: builder as any, name: 'menus' })
    getMenusReducer(builder)
    getMenuIngredientsReducer(builder)
    createMenuReducer(builder)
    restartPostDataReducer(builder)
  }
})
export default menusSlice.reducer
