import { type AppDispatch, type RootState } from 'redux/store'
import { type FormEvent, type MouseEvent, useEffect } from 'react'
import {
  restartUpdateUnitOfMeasureTypeStatusThunk,
  updateUomtThunk
} from 'redux/slices/unitsOfMeasureSlice/thunks'
import { useDispatch, useSelector } from 'react-redux'
import
UpdateUnitsOfMeasureTypesElectronCallback
  from
  'redux/slices/unitsOfMeasureSlice/callbacks/electron/updateUnitsOfMeasureTypesElectonCallback'
import { type units_of_measure_types } from 'controllers/dbTablesTypes'
import { useInputs } from 'd-system'
import useValueIsRepeated from 'hooks/useValueIsRepeated'

const useUpdateUnitOfMeasureType: TUseUpdateUnitOfMeasureType = (uomtData) => {
  const dispatch: AppDispatch = useDispatch()
  const searchValueRepeated = useValueIsRepeated(uomtData.uomT.name)
  const {
    updateUomtIsLoading,
    updateUomtSuccess
  } = useSelector((state: RootState) => state.unitsOfMeasure)

  const inputsHook = useInputs(
    {
      name: uomtData.uomT.name
    },
    true,
    (_ev, inputValue) => {
      searchValueRepeated.searchIsRepeated(
        uomtData.uomtExistent,
        'name',
        inputValue
      )
      return inputValue.toLowerCase()
    }
  )

  const update: UseUpdateUnitOfMeasureTypeReturn['update'] = async (ev) => {
    try {
      ev.preventDefault()
      await dispatch(updateUomtThunk(UpdateUnitsOfMeasureTypesElectronCallback({
        data: {
          id: uomtData.uomT.id,
          name: inputsHook.inputsData.name
        },
        elementIndex: null,
        groupingElementIndex: uomtData.groupingElementIndex
      })))
      inputsHook.updateInitialValue(
        'name',
        inputsHook.inputsData.name
      )
      await dispatch(restartUpdateUnitOfMeasureTypeStatusThunk())
    } catch (error) {
      const err = error as Error
      throw err
    }
  }

  const disableUpdateButton = (): boolean => {
    const initialNameValue = (inputsHook.inputsInitialValues.get('name') as string).toLowerCase()
    return !inputsHook.formIsValid ||
     inputsHook.inputsData.name.toLowerCase() === initialNameValue ||
     updateUomtIsLoading ||
     updateUomtSuccess
  }

  const disableRestartButton = (): boolean => {
    const initialNameValue = (inputsHook.inputsInitialValues.get('name') as string).toLowerCase()
    return (inputsHook.inputsData.name.toLowerCase() === initialNameValue) ||
    updateUomtIsLoading ||
    updateUomtSuccess
  }

  const reset = (): void => {
    inputsHook.restartInputs('name')
  }

  useEffect(
    () => {
      // Force re render when inputsInitialValues updated
    },
    [inputsHook.inputsInitialValues]
  )

  return {
    ...inputsHook,
    disableRestartButton: disableRestartButton(),
    disableUpdateButton: disableUpdateButton(),
    nameIsRepeated: searchValueRepeated.isRepeated,
    reset,
    update
  }
}

export default useUpdateUnitOfMeasureType

type TUseUpdateUnitOfMeasureType =
  (arg0: {
    uomT: {
      name: string
      id: number
    }
    uomtExistent: units_of_measure_types[]
    groupingElementIndex: number
  }) => UseUpdateUnitOfMeasureTypeReturn

interface UseUpdateUnitOfMeasureTypeReturn extends ReturnType<typeof useInputs<{
  name: string
}>> {
  update: (ev: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>) => Promise<void>
  nameIsRepeated: boolean
  disableUpdateButton: boolean
  disableRestartButton: boolean
  reset: () => void
}
