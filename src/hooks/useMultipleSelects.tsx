/* eslint-disable max-lines-per-function */
import { ChangeEvent, MouseEvent, useState } from 'react'
import { defaultSelectValue } from 'utils/constants'
import randomId from 'utils/randomId'

const initialSelectId = randomId()
const useMultipleSelects = (): UseMultipleSelectsReturn => {
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
    const newId = randomId()
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

  const onChange = (ev: ChangeEvent<HTMLSelectElement>): void => {
    const selectId = ev.currentTarget.id
    const selectNextValue = ev.currentTarget.value
    let prevSelectValue: string = ''

    const newSelectValues: SelectsState['selectsValues'] =
     data.selectsValues.map((selVal, index) => {
       if (selVal.selectId === selectId) {
         prevSelectValue = data.selectsValues[index].value
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
    onChange
  }
}

export default useMultipleSelects

interface SelectsState {
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

interface UseMultipleSelectsReturn {
  onChange: (ev: ChangeEvent<HTMLSelectElement>) => void
  addSelect: () => void
  deleteSelect: (ev: MouseEvent<HTMLButtonElement>) => void
  data: SelectsState
}
