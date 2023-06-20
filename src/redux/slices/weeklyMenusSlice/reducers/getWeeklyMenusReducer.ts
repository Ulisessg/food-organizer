import { type TReducerWBuilder } from 'redux/types'
import { type TWeeklyMenusState } from '../weeklyMenusState'
import getWeekRangeOfDates from 'utils/getWeekRangeOfDates'
import { getWeeklyMenusThunk } from '../thunks'

const getWeeklyMenusReducer: TReducerWBuilder<TWeeklyMenusState> = (builder) => {
  // Get weekly menus
  builder.addCase(
    getWeeklyMenusThunk.pending,
    (state) => {
      state.getWeeklyEnd = false
      state.getWeeklyError = false
      state.getWeeklyIsLoading = true
      state.getWeeklySuccess = false
    }
  )
  builder.addCase(
    getWeeklyMenusThunk.rejected,
    (state) => {
      state.getWeeklyEnd = true
      state.getWeeklyError = true
      state.getWeeklyIsLoading = false
      state.getWeeklySuccess = false
    }
  )
  builder.addCase(
    getWeeklyMenusThunk.fulfilled,
    (state, action) => {
      state.getWeeklyEnd = true
      state.getWeeklyError = false
      state.getWeeklyIsLoading = false
      state.getWeeklySuccess = true
      state.weeklyMenus = [...action.payload]
      const sundaysOfWeeksWithMenus: TWeeklyMenusState['sundaysOfWeeksWithMenus'] = action
        .payload.map((week, index) => {
          const { sundayDate } = getWeekRangeOfDates(week.creation_date)
          return {
            date: sundayDate,
            index
          }
        })
      state.sundaysOfWeeksWithMenus = [...sundaysOfWeeksWithMenus]
    }
  )
}

export default getWeeklyMenusReducer
