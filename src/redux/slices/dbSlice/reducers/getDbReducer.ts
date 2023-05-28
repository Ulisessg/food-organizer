import { type DbState } from '../slice'
import { type TReducerWBuilder } from 'redux/types'
import { getDbThunk } from '../thunks'

const getDbReducer: TReducerWBuilder<DbState> = (builder) => {
  builder.addCase(
    getDbThunk.fulfilled,
    (state, action) => {
      state.getDbError = false
      state.getDbIsLoading = false
      state.getDbSucess = true
      state.dbMethods = action.payload
    }
  )
  builder.addCase(
    getDbThunk.rejected,
    (state) => {
      state.getDbError = true
      state.getDbIsLoading = false
      state.getDbSucess = false
    }
  )
}

export default getDbReducer
