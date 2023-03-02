/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import { type ChangeEvent, useCallback, useEffect, useState } from 'react'
import { type RootState } from 'redux/store'
import { type TDay } from 'controllers/food_organizer_crud/weeklyMenuCRUD'
import { dayInMiliseconds } from 'utils/constants'
import dayjs from 'dayjs'
import getDayOfTheWeekFromDate from 'utils/getDayOfTheWeekFromDate'
import getWeekRangeOfDates from 'utils/getWeekRangeOfDates'
import safeObjectGet from 'utils/safeObjectGet'
import { useInputs } from 'd-system'
import { useSelector } from 'react-redux'

const useDisplayWeeklyMenus = (): TDisplayWeeklyMenusReturn => {
  const weeklyMenusData = useSelector((state: RootState) => state.weeklyMenus)

  const { inputsData, onChange: UseInputsOnChange } = useInputs(
    {
      filter_by_wm_ammount: 'week',

      /** Today */
      pick_date: dayjs().format('YYYY-MM-DD')
    },
    false
  )
  const [
    menusToShow,
    setWeeklyMenusToShow
  ] = useState<TDisplayWeeklyMenusReturn['menusToShow']>('none')
  const [
    weeklyMenu,
    setWeeklyMenu
  ] = useState<TDisplayWeeklyMenusReturn['weeklyMenu']>({} as any)
  const [
    dailyMenu,
    setDailyMenu
  ] = useState<TDisplayWeeklyMenusReturn['dailyMenu']>({} as any)

  const searchWeeklyMenu: TDisplayWeeklyMenusReturn['searchWeeklyMenu'] = useCallback(
    (date, filter) => {
      if (filter === 'all') {
        setWeeklyMenusToShow('all')
        return
      }
      if (filter === 'day') {
        setWeeklyMenusToShow('day')
        const searchDailyMenuResult = weeklyMenusData.sundaysOfWeeksWithMenus.some((sunday) => {
          console.log(sunday)

          const sundayOfDateSelected = getWeekRangeOfDates(date).sundayDate
          console.log(sunday.date === sundayOfDateSelected)

          if (
            sunday.date === sundayOfDateSelected) {
            const daySelected = getDayOfTheWeekFromDate(date)
            console.log(weeklyMenusData.weeklyMenus[sunday.index])
            console.log(daySelected)

            setDailyMenu({
              day: daySelected,
              menu: safeObjectGet(
                weeklyMenusData.weeklyMenus[sunday.index],
                daySelected
              ) as TDay
            })
            return true
          }

          return false
        })

        // No daily menu founded in date
        if (!searchDailyMenuResult) {
          setWeeklyMenusToShow('none')
        }
        return
      }
      if (filter === 'week') {
        setWeeklyMenusToShow('week')
        const sundayOfDaySelected: string = getWeekRangeOfDates(date).sundayDate
        const searchWeeklyMenuResult = weeklyMenusData.sundaysOfWeeksWithMenus.some((sunday) => {
          if (sunday.date === sundayOfDaySelected) {
            setWeeklyMenu(weeklyMenusData.weeklyMenus[sunday.index])
            return true
          }
          return false
        })

        if (!searchWeeklyMenuResult) {
          setWeeklyMenusToShow('none')
        }
      }
    },
    [
      weeklyMenusData.sundaysOfWeeksWithMenus,
      weeklyMenusData.weeklyMenus
    ]
  )

  const filtersOnChange = (ev: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    UseInputsOnChange(ev as any)
    if (ev.currentTarget.name === 'filter_by_wm_ammount') {
      searchWeeklyMenu(
        dayjs(
          inputsData.pick_date,
          'YYYY-MM-DD'
        ).toDate(),
        ev.currentTarget.value
      )
    } else if (ev.currentTarget.name === 'pick_date') {
      const targetElement = ev.currentTarget as HTMLInputElement

      /*
       * Value as date is
       * inexact by one day
       * https://stackoverflow.com/questions/28506845/adding-one-day-to-an-input-type-date-value
       */
      // eslint-disable-next-line init-declarations
      let fixedDate: Date
      if (typeof targetElement.valueAsDate === 'undefined' || targetElement.valueAsDate === null) {
        fixedDate = dayjs('Invalid date').toDate()
      } else {
        fixedDate = dayjs((targetElement.valueAsDate).getTime() + dayInMiliseconds).toDate()
      }

      searchWeeklyMenu(
        fixedDate,
        inputsData.filter_by_wm_ammount
      )
    }
  }

  useEffect(
    () => {
      searchWeeklyMenu(
        dayjs(inputsData.pick_date).toDate(),
        inputsData.filter_by_wm_ammount
      )
    },
    [
      inputsData.filter_by_wm_ammount,
      inputsData.pick_date,
      searchWeeklyMenu
    ]
  )

  return {
    dailyMenu,
    filtersOnChange,
    inputsData,
    menusToShow,
    searchWeeklyMenu,
    weeklyMenu
  }
}

interface TDisplayWeeklyMenusReturn {
  menusToShow: 'none' | 'all' | 'day' | 'week'
  weeklyMenu: RootState['weeklyMenus']['weeklyMenus'][0]
  dailyMenu: { menu: RootState['weeklyMenus']['weeklyMenus'][0]['monday'], day: string }
  searchWeeklyMenu: (
    date: Date, filter: string) => void
  inputsData: {
    filter_by_wm_ammount: string
    pick_date: string
  }
  filtersOnChange: (ev: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

export default useDisplayWeeklyMenus
