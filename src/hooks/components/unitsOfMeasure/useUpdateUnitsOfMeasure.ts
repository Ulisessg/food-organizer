/* eslint-disable max-statements */
import { type AppDispatch, type RootState } from 'redux/store'
import {
  restartUpdateUnitsOfMeasureStatusThunk,
  updateUnitOfMeasureThunk
} from 'redux/slices/unitsOfMeasureSlice/thunks'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import
updateUnitsOfMeasureElectronCallback
  from 'redux/slices/unitsOfMeasureSlice/callbacks/electron/updateUnitsOfMeasureElectronCallback'
import { useInputs } from 'd-system'
import useValueIsRepeated from 'hooks/useValueIsRepeated'

const useUpdateUnitsOfMeasure: TUseUpdateUnitsOfMeasure = ({
  uomtId,
  name,
  abbreviation,
  uomId,
  unitsOfMeasure,
  elementIndex,
  groupingElementIndex
}) => {
  const [
    isCurrentUomUpdating,
    setIsCurrentUomUpdating
  ] = useState(false)
  const {
    updateUomIsLoading,
    updateUomSuccess
  } = useSelector((state: RootState) => state.unitsOfMeasure)
  const dispatch: AppDispatch = useDispatch()
  const searchNameIsRepeated = useValueIsRepeated(name)
  const searchAbbreviationIsRepeated = useValueIsRepeated(abbreviation)
  const inputsHook = useInputs(
    {
      abbreviation,
      name,
      uomt: uomtId
    },
    true,
    (ev, inputValue) => {
      if (ev.currentTarget.name === 'name') {
        updateNameIsRepeated(inputValue)
      }
      if (ev.currentTarget.name === 'abbreviation') {
        updateAbbreviationIsRepeated(inputValue)
      }
      return inputValue.toLowerCase()
    }
  )

  const someInputChange = (): boolean => {
    const { inputsData, inputsInitialValues } = inputsHook
    const initialName = (inputsInitialValues.get('name') as string).toLowerCase()
    const initialAbbreviation = (inputsInitialValues.get('abbreviation') as string).toLowerCase()
    const initialUnitOfMeasureType = inputsInitialValues.get('uomt')

    const currentName = inputsData.name.toLowerCase()
    const currentAbbreviation = inputsData.abbreviation.toLowerCase()
    const currentUnitOfMeasureType = inputsData.uomt

    return (
      initialName !== currentName ||
      initialAbbreviation !== currentAbbreviation ||
      initialUnitOfMeasureType !== currentUnitOfMeasureType
    )
  }

  const updateNameIsRepeated = (nameValue: string): void => {
    searchNameIsRepeated.searchIsRepeated(
      unitsOfMeasure,
      'name',
      nameValue
    )
  }
  const updateAbbreviationIsRepeated = (abbreviationValue: string): void => {
    searchAbbreviationIsRepeated.searchIsRepeated(
      unitsOfMeasure,
      'abbreviation',
      abbreviationValue
    )
  }

  const update: UseUpdateUnitsOfMeasureReturn['update'] = async () => {
    try {
      setIsCurrentUomUpdating(true)
      const {
        abbreviation: newAbbreviation,
        name: newName,
        uomt: newUomt
      } = inputsHook.inputsData
      const parsedUnitOfMeasureTypeId = parseInt(
        newUomt,
        10
      )
      const initialUnitOfMeasureTypeId = parseInt(
        inputsHook.inputsInitialValues.get('uomt') as string,
        10
      )
      await dispatch(updateUnitOfMeasureThunk(updateUnitsOfMeasureElectronCallback({
        data: {
          abbreviation: newAbbreviation,
          id: uomId,
          name: newName,
          uomt_id: parsedUnitOfMeasureTypeId
        },
        elementIndex,
        groupingElementIndex,
        initialUomtId: initialUnitOfMeasureTypeId
      })))

      inputsHook.updateInitialValue(
        'name',
        newName
      )
      inputsHook.updateInitialValue(
        'abbreviation',
        newAbbreviation
      )
      inputsHook.updateInitialValue(
        'uomt',
        newUomt
      )
      await dispatch(restartUpdateUnitsOfMeasureStatusThunk())

      setIsCurrentUomUpdating(false)
    } catch (error) {
      setIsCurrentUomUpdating(false)
      const err = error
      throw err
    }
  }

  const reset = (): void => {
    inputsHook.restartInputs('all')
  }
  const disableRestartButton = (): boolean => {
    if (!someInputChange() || updateUomIsLoading || updateUomSuccess) {
      return true
    }
    return false
  }
  const disableUpdateButton = (): boolean => {
    if (!someInputChange() || !inputsHook.formIsValid || updateUomIsLoading || updateUomSuccess) {
      return true
    }
    return false
  }

  useEffect(
    () => {
      // Force re render when inputsInitialValues updated
    },
    [inputsHook.inputsInitialValues]
  )
  return {
    ...inputsHook,
    abbreviationIsRepeated: searchAbbreviationIsRepeated.isRepeated,
    disableRestartButton: disableRestartButton(),
    disableUpdateButton: disableUpdateButton(),
    isCurrentUomUpdating,
    nameIsRepeated: searchNameIsRepeated.isRepeated,
    reset,
    update
  }
}

export default useUpdateUnitsOfMeasure

// Return type
interface UseUpdateUnitsOfMeasureReturn extends ReturnType<typeof useInputs<{
  abbreviation: string
  name: string
  uomt: string
}>> {
  nameIsRepeated: boolean
  abbreviationIsRepeated: boolean
  reset: () => void
  update: () => Promise<void>
  disableUpdateButton: boolean
  disableRestartButton: boolean
  isCurrentUomUpdating: boolean
}

type TUseUpdateUnitsOfMeasure =
(arg0: {
  uomtId: string
  name: string
  uomId: number
  abbreviation: string
  unitsOfMeasure: RootState['unitsOfMeasure']['uom']
  elementIndex: number
  groupingElementIndex: number
}
) => UseUpdateUnitsOfMeasureReturn
