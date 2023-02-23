/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
import { type RootState } from 'redux/store'
import { dateFormatUsed } from 'utils/constants'
import getDayOfTheWeekFromDate from 'utils/getDayOfTheWeekFromDate'
import getWeekRangeOfDates from 'utils/getWeekRangeOfDates'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const useDisplayWeeklyMenus = (): TDisplayWeeklyMenusReturn => {
  const weeklyMenusData = useSelector((state: RootState) => state.weeklyMenus)
  const [
    menusToShow,
    setWeeklyMenusToShow
  ] = useState<TDisplayWeeklyMenusReturn['menusToShow']>('none')
  const [
    weeklyMenu,
    setWeeklyMenu
  ] = useState<TDisplayWeeklyMenusReturn['weeklyMenu']>([] as any)
  const [
    dailyMenu,
    setDailyMenu
  ] = useState<TDisplayWeeklyMenusReturn['dailyMenu']>({} as any)

  const searchWeeklyMenu: TDisplayWeeklyMenusReturn['searchWeeklyMenu'] = (date, filter) => {
    if (filter === 'all') {
      setWeeklyMenusToShow('all')
      return
    }
    if (filter === 'day') {
      setWeeklyMenusToShow('day')
      const searchDailyMenuResult = weeklyMenusData.mondaysOfWeeksWithMenus.some((monday) => {
        const dateSelectedRangeOfDates = getWeekRangeOfDates(date)
        const dateRegistedRangeOfDates = getWeekRangeOfDates(
          monday.date,
          dateFormatUsed
        )
        const mondayOfDateSelected = dateSelectedRangeOfDates.mondayDate
        const sundayOfDateSelected = dateSelectedRangeOfDates.sundayDate

        if (
          dateRegistedRangeOfDates.mondayDate === mondayOfDateSelected &&
          dateRegistedRangeOfDates.sundayDate === sundayOfDateSelected) {
          const daySelected = getDayOfTheWeekFromDate(date)
          console.log(date)

          setDailyMenu({
            day: daySelected,
            menu: weeklyMenusData.weeklyMenus[monday.index][daySelected]
          })
          return true
        }
        setWeeklyMenusToShow('none')
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
      const mondayOfWeekSelected: string = getWeekRangeOfDates(date).mondayDate
      const searchWeeklyMenuResult = weeklyMenusData.mondaysOfWeeksWithMenus.some((monday) => {
        if (monday.date === mondayOfWeekSelected) {
          setWeeklyMenu(weeklyMenusData.weeklyMenus[monday.index])
          return true
        }
        return false
      })
      if (!searchWeeklyMenuResult) {
        setWeeklyMenusToShow('none')
      }
    }
  }

  return {
    dailyMenu,
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
}

export default useDisplayWeeklyMenus
