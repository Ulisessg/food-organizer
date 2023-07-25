/* eslint-disable max-lines-per-function */
import { type AppDispatch, type RootState } from 'redux/store'
import { createMenuThunk, restartPostMenuThunk } from 'redux/slices/menusSlice/thunks'
import { useDispatch, useSelector } from 'react-redux'
import { type CreateMenu } from 'controllers/nextjs/MenuCRUD'
import { type MouseEvent } from 'react'
import
createMenuElectronCallback
  from 'redux/slices/menusSlice/callbacks/electron/createMenuElectronCallback'
import { useInputs } from 'd-system'
import type useMultipleSelects from 'hooks/context/useMultipleSelectsContext'

const useCreateMenu = (
  foodsUsed: string[],
  restartMultuipleSelects: ReturnType<typeof useMultipleSelects>['resetMultipleSelect']
): TUseCreateMenuReturn => {
  const menusData = useSelector((state: RootState) => state.menus)
  const dispatch: AppDispatch = useDispatch()
  const { inputsData, onChange } = useInputs(
    {
      menu_comment: ''
    },
    false
  )

  const formIsValid = (): boolean => {
    if (foodsUsed.length > 0 && !menusData.createMenuSuccess) return true
    return false
  }

  const createMenu: TUseCreateMenuReturn['createMenu'] = async (ev) => {
    const foodsSelectedData: CreateMenu['foods'] = []

    const formElement = ev.currentTarget.form as HTMLFormElement
    foodsUsed.forEach((foodUsed) => {
      const foodId = parseInt(
        formElement
          .querySelector(`option[value="${foodUsed}"]`)?.getAttribute('data-food-id') as string,
        10
      )

      foodsSelectedData.push({
        food_id: foodId
      })
    })
    const requestResult = await dispatch(createMenuThunk(createMenuElectronCallback({
      comment: inputsData.menu_comment,
      foods: foodsSelectedData
    })))

    if (typeof (requestResult as any).error === 'undefined') {
      // Restart form
      formElement.reset()
      restartMultuipleSelects()
      await dispatch(restartPostMenuThunk())
    }
  }

  return {
    createMenu,
    disableButton: !formIsValid(),
    inputsData,
    onChange
  }
}

export default useCreateMenu

interface TUseCreateMenuReturn {
  inputsData: {
    menu_comment: string
  }
  onChange: ReturnType<typeof useInputs>['onChange']
  disableButton: boolean
  createMenu: (ev: MouseEvent<HTMLButtonElement>) => Promise<void>
}
