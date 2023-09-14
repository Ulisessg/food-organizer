import { type AppDispatch, type RootState } from 'redux/store'
import {
  UpdateFoodTypeThunk,
  restartUpdateFoodTypeData
} from 'redux/slices/foodsSlice/thunks'
import { useDispatch, useSelector } from 'react-redux'
import { ModalUpdateDataContext } from 'context/ModalUpdateDataContext'
import setFocusInElement from 'utils/setFocusInElement'
import
updateFoodTypeElectronCallback
  from 'redux/slices/foodsSlice/callbacks/electron/updateFoodTypeElectronCallback'
import { useContext } from 'react'
import { useInputs } from 'd-system'

const useUpdateFoodsType =
(): UseUpdateFoodsTypeReturn => {
  const { groupingElementIndex } = useContext(ModalUpdateDataContext)
  const foodTypeSelected = useSelector((state: RootState) => state
    .foods.foodsGroupedByType[Number(groupingElementIndex)])

  const {
    updateFoodTypesIsLoading,
    updateFoodTypesSuccess
  } = useSelector((state: RootState) => state.foods)

  const dispatch: AppDispatch = useDispatch()
  const inputs = useInputs<Inputs>(
    {
      update_food_type: foodTypeSelected.food_type_name.toLowerCase()
    },
    true,
    (_ev, inputValue) => inputValue.toLowerCase()
  )
  const inputHasChanged: boolean = inputs.inputsInitialValues.get('update_food_type') !==
   inputs.inputsData.update_food_type

  const restartInputs = (): void => {
    inputs.restartInputs('all')
    setFocusInElement('update_food_type')
  }
  const updateFoodType = async (): Promise<void> => {
    const newFoodTypeName = inputs.inputsData.update_food_type
    const updateResult = await dispatch(UpdateFoodTypeThunk(updateFoodTypeElectronCallback(
      {
        id: foodTypeSelected.food_type_id,
        name: newFoodTypeName
      },
      groupingElementIndex as number
    )))
    if (updateResult.meta.requestStatus === 'fulfilled') {
      inputs.updateInitialValue(
        'update_food_type',
        newFoodTypeName
      )
      inputs.restartInputs('all')
      await dispatch(restartUpdateFoodTypeData())
    }
  }
  const disableUpdateButton: boolean = !inputHasChanged ||
  inputs.inputsErrors.update_food_type || updateFoodTypesIsLoading ||
   updateFoodTypesSuccess || inputs.inputsErrors.update_food_type

  return {
    ...inputs,
    disableRestartButton: !inputHasChanged || updateFoodTypesSuccess || updateFoodTypesIsLoading,
    disableUpdateButton,
    restartInputs,
    updateFoodType

  }
}

type Inputs = Record<'update_food_type', string>

interface UseUpdateFoodsTypeReturn extends ReturnType<typeof useInputs<Inputs>> {
  disableRestartButton: boolean
  restartInputs: () => void
  updateFoodType: () => Promise<void>
  disableUpdateButton: boolean
}

export default useUpdateFoodsType
