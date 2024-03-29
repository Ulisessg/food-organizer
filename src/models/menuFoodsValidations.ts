
import idValidation from './idValidation'

export const validations: verifyObj = {
  food_id: (id: number) => {
    idValidation({
      id,
      idName: 'food_id'
    })
  },
  menu_id: (id: number) => {
    idValidation({ id, idName: 'menu_id' })
  }

}

const menuFoodsValidations = (menuFoods: menuFoodsValidationsParam): void => {
  validations.menu_id(menuFoods.menu_id)
  validations.food_id(menuFoods.food_id)
}

export default menuFoodsValidations

interface menuFoodsValidationsParam {
  food_id: number
  menu_id: number
}
type verifyProps = 'food_id' | 'menu_id'
type verifyObj = {
  // eslint-disable-next-line no-unused-vars
  [k in verifyProps]: (value: any) => void
}
