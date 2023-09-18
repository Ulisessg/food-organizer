/* eslint-disable max-statements */
/* eslint-disable padded-blocks */
import { type AppDispatch, type RootState } from 'redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { type SingleFood } from 'redux/slices/foodsSlice/types'
import { updateFoodThunk } from 'redux/slices/foodsSlice/thunks'
import
updateFoodsElectronCallback
  from 'redux/slices/foodsSlice/callbacks/electron/updateFoodsElectronCallback'
import { useInputs } from 'd-system'

const useUpdateFood: TUseUpdateFood = ({
  food,
  food_type_id,
  elementIndex,
  groupingElementIndex
}) => {
  const { updateFoodsIsLoading } = useSelector((state: RootState) => state.foods)
  const dispatch: AppDispatch = useDispatch()

  const { inputsData, inputsInitialValues, ...inputs } = useInputs<Inputs>(
    {
      update_food_image: food.image ?? '',
      update_food_name: food.food_name,
      update_food_type: `${food_type_id}`,
      update_prep_time: `${food.preparation_time}`
    },
    true,
    (ev, inputValue) => {
      if (ev.currentTarget.name === 'update_prep_time') {

        /** Avoid exponents and characters */
        const parsedValue = parseInt(
          inputValue,
          10
        )
        if (isNaN(parsedValue)) return ''
        return `${parsedValue}`
      }
      return inputValue
    }
  )

  const restartInputs = (): void => {
    inputs.restartInputs('all')
  }

  const selectImage = async (): Promise<void> => {
    const image = await window.selectImage('foods')
    if (image.fileName !== '') {
      inputs.updateInput(
        'update_food_image',
        image.fileName
      )
    }
  }

  const updateFood = async (): Promise<void> => {
    const { update_food_image, update_food_name, update_prep_time } = inputsData
    const updateResult = await dispatch(updateFoodThunk(updateFoodsElectronCallback(
      {
        food_type_id: parseInt(
          inputsData.update_food_type,
          10
        ),
        id: food.food_id,
        image: update_food_image,
        name: update_food_name,
        preparation_time: parseInt(
          update_prep_time,
          10
        )
      },
      groupingElementIndex,
      elementIndex
    )))
    if (updateResult.meta.requestStatus === 'fulfilled') {
      inputs.updateInitialValue(
        'update_food_image',
        update_food_image
      )
      inputs.updateInitialValue(
        'update_food_name',
        update_food_name
      )
      inputs.updateInitialValue(
        'update_prep_time',
        update_prep_time
      )
      restartInputs()
    }
  }

  const imageInputHasChanged =
    inputsInitialValues.get('update_food_image') !== inputsData.update_food_image
  const inputsHasChanged =
    imageInputHasChanged ||
    inputsInitialValues.get('update_food_name') !== inputsData.update_food_name ||
    inputsInitialValues.get('update_prep_time') !== inputsData.update_prep_time ||
    inputsInitialValues.get('update_food_type') !== inputsData.update_food_type

  const disableRestartButton = !inputsHasChanged ||
  updateFoodsIsLoading

  const disableUpdateButton = !inputsHasChanged ||
   inputsData.update_prep_time === '' ||
   updateFoodsIsLoading

  return {
    ...inputs,
    disableRestartButton,
    disableUpdateButton,
    imageInputHasChanged,
    inputsData,
    inputsHasChanged,
    inputsInitialValues,
    restartInputs,
    selectImage,
    updateFood
  }
}

type Inputs =
Record<'update_food_name' | 'update_food_image' | 'update_prep_time' | 'update_food_type', string>

type TUseUpdateFood = (arg0: {
  food: SingleFood
  food_type_id: number
  elementIndex: number
  groupingElementIndex: number
}) => UseUpdateFoodReturn

interface UseUpdateFoodReturn extends ReturnType<typeof useInputs<Inputs>> {
  inputsHasChanged: boolean
  disableRestartButton: boolean
  disableUpdateButton: boolean
  selectImage: () => Promise<void>
  imageInputHasChanged: boolean
  restartInputs: () => void
  updateFood: () => Promise<void>
}

export default useUpdateFood
