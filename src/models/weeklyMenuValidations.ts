import tableValidations, { tableProps } from './tableValidations'
import idValidation from './idValidation'

export const validations: weeklyMenuObj = {
  fridayMenuId: (fridayMenuId: number) => {
    idValidation({
      id: fridayMenuId,
      idName: 'fridayMenuId'
    })
  },
  mondayMenuId: (mondayMenuId: number) => {
    idValidation({ id: mondayMenuId, idName: 'mondayMenuId' })
  },
  saturdayMenuId: (saturdayMenuId: number) => {
    idValidation({
      id: saturdayMenuId,
      idName: 'saturdayMenuId'
    })
  },
  sundayMenuId: (sundayMenuId: number) => {
    idValidation({
      id: sundayMenuId,
      idName: 'sundayMenuId'
    })
  },
  thursdayMenuId: (thursdayMenuId: number) => {
    idValidation({
      id: thursdayMenuId,
      idName: 'thursdayMenuId'
    })
  },
  tuesdayMenuId: (tuesdayMenuId: number) => {
    idValidation({
      id: tuesdayMenuId,
      idName: 'tuesdayMenuId'
    })
  },
  wednesdayMenuId: (wednesdayMenuId: number) => {
    idValidation({
      id: wednesdayMenuId,
      idName: 'wednesdayMenuId'
    })
  }
}

const weeklyMenuValidations = (weeklyMenu: weeklyMenuParam): void => {
  tableValidations({
    creationDate: weeklyMenu.creationDate
  })
  validations.fridayMenuId(weeklyMenu.fridayMenuId)
  validations.mondayMenuId(weeklyMenu.mondayMenuId)
  validations.saturdayMenuId(weeklyMenu.saturdayMenuId)
  validations.sundayMenuId(weeklyMenu.sundayMenuId)
  validations.thursdayMenuId(weeklyMenu.thursdayMenuId)
  validations.tuesdayMenuId(weeklyMenu.tuesdayMenuId)
  validations.wednesdayMenuId(weeklyMenu.wednesdayMenuId)
}

export default weeklyMenuValidations

type verifyProp =
'mondayMenuId'
| 'tuesdayMenuId'
| 'wednesdayMenuId'
| 'thursdayMenuId'
| 'fridayMenuId'
| 'saturdayMenuId'
| 'sundayMenuId'

type weeklyMenuObj = {
  [k in verifyProp]: (id: number) => void
}
type weeklyMenuParam = tableProps & {
  [k in verifyProp]: number
}
