import { type AppDispatch, type RootState } from 'redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { type GetIngredientStock } from 'controllers/sql/ingredientStock/types'
import setFocusInElement from 'utils/setFocusInElement'
import
updateIngredientStockElectronCallback
  from 'redux/slices/ingredientsStockSlice/callbacks/electron/updateIngredientStockElectronCallback'
import { updateIngredientStockThunk } from 'redux/slices/ingredientsStockSlice/thunks'
import { useInputs } from 'd-system'

const useUpdateIngredientStock: TUseUpdateIngredientStock = ({ ingredient, elementIndex }) => {
  const dispatch: AppDispatch = useDispatch()
  const {
    updateRequestIsLoading
  } = useSelector((state: RootState) => state.ingredientsStock)
  const useInputsHook = useInputs(
    {
      update_ingredient_stock_comment: ingredient?.comment ?? '',
      update_ingredient_stock_qty: `${ingredient?.ingredient_qty}`
    },
    true
  )

  const disableUndoChanges =
   (useInputsHook
     .inputsInitialValues.get('update_ingredient_stock_comment') ===
      useInputsHook.inputsData.update_ingredient_stock_comment &&
    useInputsHook
      .inputsInitialValues.get('update_ingredient_stock_qty') ===
      useInputsHook.inputsData.update_ingredient_stock_qty) || updateRequestIsLoading

  const disableUpdateIngredientStock = disableUndoChanges ||
   useInputsHook.inputsErrors.update_ingredient_stock_qty || updateRequestIsLoading

  const undoChanges = (): void => {
    useInputsHook.restartInputs('all')
  }
  const updateIngredientStock = async (): Promise<void> => {
    const {
      update_ingredient_stock_comment,
      update_ingredient_stock_qty
    } = useInputsHook.inputsData
    const { updateInitialValue } = useInputsHook

    const updateResult =
     await dispatch(updateIngredientStockThunk(updateIngredientStockElectronCallback({
       ...ingredient,
       comment: update_ingredient_stock_comment,
       elementIndex,
       ingredient_qty: Number(update_ingredient_stock_qty)
     })))

    setFocusInElement('update_ingredient_stock_qty')
    if (updateResult.meta.requestStatus === 'fulfilled') {
      updateInitialValue(
        'update_ingredient_stock_comment',
        update_ingredient_stock_comment
      )
      updateInitialValue(
        'update_ingredient_stock_qty',
        update_ingredient_stock_qty
      )
      // Re disable buttons with updated values
      undoChanges()
    }
  }

  return {
    ...useInputsHook,
    disableUndoChanges,
    disableUpdateIngredientStock,
    undoChanges,
    updateIngredientStock
  }
}

export default useUpdateIngredientStock

type TUseUpdateIngredientStock = (arg0: {
  ingredient: GetIngredientStock[0]
  elementIndex: number
}) => UseUpdateIngredientStockReturn

interface UseUpdateIngredientStockReturn extends ReturnType<typeof useInputs<{
  update_ingredient_stock_qty: string
  update_ingredient_stock_comment: string
}>> {
  disableUndoChanges: boolean
  undoChanges: () => void
  disableUpdateIngredientStock: boolean
  updateIngredientStock: () => Promise<void>
}
