import dayjs from 'dayjs'

/** Returns the dates between monday and sunday given a date  */
const getWeekRangeOfDates = (date: string): GetWeekRangeOfDatesReturn => {
  const mondayDate = dayjs(date).day(1)
    .format('DD/MM/YYYY')
  const sundayDate = dayjs(date).day(7)
    .format('DD/MM/YYYY')

  return {
    mondayDate,
    sundayDate
  }
}

interface GetWeekRangeOfDatesReturn {
  mondayDate: string
  sundayDate: string
}

export default getWeekRangeOfDates
