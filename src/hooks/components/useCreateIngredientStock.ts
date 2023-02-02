import { useInputs } from 'd-system'
import { useState } from 'react'

const useCreateIngredientStock = (): UseCreateIngredientStockReturn => {
  const [
    uom,
    setUom
  ] = useState('N/A')
  const { inputsData, onBlur, onChange: uiOnChange, inputsErrors } = useInputs(
    {
      ingredient: '',
      ingredient_qty: ''
    },
    true
  )

  const onChange: ReturnType<typeof useInputs>['onChange'] = (ev) => {
    uiOnChange(ev)
    getUom(ev)
  }

  const getUom: ReturnType<typeof useInputs>['onChange'] = (ev) => {
    const value = ev.currentTarget.value as unknown as string
    let unitOfMeasure: string | undefined = document
      .querySelector(`option[value='${value}']`)
      ?.getAttribute('data-ingredient-uom') as unknown as string
    if (typeof unitOfMeasure !== 'string') {
      unitOfMeasure = 'N/A'
    }

    setUom(unitOfMeasure)
  }
  return {
    inputsData,
    inputsErrors,
    onBlur,
    onChange,
    uom
  }
}

interface UseCreateIngredientStockReturn {
  inputsData: {
    ingredient_qty: string
    ingredient: string
  }
  inputsErrors: {
    ingredient_qty: boolean
    ingredient: boolean
  }
  onChange: ReturnType<typeof useInputs>['onChange']
  onBlur: ReturnType<typeof useInputs>['onBlur']
  uom: string
}

export default useCreateIngredientStock
