import tableValidations, { tableProps } from './tableValidations'
import idValidation from './idValidation'

const validations: verifyObj = {
  carbohydratesId: (carbohydratesId: number) => {
    idValidation({
      id: carbohydratesId,
      idName: 'carbohydratesId'
    })
  },
  meatId: (meatId: number) => {
    idValidation({
      id: meatId,
      idName: 'meatId'
    })
  },
  vegetableId: (vegetableId: number) => {
    idValidation({
      id: vegetableId,
      idName: 'vegetableId'
    })
  }
}

const dailyMenuValidations = (dailyMenu: dailyMenuParam): void => {
  tableValidations({
    creationDate: dailyMenu.creationDate,
    id: dailyMenu.id
  })
  validations.carbohydratesId(dailyMenu.carbohydratesId)
  validations.meatId(dailyMenu.meatId)
  validations.vegetableId(dailyMenu.vegetableId)
}

export default dailyMenuValidations

type verifyProps = 'vegetableId' | 'meatId' | 'carbohydratesId'
type dailyMenuParam = tableProps & {
  [j in verifyProps]: number
}
type verifyObj = {
  [k in verifyProps]: (p: any) => void
}
