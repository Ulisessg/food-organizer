import { inputNumberPattern } from './RegExps'

/**
 * Used to only accept numbers of
 * inputs type number who accepts scientific notation and some symbols like +
 * @param {string} input - The input element
 * @returns {string} valueFixed - The input value fixed
 */
const getInputNumberData = (input: HTMLInputElement): GetInputNumberDataReturn => {
  const { value } = input
  const valueFixed = Number(value).toFixed(0)
  input.checkValidity()
  input.reportValidity()
  input.value = valueFixed
  if (value.match(inputNumberPattern) === null) {
    return {
      match: false,
      valueFixed
    }
  }
  return {
    match: true,
    valueFixed
  }
}

interface GetInputNumberDataReturn {
  match: boolean
  valueFixed: string
}

export default getInputNumberData
