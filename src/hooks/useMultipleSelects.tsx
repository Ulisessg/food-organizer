/* eslint-disable max-lines-per-function */
import {
  ButtonAddSelect,
  ButtonDeleteSelect,
  Container as MultipleSelectsContainer
} from 'components/common/MultipleSelects'
import {
  type ChangeEvent,
  type ComponentPropsWithoutRef, type FC, Fragment, type MouseEvent, useState
} from 'react'
import { Select } from 'd-system'
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

  const MultipleSelectsComponent: UseMultipleSelectsReturn['Component'] = (props) => <Fragment>
    {data.selects.map(({ selectId }, indx) => <Fragment key={randomId()}>
      {indx === 0 &&
      <Select
        {...props.selectProps}
        id={data.selectsValues[indx].selectId}
        label={props.label}
        name={randomId()}
        key={randomId()}
        onChange={onChange}
        value={data.selectsValues[indx].value}>
          <option value={defaultSelectValue} disabled key={randomId()}>{defaultSelectValue}</option>
          {props.options.map((opt) => {
            const value = opt[props.optionValueKeyName]
            return <option
                {...props.optionProps}
                key={randomId()}
                value={opt[props.optionValueKeyName]}
                disabled={typeof data.valuesUsed.find((vUsed) => vUsed === value) !== 'undefined'}
                >
                  {value}
                </option>
          })}
      </Select>}
      {indx !== 0 && <MultipleSelectsContainer key={randomId()}>
          <Select
            {...props.selectProps}
            id={data.selectsValues[indx].selectId}
            label={props.label}
            name={randomId()}
            key={randomId() + randomId()}
            onChange={onChange}
            value={data.selectsValues[indx].value}
            >
              <option value={defaultSelectValue} disabled key={randomId()}>
                {defaultSelectValue}
              </option>
              {props.options.map((opt) => {
                const value = opt[props.optionValueKeyName]
                return <option
                {...props.optionProps}
                key={randomId()}
                value={opt[props.optionValueKeyName]}
                disabled={typeof data.valuesUsed.find((vUsed) => vUsed === value) !== 'undefined'}
                >
                  {value}
                </option>
              })}
          </Select>
          <ButtonDeleteSelect
            data-select-id={selectId}
            onClick={deleteSelect}
          />
        </MultipleSelectsContainer>}
    </Fragment>)}
    <ButtonAddSelect
      disabled={data.selects.length === props.options.length}
      text={props.addSelectButtonText}
      onClick={addSelect}
    />
  </Fragment>

  return {
    Component: MultipleSelectsComponent,
    addSelect,
    data,
    deleteSelect,
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
  onChange: (ev: ChangeEvent<HTMLSelectElement>) => void
  addSelect: () => void
  deleteSelect: (ev: MouseEvent<HTMLButtonElement>) => void
  data: SelectsState
  Component: FC<{
    selectProps?: ComponentPropsWithoutRef<'select'>
    optionProps?: ComponentPropsWithoutRef<'option'>
    options: Array<{
      id: number
      [k: string]: any
    }>
    label: string
    addSelectButtonText: string
    // Indicates the property extracted from options object
    optionValueKeyName: string
  }>
  resetMultipleSelect: () => void
}
