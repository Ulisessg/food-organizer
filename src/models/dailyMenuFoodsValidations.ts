import tableValidations, { tableProps } from './tableValidations'
import idValidation from './idValidation'

export const validations: verifyObj = {
  daily_menu_id: (id: number) => {
    idValidation({ id, idName: 'daily_menu_id' })
  },
  food_id: (id: number) => {
    idValidation({
      id,
      idName: 'food_id'
    })
  }
}

const dailyMenuFoodsValidations = (dailyMenuFoods: dailyMenuFoodsValidationsParam): void => {
  tableValidations({ creationDate: dailyMenuFoods.creationDate })
  validations.daily_menu_id(dailyMenuFoods.daily_menu_id)
  validations.food_id(dailyMenuFoods.food_id)
}

export default dailyMenuFoodsValidations

type dailyMenuFoodsValidationsParam = tableProps & {
  food_id: number
  daily_menu_id: number
}
type verifyProps = 'food_id' | 'daily_menu_id'
type verifyObj = {
  [k in verifyProps]: (value: any) => void
}
