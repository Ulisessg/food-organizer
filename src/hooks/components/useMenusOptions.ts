/* eslint-disable max-lines-per-function */
import { type GetMenus } from 'controllers/food_organizer_crud/MenuCRUD'
import { type RootState } from 'redux/store'
import { type TDaysOfTheWeek } from 'utils/constants'
import { type TUseCreateWeeklyMenuReturn } from './useCreateWeeklyMenu'
import safeObjectGet from 'utils/safeObjectGet'
import { useSelector } from 'react-redux'

const useMenus = (
  filters: TUseCreateWeeklyMenuReturn['filters'],
  menusIdsUsed: TUseCreateWeeklyMenuReturn['menusIdsUsed'],
  day: TDaysOfTheWeek
): UseMenusReturn => {
  const menusData = useSelector((state: RootState) => state.menus)
  const getMenusToDisplay =
    (): GetMenus => {
      const menusToDisplay: GetMenus = []
      const menusIndexesUsed: number[] = []
      filters.forEach((filter) => {
        if (filter.propertyName === 'foods') {
          menusData.menus.forEach((menu, index) => {
            // Remove menus used
            if (safeObjectGet(
              menusIdsUsed,
              day
            ).some((id) => id === menu.id)) return
            if (menusIndexesUsed.some((indexUsed) => indexUsed === index)) return

            if (menu.menu_foods.some((food) => food.food_name === filter.value)) {
              menusToDisplay.push(menu)
              menusIndexesUsed.push(index)
            }
          })
        }
        if (filter.propertyName === 'ingredients') {
          menusData.menusIngredients.forEach((menu, index) => {
            if (safeObjectGet(
              menusIdsUsed,
              day
            ).some((id) => id === menu.id)) return
            if (menusIndexesUsed.some((indexUsed) => indexUsed === index)) return

            /**
             * The array index is used because both
             * "menu's ingredients" and "menus" order by menu_id ascendent to improve performance
             */
            if (menu.ingredients.some((ingredient) => ingredient
              .ingredient_name.toLocaleLowerCase() === filter.value.toLocaleLowerCase())) {
              menusToDisplay.push(safeObjectGet(
                menusData.menus as any,
                index
              ))
              menusIndexesUsed.push(index)
            }
          })
        }
      })
      return menusToDisplay
    }

  return {
    menusToDisplay: getMenusToDisplay()
  }
}

export default useMenus
interface UseMenusReturn {
  menusToDisplay: GetMenus
}
