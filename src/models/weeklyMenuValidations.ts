import tableValidations, { type tableProps } from './tableValidations'

const weeklyMenuValidations = (weeklyMenu: tableProps): void => {
  tableValidations({
    creationDate: weeklyMenu.creationDate
  })
}

export default weeklyMenuValidations
