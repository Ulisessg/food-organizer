import { type TReducerWBuilder } from 'redux/types'
import { type TWeeklyMenusState } from '../weeklyMenusState'
import { restartPostWeeklyMenu } from '../thunks'

const restartPostDataReducer: TReducerWBuilder<TWeeklyMenusState> = (builder) => {
  // Restart post data
  builder.addCase(
    restartPostWeeklyMenu.fulfilled,
    (state) => {
      state.createWeeklyEnd = false
      state.createWeeklyError = false
      state.createWeeklyIsLoading = false
      state.createWeeklySuccess = false
    }
  )
}

export default restartPostDataReducer
