import idValidation from './idValidation'
import tableValidations from './tableValidations'

const validations: verifyObj = {
  carbohydratesId: (carbohydratesId: number) => {
    idValidation(
      carbohydratesId,
      'carbohydratesId'
    )
  },
  meatId: (meatId: number) => {
    idValidation(
      meatId,
      'meatId'
    )
  },
  vegetableId: (vegetableId: number) => {
    idValidation(
      vegetableId,
      'vegetableId'
    )
  }
}

const dailyMenuValidations = (
  verifyProp: verifyProps,
  propValue: number,
  id: number,
  creationDate: string
// eslint-disable-next-line max-params
): void => {
  tableValidations(
    creationDate,
    id
  )

  validations[verifyProp](propValue)
}

type verifyProps = 'vegetableId' | 'meatId' | 'carbohydratesId'

type verifyObj = {
  [k in verifyProps]: (p: any) => void
}

export default dailyMenuValidations
