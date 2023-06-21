import { type TMenuState } from '../types'
import { type TReducerWBuilder } from 'redux/types'
import { getMenusDataThunk } from '../thunks'

const getMenusReducer: TReducerWBuilder<TMenuState> = (builder) => {
  builder.addCase(
    getMenusDataThunk.pending,
    (state) => {
      state.getMenusDataEnd = false
      state.getMenusDataError = false
      state.getMenusDataIsLoading = true
      state.getMenusDataSuccess = false
    }
  )
  builder.addCase(
    getMenusDataThunk.rejected,
    (state) => {
      state.getMenusDataEnd = true
      state.getMenusDataError = true
      state.getMenusDataIsLoading = false
      state.getMenusDataSuccess = false
    }
  )
  builder.addCase(
    getMenusDataThunk.fulfilled,
    (state, action) => {
      state.getMenusDataEnd = true
      state.getMenusDataSuccess = true
      state.getMenusDataError = false
      state.getMenusDataIsLoading = false

      state.menus = [...action.payload]
    }
  )
}

export default getMenusReducer
