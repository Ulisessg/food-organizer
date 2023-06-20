import { type TReducerWBuilder } from 'redux/types'
import { type TWeeklyMenusState } from '../weeklyMenusState'
import { getDaysThunk } from '../thunks'

const getDaysReducer: TReducerWBuilder<TWeeklyMenusState> = (builder) => {
  builder.addCase(
    getDaysThunk.pending,
    (state) => {
      state.getDaysEnd = false
      state.getDaysError = false
      state.getDaysIsLoading = true
      state.getDaysSuccess = false
    }
  )
  builder.addCase(
    getDaysThunk.rejected,
    (state) => {
      state.getDaysEnd = true
      state.getDaysError = true
      state.getDaysIsLoading = false
      state.getDaysSuccess = false
    }
  )
  builder.addCase(
    getDaysThunk.fulfilled,
    (state, action) => {
      state.getDaysEnd = true
      state.getDaysError = false
      state.getDaysIsLoading = false
      state.getDaysSuccess = true

      state.days = [...action.payload]
    }
  )
}

export default getDaysReducer
