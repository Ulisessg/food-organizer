import { dateFormatUsed } from './constants'
import dayjs from 'dayjs'

/**
 * Returns the dates between monday and sunday given a date
 *
 * Format used: **DD/MM/YYYY**
 */
const getWeekRangeOfDates = (date: string | Date, format?: string): GetWeekRangeOfDatesReturn => {
  const sundayDate = dayjs(
    date,
    format
  ).day(0)
    .format(dateFormatUsed)
  const saturdayDate = dayjs(
    date,
    format
  ).day(6)
    .format(dateFormatUsed)

  return {
    saturdayDate,
    sundayDate
  }
}

interface GetWeekRangeOfDatesReturn {
  sundayDate: string
  saturdayDate: string
}

export default getWeekRangeOfDates
