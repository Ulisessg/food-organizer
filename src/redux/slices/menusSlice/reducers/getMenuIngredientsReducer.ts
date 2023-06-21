import { type TMenuState } from '../types'
import { type TReducerWBuilder } from 'redux/types'
import { getMenusIngredientsThunk } from '../thunks'

const getMenuIngredientsReducer: TReducerWBuilder<TMenuState> = (builder) => {
  builder.addCase(
    getMenusIngredientsThunk.pending,
    (state) => {
      state.getMenusIngredientsIsLoading = true
      state.getMenusIngredientsError = false
      state.getMenusIngredientsSuccess = false
      state.getMenusIngredientsEnd = false
    }
  )

  builder.addCase(
    getMenusIngredientsThunk.rejected,
    (state) => {
      state.getMenusIngredientsIsLoading = false
      state.getMenusIngredientsError = true
      state.getMenusIngredientsSuccess = false
      state.getMenusIngredientsEnd = true
    }
  )
  builder.addCase(
    getMenusIngredientsThunk.fulfilled,
    (state, action) => {
      state.getMenusIngredientsIsLoading = false
      state.getMenusIngredientsError = false
      state.getMenusIngredientsSuccess = true
      state.getMenusIngredientsEnd = true
      state.menusIngredients = [...action.payload]
    }
  )
}

export default getMenuIngredientsReducer
