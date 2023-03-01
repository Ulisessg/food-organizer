/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import { type ChangeEvent, type RefObject, useState } from 'react'
import { type TDaysOfTheWeek, dayInMiliseconds } from 'utils/constants'
import { type RootState } from 'redux/store'
import dayjs from 'dayjs'
import getDayNameFromSpanish from 'utils/getDayNameFromSpanish'
import getWeekRangeOfDates from 'utils/getWeekRangeOfDates'
import { useInputs } from 'd-system'
import { useSelector } from 'react-redux'

const useCreateWeeklyMenu = (formRef: RefObject<HTMLFormElement>): TUseCreateWeeklyMenuReturn => {
  const weeklyMenusData = useSelector((state: RootState) => state.weeklyMenus)
  const menusData = useSelector((state: RootState) => state.menus)
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
  const { onChange: UseInputsOnChange, inputsData } = useInputs(
    {
      day: 'Lunes',
      wm_date_picker: dayjs().format('YYYY-MM-DD')
    },
    true
  )
  const [
    weekIsUsed,
    setWeekIsUsed
  ] = useState<boolean>(dateIsUsed(dayjs(inputsData.wm_date_picker).toDate()
    .getTime()))

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

  /**
   * Declared as function to use hoisting
   */
  // eslint-disable-next-line func-style
  function dateIsUsed (dateInNumbers: number): boolean {
    if (!Number.isNaN(dateInNumbers)) {
      const fixedDate = dateInNumbers + dayInMiliseconds
      const mondayOfDateSelected = getWeekRangeOfDates(dayjs(fixedDate).toDate()).mondayDate
      return weeklyMenusData
        .mondaysOfWeeksWithMenus.some((monday) => monday.date === mondayOfDateSelected)
    }
    return false
  }
  const formIsValid = (): boolean => {
    if (formRef.current?.checkValidity() === true &&
    !weekIsUsed &&
    menusSelectedQty >= 1) return true
    return false
  }

  return {
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
}
