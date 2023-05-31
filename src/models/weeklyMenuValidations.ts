import tableValidations from './tableValidations'

const weeklyMenuValidations = (weeklyMenu: {
  creationDate: string
}): void => {
  tableValidations({
    creationDate: weeklyMenu.creationDate
  })
}

export default weeklyMenuValidations
