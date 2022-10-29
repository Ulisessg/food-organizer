import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'
import tableValidations from './tableValidations'

const weeklyMenuValidations = (
  propName: verifyProp,
  value: number,
  creationDate: string,
  id: number
// eslint-disable-next-line max-params
): void => {
  tableValidations(
    creationDate,
    id
  )
  // As all properties are id (numbers) will share same validation
  if (typeof value !== 'number') {
    throw new TypeError(invalidPropertyTypeErrorMessage(
      propName,
      value,
      'only integer number allowed'
    ))
  }
}

type verifyProp =
'mondayMenuId'
| 'tuesdayMenuId'
| 'wednesdayMenuId'
| 'thursdayMenuId'
| 'fridayMenuId'
| 'saturdayMenuId'
| 'sundayMenuId'

export default weeklyMenuValidations
