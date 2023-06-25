import { type TMenuState } from '../types'
import { type TReducerWBuilder } from 'redux/types'
import { createMenuThunk } from '../thunks'

const createMenuReducer: TReducerWBuilder<TMenuState> = (builder) => {
  builder.addCase(
    createMenuThunk.pending,
    (state) => {
      state.createMenuIsLoading = true
      state.createMenuEnd = false
      state.createMenuError = false
      state.createMenuSuccess = false
      state.errorCreatingMenu = false
      state.errorCreatingMenuFoods = false
    }
  )
  builder.addCase(
    createMenuThunk.rejected,
    (state, action) => {
      state.createMenuIsLoading = false
      state.createMenuEnd = true
      state.createMenuError = true
      state.createMenuSuccess = false
      state.errorCreatingMenu = action.payload?.createMenuError as boolean
      state.errorCreatingMenuFoods = action.payload?.createMenuFoodsError as boolean
    }
  )
  builder.addCase(
    createMenuThunk.fulfilled,
    (state, action) => {
      state.createMenuIsLoading = false
      state.createMenuEnd = true
      state.createMenuError = false
      state.createMenuSuccess = true

      state.menus = [
        ...state.menus,
        {
          ...action.payload
        }
      ]
    }
  )
}

export default createMenuReducer
