/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import {
  type ChangeEvent,
  type MouseEvent, useState
} from 'react'
import { defaultSelectValue } from 'utils/constants'
import randomId from 'utils/randomId'
import safeArrayGet from 'utils/safeArrayGet'

const initialSelectId = randomId()
const useMultipleSelects = (
  idPrefix?: string,

  /** Required to correct function of 'disableButton' value */
  optionsLenght?: number
): UseMultipleSelectsReturn => {
  const [
    data,
    setData
  ] = useState<SelectsState>({
    selects: [{ selectId: initialSelectId }],
    selectsValues: [
      {
        prevValue: defaultSelectValue,
        selectId: initialSelectId,
        value: defaultSelectValue
      }
    ],
    valuesUsed: []
  })

  const addSelect = (): void => {
    const newId = randomId(idPrefix)
    setData((prev) => ({
      ...prev,
      selects: [
        ...prev.selects,
        {
          selectId: newId
        }
      ],
      selectsValues: [
        ...prev.selectsValues,
        {
          prevValue: defaultSelectValue,
          selectId: newId,
          value: defaultSelectValue
        }
      ]
    }))
  }

  const deleteSelect = (ev: MouseEvent<HTMLButtonElement>): void => {
    const selectId: string = ev.currentTarget.getAttribute('data-select-id') as string
    const selectElement = document.getElementById(selectId) as HTMLSelectElement

    setData((prev) => ({
      ...prev,
      selects: [...prev.selects.filter((sel) => sel.selectId !== selectId)],
      selectsValues: [...prev.selectsValues.filter((sel) => sel.selectId !== selectId)],
      valuesUsed: [...prev.valuesUsed.filter((val) => val !== selectElement.value)]
    }))
  }

  const resetMultipleSelect = (): void => {
    const resetSelectsData = [data.selects[0]]
    setData((prev) => ({
      ...prev,
      selects: resetSelectsData,
      selectsValues: [
        {
          ...prev.selectsValues[0],
          prevValue: defaultSelectValue,
          value: defaultSelectValue
        }
      ],
      valuesUsed: []
    }))
  }

  const onChange: UseMultipleSelectsReturn['onChange'] = (ev): void => {
    const selectId = ev.currentTarget.id
    const selectNextValue = ev.currentTarget.value
    let prevSelectValue: string = ''

    const newSelectValues: SelectsState['selectsValues'] =
     data.selectsValues.map((selVal, index) => {
       if (selVal.selectId === selectId) {
         prevSelectValue = safeArrayGet(
           data.selectsValues,
           index
         ).value
         return {
           prevValue: prevSelectValue,
           selectId: selVal.selectId,
           value: selectNextValue
         }
       }
       return {
         ...selVal
       }
     })

    setData((prev) => ({
      ...data,
      selectsValues: [...newSelectValues],
      valuesUsed: [
        ...prev.valuesUsed.filter((valUsed) => valUsed !== prevSelectValue),
        selectNextValue
      ]
    }))
  }

  return {
    addSelect,
    data,
    deleteSelect,
    disableButton: data.selects.length === optionsLenght,
    onChange,
    resetMultipleSelect
  }
}

export default useMultipleSelects

export interface SelectsState {
  selects: Array<{
    selectId: string
  }>
  selectsValues: Array<{
    selectId: string
    value: string
    prevValue: string
  }>
  valuesUsed: string[]
}

export interface UseMultipleSelectsReturn {
  onChange: (ev: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void
  addSelect: () => void
  deleteSelect: (ev: MouseEvent<HTMLButtonElement>) => void
  data: SelectsState
  resetMultipleSelect: () => void
  disableButton: boolean
}
