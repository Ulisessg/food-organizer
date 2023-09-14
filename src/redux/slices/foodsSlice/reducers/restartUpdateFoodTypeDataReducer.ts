import { type TFoodState } from '../types'
import { type TReducerWBuilder } from 'redux/types'
import { restartUpdateFoodTypeData } from '../thunks'

const restartUpdateFoodTypeDataReducer: TReducerWBuilder<TFoodState> = (builder) => {
  builder.addCase(
    restartUpdateFoodTypeData.fulfilled,
    (state) => {
      state.updateFoodTypesEnd = false
      state.updateFoodTypesError = false
      state.updateFoodTypesIsLoading = false
      state.updateFoodTypesSuccess = false
    }
  )
}

export default restartUpdateFoodTypeDataReducer
