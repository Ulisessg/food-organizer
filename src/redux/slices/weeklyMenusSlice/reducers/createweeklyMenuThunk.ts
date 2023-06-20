import { type TReducerWBuilder } from 'redux/types'
import { type TWeeklyMenusState } from '../weeklyMenusState'
import { createWeeklyMenuThunk } from '../thunks'

const createWeeklyMenuReducer: TReducerWBuilder<TWeeklyMenusState> = (builder) => {
  // Create weekly menu
  builder.addCase(
    createWeeklyMenuThunk.pending,
    (state) => {
      state.createWeeklyEnd = false
      state.createWeeklyError = false
      state.createWeeklyIsLoading = true
      state.createWeeklySuccess = false
    }
  )
  builder.addCase(
    createWeeklyMenuThunk.rejected,
    (state) => {
      state.createWeeklyEnd = true
      state.createWeeklyError = true
      state.createWeeklyIsLoading = false
      state.createWeeklySuccess = false
    }
  )
  builder.addCase(
    createWeeklyMenuThunk.fulfilled,
    (state, action) => {
      state.createWeeklyEnd = true
      state.createWeeklyError = false
      state.createWeeklyIsLoading = false
      state.createWeeklySuccess = true
      state.weeklyMenus = [
        ...state.weeklyMenus,
        { ...action.payload.weeklyMenu[0] }
      ]
      state.sundaysOfWeeksWithMenus = [
        ...state.sundaysOfWeeksWithMenus,
        {
          date: action.payload.weeklyMenu[0].creation_date,
          index: state.weeklyMenus.length - 1
        }
      ]
    }
  )
}

export default createWeeklyMenuReducer
