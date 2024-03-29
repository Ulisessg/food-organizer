import { createSlice } from '@reduxjs/toolkit'
import createWeeklyMenuReducer from './reducers/createweeklyMenuReducer'
import getDaysReducer from './reducers/getDaysReducer'
import getWeeklyMenusReducer from './reducers/getWeeklyMenusReducer'
import initialState from './weeklyMenusState'
import restartPostDataReducer from './reducers/restartPostDataReducer'

const weeklyMenusSlice = createSlice({
  initialState,
  name: 'weekly_menus',
  reducers: {},
  // eslint-disable-next-line sort-keys
  extraReducers: (builder) => {
    getDaysReducer(builder)
    getWeeklyMenusReducer(builder)
    createWeeklyMenuReducer(builder)
    restartPostDataReducer(builder)
  }
})

export default weeklyMenusSlice.reducer
