/* eslint-disable max-params */

import { defaultSelectValue } from 'utils/constants'

export const formIsValid = (
  inputsData: UseInputsData,
  inputsErrors: UseInputsErrors,
  ingredientNameIsRepeated: boolean
): boolean => {
  if (
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    !inputsErrors.ingredient_name &&
    !ingredientNameIsRepeated &&
    inputsData.ingredient_name.length >= 2 &&
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    !inputsErrors.ingredient_uom &&
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    !inputsData.ingredient_uom.includes(defaultSelectValue)) return true
  return false
}

type UseInputsErrors = Record<keyof UseInputsData, boolean>

interface UseInputsData {
  ingredient_comment: string
  ingredient_name: string
  ingredient_uom: string
}
