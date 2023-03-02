/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import { type AppDispatch, type RootState } from 'redux/store'
import { type ChangeEvent, type MouseEvent, type RefObject, useState } from 'react'
import { type TDaysOfTheWeek, dayInMiliseconds } from 'utils/constants'
import { createWeeklyMenuThunk, restartPostWeeklyMenu } from 'redux/slices/weekSlice'
import { useDispatch, useSelector } from 'react-redux'
import { type TCreateWeeklyMenus } from 'controllers/food_organizer_crud/weeklyMenuCRUD'
import dayjs from 'dayjs'
import getDayNameFromEnglish from 'utils/getDayNameFromEnglish'
import getDayNameFromSpanish from 'utils/getDayNameFromSpanish'
import getWeekRangeOfDates from 'utils/getWeekRangeOfDates'
import { useInputs } from 'd-system'

const menusSelectedAndMenusIdsUsedDefaultData = {
  friday: [],
  monday: [],
  saturday: [],
  sunday: [],
  thursday: [],
  tuesday: [],
  wednesday: []
}

const useCreateWeeklyMenu = (formRef: RefObject<HTMLFormElement>): TUseCreateWeeklyMenuReturn => {
  const weeklyMenusData = useSelector((state: RootState) => state.weeklyMenus)
  const menusData = useSelector((state: RootState) => state.menus)
  const dispatch: AppDispatch = useDispatch()
  const [
    menusSelectedQty,
    setMenusSelectedQty
  ] = useState<number>(0)
  const [
    menusIdsUsed,
    setMenusIdsUsed
  ] = useState<TUseCreateWeeklyMenuReturn['menusIdsUsed']>({
    friday: [],
    monday: [],
    saturday: [],
    sunday: [],
    thursday: [],
    tuesday: [],
    wednesday: []
  })
  const [
    menusSelected,
    setMenusSelected
  ] = useState<TUseCreateWeeklyMenuReturn['menusSelected']>({
    friday: [],
    monday: [],
    saturday: [],
    sunday: [],
    thursday: [],
    tuesday: [],
    wednesday: []
  })
  const [
    filters,
    setFilters
  ] = useState<TUseCreateWeeklyMenuReturn['filters']>([])
  const { onChange: UseInputsOnChange, inputsData, restartInputs } = useInputs(
    {
      day: 'Lunes',
      wm_date_picker: ''
    },
    true
  )
  const [
    weekIsUsed,
    setWeekIsUsed
  ] = useState<boolean>(false)

  const updateFilters: TUseCreateWeeklyMenuReturn['updateFilters'] = (
    action,
    filter,
    propertyName
  ) => {
    if (action === 'add') {
      setFilters((prev) => {
        // No repeat filters
        if (prev.some((fil) => fil.value === filter)) {
          return [...prev]
        }
        return [
          ...prev,
          {
            propertyName,
            value: filter
          }
        ]
      })
    }
    if (action === 'remove') {
      setFilters((prev) => ([...prev.filter((existentFilter) => existentFilter.value !== filter)]))
    }
  }
  const onMenusSelected: TUseCreateWeeklyMenuReturn['onMenusSelected'] = (ev) => {
    const inputMenuSelected: HTMLInputElement = ev.currentTarget as HTMLInputElement
    const menusSelectedData: TUseCreateWeeklyMenuReturn['menusSelected'] = {
      ...menusSelected
    }
    const menuId: number = parseInt(
      inputMenuSelected.getAttribute('data-menu-id') as string,
      10
    )
    menusData.menus.some((menu) => {
      if (menu.id === menuId) {
        const dayInEnglish: TDaysOfTheWeek = getDayNameFromSpanish(inputsData.day)
        menusSelectedData[dayInEnglish].push(menu)
        setMenusIdsUsed((prev) => ({
          ...prev,
          [dayInEnglish]: [
            ...prev[dayInEnglish],
            menuId
          ]
        }))
        setMenusSelectedQty((prev) => prev + 1)
        return true
      }
      return false
    })
    setMenusSelected(menusSelectedData)
  }
  const onMenuDeselected: TUseCreateWeeklyMenuReturn['onMenuDeselected'] = (ev) => {
    const input = ev.currentTarget as HTMLInputElement
    const { day } = inputsData
    const dayInElgish = getDayNameFromSpanish(day)
    const menuId = parseInt(
      input.getAttribute('data-menu-id') as string
      , 10
    )
    // Remove id
    setMenusIdsUsed((prev) => ({
      ...prev,
      [dayInElgish]: [...prev[dayInElgish].filter((id) => id !== menuId)]
    }))
    setMenusSelected((prev) => ({
      ...prev,
      [dayInElgish]:
       prev[dayInElgish].filter((menu) => menu.id !== menuId)
    }))
    setMenusSelectedQty((prev) => prev - 1)
  }

  const restartFilters = (): void => {
    setFilters([])
  }

  const onChange: TUseCreateWeeklyMenuReturn['onChange'] = (ev) => {
    UseInputsOnChange(ev)
    if (ev.currentTarget.name === 'wm_date_picker') {
      const dateInNumbers: number = (ev.currentTarget as HTMLInputElement).valueAsNumber
      setWeekIsUsed(dateIsUsed(dateInNumbers))
    }
  }

  const dateIsUsed = (dateInNumbers: number): boolean => {
    if (!Number.isNaN(dateInNumbers)) {
      const fixedDate = dateInNumbers + dayInMiliseconds
      const sundayOfDateSelected = getWeekRangeOfDates(dayjs(fixedDate).toDate()).sundayDate
      const result = weeklyMenusData
        .sundaysOfWeeksWithMenus.some((sunday) => {
          console.log(
            'Monday: ',
            sunday
          )
          console.log(
            'sundayOfDateSelected: ',
            sundayOfDateSelected
          )

          return sunday.date === sundayOfDateSelected
        })
      return result
    }
    return false
  }
  const formIsValid = (): boolean => {
    if (formRef.current?.checkValidity() === true &&
    !weekIsUsed &&
    menusSelectedQty >= 1) return true
    return false
  }
  const createWeeklyMenu: TUseCreateWeeklyMenuReturn['createWeeklyMenu'] = async (ev) => {
    const createWeeklyMenuData: TCreateWeeklyMenus = {
      creation_date: dayjs(
        inputsData.wm_date_picker,
        'YYYY-MM-DD'
      ).toISOString(),
      menus: []
    }

    // eslint-disable-next-line guard-for-in
    for (const day in menusSelected) {
      if (menusSelected[day as TDaysOfTheWeek].length !== 0) {
        const dayId = weeklyMenusData
          .days.find((dy) => dy.name.toLowerCase() === getDayNameFromEnglish(day))?.id as number

        menusSelected[day as TDaysOfTheWeek].forEach((menu) => {
          createWeeklyMenuData.menus.push({
            day_id: dayId,
            menu_id: menu.id
          })
        })
      }
    }
    const createWeeklyMenuResponse = await dispatch(createWeeklyMenuThunk(createWeeklyMenuData))

    if (typeof (createWeeklyMenuResponse as any).error === 'undefined') {
      restartFilters()
      restartInputs('all')
      formRef.current?.reset()
      setMenusIdsUsed(menusSelectedAndMenusIdsUsedDefaultData)
      setMenusSelected(menusSelectedAndMenusIdsUsedDefaultData)
      setMenusSelectedQty(0)
      await dispatch(restartPostWeeklyMenu())
    }
  }

  return {
    createWeeklyMenu,
    daySelected: getDayNameFromSpanish(inputsData.day),
    disableButton: !formIsValid(),
    filters,
    inputsValues: inputsData,
    menusIdsUsed,
    menusSelected,
    onChange,
    onMenuDeselected,
    onMenusSelected,
    restartFilters,
    updateFilters,
    weekIsUsed
  }
}

export default useCreateWeeklyMenu

export interface TUseCreateWeeklyMenuReturn {
  menusSelected: {
    [k in TDaysOfTheWeek]: Array<RootState['menus']['menus'][0]>
  }
  onChange: ReturnType<typeof useInputs>['onChange']
  daySelected: ReturnType<typeof getDayNameFromSpanish>
  filters: Array<{
    propertyName: 'foods' | 'ingredients'
    value: string
  }>
  inputsValues: {
    day: string
    wm_date_picker: string
  }
  updateFilters: (
    action: 'add' | 'remove',
    filter: string,
    propertyName: 'foods' | 'ingredients'
  ) => void
  restartFilters: () => void

  /**
   * Indicates in that date you already create a weekly menu
   */
  weekIsUsed: boolean
  onMenusSelected: (ev: ChangeEvent<HTMLInputElement>) => void
  onMenuDeselected: (ev: ChangeEvent) => void
  menusIdsUsed: {
    [k in TDaysOfTheWeek]: number[]
  }
  disableButton: boolean
  createWeeklyMenu: (ev: MouseEvent<HTMLButtonElement>) => Promise<void>
}
