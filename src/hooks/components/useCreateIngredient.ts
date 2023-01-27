import { defaultSelectValue } from 'utils/constants'
import { useInputs } from 'd-system'

const useCreateIngredient = (): UseCreateIngredientReturn => {
  const { inputsData, inputsErrors, onBlur, onChange } = useInputs(
    {
      ingredient_comment: '',
      ingredient_name: '',
      ingredient_uom: defaultSelectValue
    },
    true
  )
  return {
    inputsData,
    inputsErrors,
    onBlur,
    onChange
  }
}

interface UseCreateIngredientReturn {
  inputsData: InputsData
  inputsErrors: Record<keyof InputsData, boolean>
  onBlur: useInputsReturn['onBlur']
  onChange: useInputsReturn['onChange']
}

interface InputsData {

  ingredient_comment: string
  ingredient_name: string
  ingredient_uom: string
}

type useInputsReturn = ReturnType<typeof useInputs>

export default useCreateIngredient
