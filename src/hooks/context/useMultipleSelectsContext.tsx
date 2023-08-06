/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import { useRef, useState } from 'react'
import { defaultSelectValue } from 'utils/constants'
import randomId from 'utils/randomId'

const useMultipleSelectsContext = (
  idPrefix?: string,

  /** Required to correct function of 'disableButton' value */
  optionsLenght?: number
): UseMultipleSelectsReturn => {
  const initialValues = useRef<Map<string, string>>(new Map<string, string>())

  const [
    data,
    setData
  ] = useState<SelectsState>({
    selects: [],

    valuesUsed: []
  })

  const addSelect = (initialValue?: string): void => {
    const newId = randomId(idPrefix)
    let value = defaultSelectValue
    setData((prev) => {
      const valuesUsed = [...prev.valuesUsed]
      if (typeof initialValue === 'string') {
        valuesUsed.push(initialValue)
        value = initialValue
      }
      initialValues.current.set(
        newId,
        value
      )

      return ({
        ...prev,
        selects: [
          ...prev.selects,
          {
            prevValue: defaultSelectValue,
            selectId: newId,
            value
          }
        ],
        valuesUsed
      })
    })
  }

  const deleteSelect: UseMultipleSelectsReturn['deleteSelect'] =
  (selectId: string, selectValue: string): void => {
    setData((prev) => ({
      ...prev,
      selects: [...prev.selects.filter((sel) => sel.selectId !== selectId)],
      valuesUsed: [...prev.valuesUsed.filter((val) => val !== selectValue)]
    }))
  }

  const resetMultipleSelect = (): void => {
    const resetSelectsData: SelectsState['selects'] = [
      {
        prevValue: defaultSelectValue,
        selectId: data.selects[0].selectId,
        value: defaultSelectValue
      }
    ]
    setData((prev) => ({
      ...prev,
      selects: resetSelectsData,
      valuesUsed: []
    }))
  }

  const onChange: UseMultipleSelectsReturn['onChange'] =
   (newValue, selectIndex): void => {
     const newSelectValues: SelectsState['selects'] = [...data.selects]
     const prevData = newSelectValues[Number(selectIndex)]

     newSelectValues[Number(selectIndex)] = {
       ...prevData,
       prevValue: prevData.value,
       value: newValue
     }
     setData((prev) => ({
       ...data,
       selects: [...newSelectValues],
       valuesUsed: [
         ...prev.valuesUsed.filter((valueUsed) => valueUsed !== prevData.value),
         newValue
       ]
     }))
   }

  return {
    addSelect,
    data,
    deleteSelect,
    disableButton: data.selects.length === optionsLenght,
    initialValues: initialValues.current,
    onChange,
    resetMultipleSelect
  }
}

export default useMultipleSelectsContext

export interface SelectsState {
  selects: Array<{
    selectId: string
    value: string
    prevValue: string
  }>
  valuesUsed: string[]
}

export interface UseMultipleSelectsReturn {
  onChange: (newValue: string, selectIndex: number) => void
  addSelect: (value?: string) => void
  deleteSelect: (selectId: string, selectValue: string, selectIndex: number) => void
  data: SelectsState
  resetMultipleSelect: () => void
  disableButton: boolean
  initialValues: Map<string, string>
}
